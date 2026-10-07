import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';
import { services } from '../data/services';

export default function ServicesScreen() {
  const { savedServices, addSavedService, removeSavedService, theme } = useApp();
  const dark = theme === 'dark';

  return (
    <View style={[styles.screen, dark && styles.darkScreen]}>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const saved = savedServices.some((service) => service.id === item.id);
          return (
            <View style={[styles.card, saved && styles.savedCard, dark && styles.darkCard]}>
              <Text style={[styles.name, dark && styles.darkText]}>{item.name}</Text>
              <Text style={[styles.location, dark && styles.darkSoft]}>{item.location}</Text>
              <Text style={[styles.description, dark && styles.darkText]}>{item.description}</Text>
              <Pressable
                style={[styles.button, saved && styles.removeButton]}
                onPress={() => (saved ? removeSavedService(item.id) : addSavedService(item))}
              >
                <Text style={styles.buttonText}>{saved ? 'Remove saved' : 'Save service'}</Text>
              </Pressable>
            </View>
          );
        }}
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
  list: {
    padding: 16,
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
  savedCard: {
    borderColor: '#AD1457',
    borderWidth: 2,
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
    backgroundColor: '#AD1457',
    borderRadius: 8,
    marginTop: 14,
    padding: 12,
  },
  removeButton: {
    backgroundColor: '#5f263c',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '900',
    textAlign: 'center',
  },
});
