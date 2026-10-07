import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen({ user, profile, loading, error, pending, onSignOut }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>MyUJ Secure Profile</Text>
      <Text style={styles.email}>Signed in as {user.email}</Text>

      {loading ? <Text style={styles.message}>Loading your profile...</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {!loading && !error && profile ? (
        <View style={styles.profileBox}>
          <Text style={styles.profileLabel}>Student name</Text>
          <Text style={styles.profileValue}>{profile.studentName}</Text>
          <Text style={styles.profileLabel}>Email</Text>
          <Text style={styles.profileValue}>{profile.email}</Text>
        </View>
      ) : null}

      <Pressable style={[styles.button, pending && styles.disabled]} onPress={onSignOut} disabled={pending}>
        <Text style={styles.buttonText}>{pending ? 'Signing out...' : 'Sign out'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderRadius: 8,
    borderWidth: 1,
    padding: 18,
  },
  title: {
    color: '#262626',
    fontSize: 23,
    fontWeight: '900',
    textAlign: 'center',
  },
  email: {
    color: '#525252',
    fontWeight: '700',
    marginTop: 8,
    textAlign: 'center',
  },
  message: {
    color: '#404040',
    fontWeight: '700',
    marginTop: 18,
    textAlign: 'center',
  },
  error: {
    color: '#991B1B',
    fontWeight: '700',
    marginTop: 18,
    textAlign: 'center',
  },
  profileBox: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 18,
    padding: 16,
  },
  profileLabel: {
    color: '#AD1457',
    fontWeight: '800',
    marginTop: 8,
  },
  profileValue: {
    color: '#262626',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 3,
  },
  button: {
    backgroundColor: '#AD1457',
    borderRadius: 8,
    marginTop: 18,
    padding: 14,
  },
  disabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '900',
    textAlign: 'center',
  },
});
