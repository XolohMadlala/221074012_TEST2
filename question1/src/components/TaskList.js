import { FlatList, StyleSheet, Text, View } from 'react-native';
import TaskCard from './TaskCard';

export default function TaskList({ tasks, loading, error, pendingIds, onToggle, onDelete }) {
  if (loading) {
    return <Text style={styles.message}>Loading tasks from Firestore...</Text>;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TaskCard
          task={item}
          pending={pendingIds.includes(item.id)}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      )}
      ListEmptyComponent={
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>No tasks yet</Text>
          <Text style={styles.emptyText}>Add your first student task above.</Text>
        </View>
      }
      contentContainerStyle={tasks.length === 0 ? styles.emptyList : styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 28,
  },
  emptyList: {
    flexGrow: 1,
  },
  message: {
    color: '#404040',
    fontWeight: '700',
    marginTop: 18,
    textAlign: 'center',
  },
  error: {
    backgroundColor: '#FEF2F2',
    borderColor: '#DC2626',
    borderRadius: 8,
    borderWidth: 1,
    color: '#991B1B',
    fontWeight: '700',
    marginTop: 18,
    padding: 12,
  },
  emptyBox: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 18,
    padding: 22,
  },
  emptyTitle: {
    color: '#262626',
    fontSize: 18,
    fontWeight: '800',
  },
  emptyText: {
    color: '#525252',
    marginTop: 6,
  },
});
