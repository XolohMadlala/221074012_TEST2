import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import AuthScreen from './src/components/AuthScreen';
import ProfileScreen from './src/components/ProfileScreen';
import { auth, db } from './src/firebase/firebaseConfig';

function friendlyAuthError(error) {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'That email is already registered.';
    case 'auth/invalid-email':
      return 'Enter a valid email address.';
    case 'auth/weak-password':
      return 'Use a stronger password with at least 6 characters.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Email or password is incorrect.';
    case 'auth/network-request-failed':
      return 'Network error. Check your connection and try again.';
    default:
      return error.message || 'Authentication failed.';
  }
}

export default function App() {
  const [authChecking, setAuthChecking] = useState(true);
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState('login');
  const [authPending, setAuthPending] = useState(false);
  const [authError, setAuthError] = useState('');
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [signOutPending, setSignOutPending] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setAuthChecking(false);
      setProfile(null);
      setProfileError('');
      setProfileLoading(Boolean(nextUser));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) {
      return undefined;
    }

    let active = true;

    getDoc(doc(db, 'users', user.uid))
      .then((snapshot) => {
        if (!active) {
          return;
        }

        if (snapshot.exists()) {
          setProfile(snapshot.data());
        } else {
          setProfileError('No profile document exists for this user.');
        }
      })
      .catch((error) => {
        if (active) {
          setProfileError(`Could not load profile: ${error.message}`);
        }
      })
      .finally(() => {
        if (active) {
          setProfileLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [user]);

  const register = async ({ studentName, email, password }) => {
    setAuthPending(true);
    setAuthError('');

    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', credential.user.uid), {
        studentName,
        email: credential.user.email,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      setAuthError(friendlyAuthError(error));
    } finally {
      setAuthPending(false);
    }
  };

  const signIn = async ({ email, password }) => {
    setAuthPending(true);
    setAuthError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setAuthError(friendlyAuthError(error));
    } finally {
      setAuthPending(false);
    }
  };

  const handleSignOut = async () => {
    setSignOutPending(true);
    setProfile(null);
    setProfileError('');

    try {
      await signOut(auth);
    } catch (error) {
      setProfileError(`Could not sign out: ${error.message}`);
    } finally {
      setSignOutPending(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Text style={styles.heading}>MyUJ Secure Profile</Text>
        {authChecking ? (
          <Text style={styles.loading}>Checking your Firebase session...</Text>
        ) : user ? (
          <ProfileScreen
            user={user}
            profile={profile}
            loading={profileLoading}
            error={profileError}
            pending={signOutPending}
            onSignOut={handleSignOut}
          />
        ) : (
          <AuthScreen
            mode={mode}
            pending={authPending}
            error={authError}
            onRegister={register}
            onSignIn={signIn}
            onSwitchMode={() => {
              setAuthError('');
              setMode((current) => (current === 'login' ? 'register' : 'login'));
            }}
          />
        )}
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
    justifyContent: 'center',
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
    marginBottom: 18,
    padding: 14,
    textAlign: 'center',
  },
  loading: {
    color: '#404040',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
});
