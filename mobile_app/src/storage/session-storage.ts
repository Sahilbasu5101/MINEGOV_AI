import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AuthSession } from '../types/auth';
const key = 'minegov.auth.session';
export const sessionStorage = { async load() { const value = await AsyncStorage.getItem(key); return value ? JSON.parse(value) as AuthSession : null; }, save: (session: AuthSession) => AsyncStorage.setItem(key, JSON.stringify(session)), clear: () => AsyncStorage.removeItem(key) };
