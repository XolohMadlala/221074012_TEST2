import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function TaskCard({ task, pending, onToggle, onDelete }) {
  return (
    <View style={[styles.card, task.completed && styles.completedCard]}>
      <View style={styles.cardHeader}>
        <View style={styles.titleBlock}>
          <Text style={[styles.title, task.completed && styles.completedTitle]}>{task.title}</Text>
          <Text style={styles.module}>{task.moduleCode}</Text>
        </View>
        <Text style={[styles.badge, styles[`priority${task.priority}`]]}>{task.priority}</Text>
      </View>

      <Text style={styles.status}>{task.completed ? 'Completed' : 'Still open'}</Text>

      <View style={styles.actions}>
        <Pressable
          style={[styles.actionButton, task.completed ? styles.reopenButton : styles.completeButton]}
          onPress={() => onToggle(task)}
          disabled={pending}
        >
          <Text style={styles.actionText}>{task.completed ? 'Reopen' : 'Complete'}</Text>
        </Pressable>
        <Pressable
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => onDelete(task.id)}
          disabled={pending}
        >
          <Text style={styles.actionText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
  },
  completedCard: {
    backgroundColor: '#F3F4F6',
    borderColor: '#9CA3AF',
  },
  cardHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  titleBlock: {
    flex: 1,
  },
  title: {
    color: '#262626',
    fontSize: 17,
    fontWeight: '800',
  },
  completedTitle: {
    color: '#6B7280',
    textDecorationLine: 'line-through',
  },
  module: {
    color: '#525252',
    marginTop: 4,
  },
  badge: {
    borderRadius: 8,
    color: '#ffffff',
    fontWeight: '800',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  priorityLow: {
    backgroundColor: '#7b8f2a',
  },
  priorityMedium: {
    backgroundColor: '#c35b00',
  },
  priorityHigh: {
    backgroundColor: '#b0003a',
  },
  status: {
    color: '#404040',
    fontWeight: '700',
    marginTop: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  actionButton: {
    borderRadius: 8,
    flex: 1,
    paddingVertical: 11,
  },
  completeButton: {
    backgroundColor: '#AD1457',
  },
  reopenButton: {
    backgroundColor: '#6a1b9a',
  },
  deleteButton: {
    backgroundColor: '#5f263c',
  },
  actionText: {
    color: '#ffffff',
    fontWeight: '800',
    textAlign: 'center',
  },
});
