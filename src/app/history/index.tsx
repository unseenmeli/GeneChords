import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HistoryPage() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <View className="px-6 pt-16 pb-4 flex-row justify-between items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-blue-600">← Back</Text>
        </TouchableOpacity>
        <Text className="text-2xl font-bold">History</Text>
        <View className="w-16" />
      </View>

      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-gray-400 text-lg">No progressions yet</Text>
      </View>
    </View>
  );
}
