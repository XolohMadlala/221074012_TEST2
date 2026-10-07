import { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AlertCard from './src/components/AlertCard';
import { alerts } from './src/data/alerts';

export default function App() {
  const [savedAlertIds, setSavedAlertIds] = useState([]);

  const toggleSaved = (alertId) => {
    setSavedAlertIds((current) => {
      if (current.includes(alertId)) {
        return current.filter((id) => id !== alertId);
      }
      return [...current, alertId];
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Text style={styles.heading}>UJ Campus Alert Centre</Text>
        <Text style={styles.count}>Saved alerts: {savedAlertIds.length}</Text>
        <FlatList
          data={alerts}
          keyExtractor={(item) => item.id}
          extraData={savedAlertIds}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <AlertCard
              alert={item}
              saved={savedAlertIds.includes(item.id)}
              onToggleSaved={toggleSaved}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FAFAFA',
    flex: 1,
  },
  container: {
    backgroundColor: '#FAFAFA',
    flex: 1,
    padding: 18,
  },
  heading: {
    color: '#262626',
    backgroundColor: '#FFFFFF',
    borderLeftColor: '#AD1457',
    borderLeftWidth: 5,
    borderRadius: 8,
    fontSize: 25,
    fontWeight: '900',
    marginBottom: 12,
    padding: 14,
    textAlign: 'center',
  },
  count: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderRadius: 8,
    borderWidth: 1,
    color: '#262626',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 14,
    padding: 12,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 28,
  },
});
