import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { db } from '@/lib/instantdb';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [sentEmail, setSentEmail] = useState(false);
  const router = useRouter();

  const { user } = db.useAuth();

  React.useEffect(() => {
    if (user) {
      router.push('/home');
    }
  }, [user]);

  const sendMagicCode = async () => {
    try {
      await db.auth.sendMagicCode({ email });
      setSentEmail(true);
    } catch (error) {
      console.error('Error sending magic code:', error);
    }
  };

  const verifyCode = async () => {
    try {
      await db.auth.signInWithMagicCode({ email, code });
    } catch (error) {
      console.error('Error verifying code:', error);
    }
  };

  if (sentEmail) {
    return (
      <View className="flex-1 justify-center items-center bg-white px-6">
        <Text className="text-3xl font-bold mb-2">Check your email</Text>
        <Text className="text-gray-600 mb-8 text-center">
          We sent a code to {email}
        </Text>

        <TextInput
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
          placeholder="Enter code"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          autoFocus
        />

        <TouchableOpacity
          className="w-full bg-black rounded-lg py-3 mb-4"
          onPress={verifyCode}
        >
          <Text className="text-white text-center font-semibold">Verify Code</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSentEmail(false)}>
          <Text className="text-gray-600">Use different email</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-4xl font-bold mb-2">Welcome</Text>
      <Text className="text-gray-600 mb-8">Sign in to continue</Text>

      <TextInput
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />

      <TouchableOpacity
        className="w-full bg-black rounded-lg py-3"
        onPress={sendMagicCode}
      >
        <Text className="text-white text-center font-semibold">Continue with Email</Text>
      </TouchableOpacity>
    </View>
  );
}
