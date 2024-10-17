import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

export const localStorage = {
  setItem: async (key: string, value: string) => {
    storage.set(key, value);
  },
  getItem: async (key: string) => {
    const value = storage.getString(key);
    return value === undefined ? null : value;
  },
  removeItem: async (key: string) => {
    storage.delete(key);
  },
  removeAll: async () => {
    storage.clearAll();
  },
};
