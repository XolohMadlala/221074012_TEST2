import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const PRIORITIES = ['Low', 'Medium', 'High'];

export default function TaskForm({ onSubmit, pending }) {
  const [title, setTitle] = useState('');
  const [moduleCode, setModuleCode] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async () => {
    const cleanTitle = title.trim();
    const cleanModuleCode = moduleCode.trim();

    if (!cleanTitle || !cleanModuleCode) {
      setFeedback('Enter both a task title and module code.');
      return;
    }

    setFeedback('');
    const saved = await onSubmit({
      title: cleanTitle,
      moduleCode: cleanModuleCode,
      priority,
    });

    if (saved) {
      setTitle('');
      setModuleCode('');
      setPriority('Medium');
      setFeedback('Task added successfully.');
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Task title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Example: Finish Firebase activity"
        placeholderTextColor="#737373"
        editable={!pending}
      />

      <Text style={styles.label}>Module code</Text>
      <TextInput
        style={styles.input}
        value={moduleCode}
        onChangeText={setModuleCode}
        placeholder="Example: DSW02B1"
        placeholderTextColor="#737373"
        autoCapitalize="characters"
        editable={!pending}
      />

      <Text style={styles.label}>Priority</Text>
      <View style={styles.priorityRow}>
        {PRIORITIES.map((item) => (
          <Pressable
            key={item}
            style={[styles.priorityButton, priority === item && styles.priorityButtonActive]}
            onPress={() => setPriority(item)}
            disabled={pending}
          >
            <Text style={[styles.priorityText, priority === item && styles.priorityTextActive]}>
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}

      <Pressable
        style={[styles.submitButton, pending && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={pending}
      >
        <Text style={styles.submitText}>{pending ? 'Saving...' : 'Add task'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
    gap: 8,
  },
  label: {
    color: '#262626',
    fontWeight: '700',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderRadius: 8,
    borderWidth: 1,
    color: '#262626',
    padding: 12,
  },
  priorityRow: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityButton: {
    borderColor: '#E5E7EB',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 10,
  },
  priorityButtonActive: {
    backgroundColor: '#AD1457',
  },
  priorityText: {
    color: '#525252',
    fontWeight: '700',
    textAlign: 'center',
  },
  priorityTextActive: {
    color: '#ffffff',
  },
  feedback: {
    color: '#AD1457',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#AD1457',
    borderRadius: 8,
    marginTop: 4,
    padding: 14,
  },
  disabledButton: {
    opacity: 0.6,
  },
  submitText: {
    color: '#ffffff',
    fontWeight: '800',
    textAlign: 'center',
  },
});
