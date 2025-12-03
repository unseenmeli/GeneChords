import { init } from '@instantdb/react-native';

type Schema = {
  users: {
    id: string;
    email: string;
    createdAt: number;
  };
  progressions: {
    id: string;
    userId: string;
    prompt: string;
    progression: string[];
    strummingPattern: string;
    bpm: number;
    key: string;
    genre?: string;
    mood?: string[];
    createdAt: number;
    isFavorite: boolean;
  };
};

const APP_ID = process.env.EXPO_PUBLIC_INSTANTDB_APP_ID;

if (!APP_ID) {
  throw new Error('EXPO_PUBLIC_INSTANTDB_APP_ID is not defined in .env file');
}

export const db = init<Schema>({ appId: APP_ID });
