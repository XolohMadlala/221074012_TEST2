import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

const STORAGE_KEY = '@uj-campus-services:v1';
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [savedServices, setSavedServices] = useState([]);
  const [theme, setTheme] = useState('light');
  const [hydrated, setHydrated] = useState(false);
  const persistChain = useRef(Promise.resolve());

  useEffect(() => {
    let active = true;

    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (!active || !raw) {
          return;
        }

        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.savedServices)) {
          setSavedServices(parsed.savedServices.filter((item) => item && item.id));
        }
        if (parsed.theme === 'dark' || parsed.theme === 'light') {
          setTheme(parsed.theme);
        }
      })
      .catch(() => {
        if (active) {
          setSavedServices([]);
          setTheme('light');
        }
      })
      .finally(() => {
        if (active) {
          setHydrated(true);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    const payload = JSON.stringify({ savedServices, theme });

    persistChain.current = persistChain.current
      .catch(() => undefined)
      .then(() => AsyncStorage.setItem(STORAGE_KEY, payload))
      .catch(() => undefined);
  }, [hydrated, savedServices, theme]);

  const addSavedService = (service) => {
    setSavedServices((current) => {
      if (current.some((item) => item.id === service.id)) {
        return current;
      }
      return [...current, service];
    });
  };

  const removeSavedService = (serviceId) => {
    setSavedServices((current) => current.filter((service) => service.id !== serviceId));
  };

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  };

  return (
    <AppContext.Provider
      value={{
        savedServices,
        addSavedService,
        removeSavedService,
        theme,
        toggleTheme,
        hydrated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const value = useContext(AppContext);
  if (!value) {
    throw new Error('useApp must be used inside AppProvider');
  }
  return value;
}
