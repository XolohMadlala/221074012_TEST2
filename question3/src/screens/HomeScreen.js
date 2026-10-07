import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';

export default function HomeScreen({ navigation }) {
  const { savedServices, theme, toggleTheme, hydrated } = useApp();
  const dark = theme === 'dark';

  return (
    <View style={[styles.screen, dark && styles.darkScreen]}>
      <Text style={[styles.title, dark && styles.darkText]}>UJ Campus Services</Text>
      <Text style={[styles.count, dark && styles.darkCount]}>
        Saved Services: {hydrated ? savedServices.length : '...'}
      </Text>

      <Pressable style={styles.button} onPress={() => navigation.navigate('Services')}>
        <Text style={styles.buttonText}>Browse services</Text>
      </Pressable>
      <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate('Saved Services')}>
        <Text style={styles.secondaryText}>View saved services</Text>
      </Pressable>
      <Pressable style={styles.themeButton} onPress={toggleTheme}>
        <Text style={styles.themeText}>{dark ? 'Use light theme' : 'Use dark theme'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#FAFAFA',
    flex: 1,
    justifyContent: 'center',
    padding: 18,
  },
  darkScreen: {
    backgroundColor: '#2a1020',
  },
  title: {
    color: '#262626',
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
  },
  darkText: {
    color: '#ffeaf3',
  },
  count: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderRadius: 8,
    borderWidth: 1,
    color: '#262626',
    fontSize: 20,
    fontWeight: '900',
    marginVertical: 20,
    padding: 16,
    textAlign: 'center',
  },
  darkCount: {
    backgroundColor: '#451a32',
    color: '#ffffff',
  },
  button: {
    backgroundColor: '#AD1457',
    borderRadius: 8,
    padding: 14,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '900',
    textAlign: 'center',
  },
  secondaryButton: {
    borderColor: '#AD1457',
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 12,
    padding: 14,
  },
  secondaryText: {
    color: '#AD1457',
    fontWeight: '900',
    textAlign: 'center',
  },
  themeButton: {
    marginTop: 12,
    padding: 14,
  },
  themeText: {
    color: '#AD1457',
    fontWeight: '900',
    textAlign: 'center',
  },
});
