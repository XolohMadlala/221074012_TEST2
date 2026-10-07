import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function AuthScreen({ mode, pending, error, onRegister, onSignIn, onSwitchMode }) {
  const [studentName, setStudentName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const isRegistering = mode === 'register';

  const submit = () => {
    const cleanName = studentName.trim();
    const cleanEmail = email.trim();

    if (isRegistering && !cleanName) {
      setLocalError('Enter your student display name.');
      return;
    }

    if (!cleanEmail || !password.trim()) {
      setLocalError('Enter your email and password.');
      return;
    }

    setLocalError('');
    if (isRegistering) {
      onRegister({ studentName: cleanName, email: cleanEmail, password });
    } else {
      onSignIn({ email: cleanEmail, password });
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{isRegistering ? 'Create MyUJ profile' : 'Sign in to MyUJ'}</Text>

      {isRegistering ? (
        <>
          <Text style={styles.label}>Student display name</Text>
          <TextInput
            style={styles.input}
            value={studentName}
            onChangeText={setStudentName}
            placeholder="Example: Noxolo Madlala"
            placeholderTextColor="#737373"
            editable={!pending}
          />
        </>
      ) : null}

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="student@example.com"
        placeholderTextColor="#737373"
        autoCapitalize="none"
        keyboardType="email-address"
        editable={!pending}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="#737373"
        secureTextEntry
        editable={!pending}
      />

      {localError || error ? <Text style={styles.error}>{localError || error}</Text> : null}

      <Pressable style={[styles.primaryButton, pending && styles.disabled]} onPress={submit} disabled={pending}>
        <Text style={styles.primaryText}>
          {pending ? 'Please wait...' : isRegistering ? 'Register' : 'Sign in'}
        </Text>
      </Pressable>

      <Pressable onPress={onSwitchMode} disabled={pending} style={styles.switchButton}>
        <Text style={styles.switchText}>
          {isRegistering ? 'Already registered? Sign in' : 'Need an account? Register'}
        </Text>
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
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 14,
    textAlign: 'center',
  },
  label: {
    color: '#262626',
    fontWeight: '700',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderRadius: 8,
    borderWidth: 1,
    color: '#262626',
    marginBottom: 12,
    padding: 12,
  },
  error: {
    color: '#991B1B',
    fontWeight: '700',
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#AD1457',
    borderRadius: 8,
    padding: 14,
  },
  disabled: {
    opacity: 0.6,
  },
  primaryText: {
    color: '#ffffff',
    fontWeight: '900',
    textAlign: 'center',
  },
  switchButton: {
    padding: 14,
  },
  switchText: {
    color: '#AD1457',
    fontWeight: '800',
    textAlign: 'center',
  },
});
