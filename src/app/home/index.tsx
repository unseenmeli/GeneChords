import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { db } from '@/lib/instantdb';

export default function HomePage() {
  const router = useRouter();
  const { user } = db.useAuth();

  React.useEffect(() => {
    if (!user) {
      router.push('/auth');
    }
  }, [user]);

  const handleSignOut = () => {
    db.auth.signOut();
  };

  if (!user) {
    return null;
  }

  return (
    <View className="flex-1 bg-white">
      <View className="px-6 pt-16 pb-4 flex-row justify-between items-center">
        <Text className="text-2xl font-bold">Home</Text>
        <TouchableOpacity onPress={handleSignOut}>
          <Text className="text-red-600">Sign Out</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-xl font-semibold mb-2">Welcome!</Text>
        <Text className="text-gray-600 mb-8">{user.email}</Text>

        <View className="w-full bg-gray-100 rounded-lg p-6 mb-4">
          <Text className="font-semibold mb-2">Generate Chord Progression</Text>
          <Text className="text-gray-600 text-sm">Coming soon...</Text>
        </View>

        <TouchableOpacity
          className="w-full bg-gray-100 rounded-lg p-4"
          onPress={() => router.push('/history')}
        >
          <Text className="font-semibold">View History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
