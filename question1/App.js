import { useEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import {addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc,} from "firebase/firestore";
import TaskForm from "./src/components/TaskForm";
import TaskList from "./src/components/TaskList";
import { db } from "./src/firebase/firebaseConfig";

const tasksCollection = collection(db, "tasks");

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listenerError, setListenerError] = useState("");
  const [writeError, setWriteError] = useState("");
  const [formPending, setFormPending] = useState(false);
  const [pendingIds, setPendingIds] = useState([]);
  const pendingLocks = useRef(new Set());

  useEffect(() => {
    const tasksQuery = query(tasksCollection, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      tasksQuery,
      (snapshot) => {
        const nextTasks = snapshot.docs.map((taskDoc) => ({
          id: taskDoc.id,
          ...taskDoc.data(),
        }));

        setTasks(nextTasks);
        setListenerError("");
        setLoading(false);
      },
      (error) => {
        setListenerError(`Could not load tasks: ${error.message}`);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  const trackPending = async (id, action) => {
    if (pendingLocks.current.has(id)) {
      return;
    }

    pendingLocks.current.add(id);
    setPendingIds((current) => [...current, id]);
    setWriteError("");
    try {
      await action();
    } catch (error) {
      setWriteError(error.message);
    } finally {
      pendingLocks.current.delete(id);
      setPendingIds((current) =>
        current.filter((pendingId) => pendingId !== id),
      );
    }
  };

  const addTask = async ({ title, moduleCode, priority }) => {
    setFormPending(true);
    setWriteError("");

    try {
      await addDoc(tasksCollection, {
        title,
        moduleCode,
        priority,
        completed: false,
        createdAt: serverTimestamp(),
      });
      return true;
    } catch (error) {
      setWriteError(error.message);
      return false;
    } finally {
      setFormPending(false);
    }
  };

  const toggleTask = (task) =>
    trackPending(task.id, () =>
      updateDoc(doc(db, "tasks", task.id), {
        completed: !task.completed,
      }),
    );

  const deleteTask = (id) =>
    trackPending(id, () => deleteDoc(doc(db, "tasks", id)));

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Text style={styles.heading}>UJ Student Task Hub</Text>
        <Text style={styles.subheading}>
          Firestore tasks update live with document ID actions.
        </Text>
        <TaskForm onSubmit={addTask} pending={formPending} />
        {writeError ? (
          <Text style={styles.writeError}>Write failed: {writeError}</Text>
        ) : null}
        <View style={styles.listWrap}>
          <TaskList
            tasks={tasks}
            loading={loading}
            error={listenerError}
            pendingIds={pendingIds}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#FAFAFA",
    flex: 1,
  },
  container: {
    backgroundColor: "#FAFAFA",
    flex: 1,
    padding: 18,
  },
  heading: {
    color: "#262626",
    backgroundColor: "#FFFFFF",
    borderLeftColor: "#AD1457",
    borderLeftWidth: 5,
    borderRadius: 8,
    fontSize: 25,
    fontWeight: "900",
    marginBottom: 8,
    padding: 14,
    textAlign: "center",
  },
  subheading: {
    color: "#525252",
    fontWeight: "700",
    marginBottom: 14,
    textAlign: "center",
  },
  writeError: {
    backgroundColor: "#FEF2F2",
    borderColor: "#DC2626",
    borderRadius: 8,
    borderWidth: 1,
    color: "#991B1B",
    fontWeight: "700",
    marginTop: 12,
    padding: 10,
  },
  listWrap: {
    flex: 1,
    marginTop: 16,
  },
});
