import { Platform } from 'react-native';

const KEY = 'miPlanEstudio_v1_react';

const storage = {
  async save(state) {
    try {
      if (Platform.OS === 'web') {
        window.localStorage.setItem(KEY, JSON.stringify(state));
      } else {
        const AsyncStorage = require('@react-native-async-storage/async-storage').default;
        await AsyncStorage.setItem(KEY, JSON.stringify(state));
      }
    } catch (e) { console.warn('Storage save failed', e); }
  },
  async load() {
    try {
      if (Platform.OS === 'web') {
        const v = window.localStorage.getItem(KEY);
        return v ? JSON.parse(v) : null;
      } else {
        const AsyncStorage = require('@react-native-async-storage/async-storage').default;
        const v = await AsyncStorage.getItem(KEY);
        return v ? JSON.parse(v) : null;
      }
    } catch (e) { console.warn('Storage load failed', e); return null; }
  }
};

export default storage;
