/* eslint-disable react-hooks/refs */
import { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';

export default function AlertCard({ alert, saved, onToggleSaved }) {
  const fade = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 320,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 320,
        useNativeDriver: true,
      }),
    ]);

    animation.start();

    return () => {
      animation.stop();
    };
  }, [fade, translateY]);

  return (
    <Animated.View
      style={[
        styles.card,
        saved && styles.savedCard,
        {
          opacity: fade,
          transform: [{ translateY }],
        },
      ]}
    >
      <Text style={styles.category}>{alert.category}</Text>
      <Text style={styles.title}>{alert.title}</Text>
      <Text style={styles.message}>{alert.message}</Text>
      <Pressable
        style={[styles.button, saved && styles.savedButton]}
        onPress={() => onToggleSaved(alert.id)}
      >
        <Text style={styles.buttonText}>{saved ? 'Unsave alert' : 'Save alert'}</Text>
      </Pressable>
    </Animated.View>
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
  savedCard: {
    backgroundColor: '#F3F4F6',
    borderColor: '#AD1457',
    borderWidth: 2,
  },
  category: {
    color: '#AD1457',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  title: {
    color: '#262626',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 6,
  },
  message: {
    color: '#525252',
    lineHeight: 20,
    marginTop: 8,
  },
  button: {
    backgroundColor: '#AD1457',
    borderRadius: 8,
    marginTop: 14,
    padding: 12,
  },
  savedButton: {
    backgroundColor: '#5f263c',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '900',
    textAlign: 'center',
  },
});
