import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { db } from '@/lib/instantdb';

export default function HomePage() {
  const router = useRouter();
  const { user } = db.useAuth();
  const [prompt, setPrompt] = useState('');

  React.useEffect(() => {
    if (!user) {
      router.push('/auth');
    }
  }, [user]);

  const handleGenerate = () => {
    console.log('Generate:', prompt);
  };

  const handleSignOut = () => {
    db.auth.signOut();
  };

  if (!user) {
    return null;
  }

  return (
    <View className="flex-1" style={{ backgroundColor: '#0F0F0F' }}>
      <View className="px-6 pt-16 pb-4 flex-row justify-between items-center" style={{ backgroundColor: '#1A1A1A' }}>
        <Text className="text-2xl font-bold" style={{ color: '#FFFFFF' }}>GeneChords</Text>
        <TouchableOpacity onPress={handleSignOut}>
          <Text style={{ color: '#EF4444' }}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6">
        <View className="mt-8">
          <Text className="text-sm mb-2" style={{ color: '#A3A3A3' }}>
            Describe your vibe
          </Text>
          <TextInput
            className="rounded-xl p-4 text-base min-h-32"
            style={{
              backgroundColor: '#1A1A1A',
              color: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#262626',
            }}
            placeholder="Nostalgic yet fierce rock chord progression for E Minor..."
            placeholderTextColor="#737373"
            value={prompt}
            onChangeText={setPrompt}
            multiline
            textAlignVertical="top"
          />

          <TouchableOpacity
            className="mt-4 rounded-xl py-4 items-center"
            style={{ backgroundColor: '#8B5CF6' }}
            onPress={handleGenerate}
          >
            <Text className="text-white font-semibold text-base">Generate Chords</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold" style={{ color: '#FFFFFF' }}>
              Recent
            </Text>
            <TouchableOpacity onPress={() => router.push('/history')}>
              <Text style={{ color: '#8B5CF6' }}>View All</Text>
            </TouchableOpacity>
          </View>

          <View className="rounded-xl p-6 items-center justify-center" style={{ backgroundColor: '#1A1A1A', minHeight: 120 }}>
            <Text style={{ color: '#737373' }}>No progressions yet</Text>
            <Text className="text-xs mt-1" style={{ color: '#737373' }}>
              Generate your first chord progression
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
