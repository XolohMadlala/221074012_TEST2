import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';

export default function SavedServicesScreen() {
  const { savedServices, removeSavedService, theme, hydrated } = useApp();
  const dark = theme === 'dark';

  if (!hydrated) {
    return (
      <View style={[styles.center, dark && styles.darkScreen]}>
        <Text style={[styles.loading, dark && styles.darkText]}>Restoring saved services...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.screen, dark && styles.darkScreen]}>
      <FlatList
        data={savedServices}
        keyExtractor={(item) => item.id}
        contentContainerStyle={savedServices.length === 0 ? styles.emptyList : styles.list}
        ListEmptyComponent={
          <View style={[styles.emptyBox, dark && styles.darkCard]}>
            <Text style={[styles.emptyTitle, dark && styles.darkText]}>No saved services yet</Text>
            <Text style={[styles.emptyText, dark && styles.darkSoft]}>
              Save services from the Services screen and they will appear here.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={[styles.card, dark && styles.darkCard]}>
            <Text style={[styles.name, dark && styles.darkText]}>{item.name}</Text>
            <Text style={[styles.location, dark && styles.darkSoft]}>{item.location}</Text>
            <Text style={[styles.description, dark && styles.darkText]}>{item.description}</Text>
            <Pressable style={styles.button} onPress={() => removeSavedService(item.id)}>
              <Text style={styles.buttonText}>Remove</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#FAFAFA',
    flex: 1,
  },
  darkScreen: {
    backgroundColor: '#2a1020',
  },
  center: {
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    flex: 1,
    justifyContent: 'center',
  },
  list: {
    padding: 16,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  loading: {
    color: '#404040',
    fontWeight: '900',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
  },
  darkCard: {
    backgroundColor: '#451a32',
  },
  name: {
    color: '#262626',
    fontSize: 18,
    fontWeight: '900',
  },
  darkText: {
    color: '#ffffff',
  },
  location: {
    color: '#AD1457',
    fontWeight: '800',
    marginTop: 4,
  },
  darkSoft: {
    color: '#f7bad0',
  },
  description: {
    color: '#525252',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#5f263c',
    borderRadius: 8,
    marginTop: 14,
    padding: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '900',
    textAlign: 'center',
  },
  emptyBox: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderRadius: 8,
    borderWidth: 1,
    padding: 22,
  },
  emptyTitle: {
    color: '#262626',
    fontSize: 18,
    fontWeight: '900',
  },
  emptyText: {
    color: '#525252',
    marginTop: 8,
    textAlign: 'center',
  },
});
