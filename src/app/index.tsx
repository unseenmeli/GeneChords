import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { db } from '@/lib/instantdb';

export default function Page() {
  const router = useRouter();
  const { user, isLoading } = db.useAuth();

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isLoading) {
        if (user) {
          router.replace('/home');
        } else {
          router.replace('/auth');
        }
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [user, isLoading]);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator size="large" />
    </View>
  );
}
