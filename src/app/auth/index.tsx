import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { db } from "@/lib/instantdb";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [sentEmail, setSentEmail] = useState(false);
  const router = useRouter();

  const { user } = db.useAuth();

  React.useEffect(() => {
    if (user) {
      router.push("/home");
    }
  }, [user]);

  const sendMagicCode = async () => {
    try {
      await db.auth.sendMagicCode({ email });
      setSentEmail(true);
    } catch (error) {
      console.error("Error sending magic code:", error);
    }
  };

  const verifyCode = async () => {
    try {
      await db.auth.signInWithMagicCode({ email, code });
    } catch (error) {
      console.error("Error verifying code:", error);
    }
  };

  if (sentEmail) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, backgroundColor: "#0F0F0F" }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 24,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              marginBottom: 8,
              color: "#FFFFFF",
            }}
          >
            Check your email
          </Text>
          <Text
            style={{ marginBottom: 32, textAlign: "center", color: "#A3A3A3" }}
          >
            We sent a code to {email}
          </Text>

          <TextInput
            style={{
              width: "100%",
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 12,
              marginBottom: 16,
              backgroundColor: "#1A1A1A",
              color: "#FFFFFF",
              borderWidth: 1,
              borderColor: "#262626",
            }}
            placeholder="Enter code"
            placeholderTextColor="#737373"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            autoFocus
          />

          <TouchableOpacity
            style={{
              width: "100%",
              borderRadius: 12,
              paddingVertical: 12,
              marginBottom: 16,
              backgroundColor: "#8B5CF6",
              alignItems: "center",
            }}
            onPress={verifyCode}
          >
            <Text style={{ color: "#FFFFFF", fontWeight: "600" }}>
              Verify Code
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setSentEmail(false)}>
            <Text style={{ color: "#A3A3A3" }}>Use different email</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#0F0F0F" }}
    >
      <Image src="../static/trying1.jpg" />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 24,
        }}
      >
        <Text
          style={{
            fontSize: 48,
            fontWeight: "bold",
            marginBottom: 8,
            color: "#FFFFFF",
          }}
        >
          GeneChords
        </Text>
        <Text style={{ marginBottom: 8, color: "#10B981" }}>
          Turn words into music
        </Text>
        <Text style={{ marginBottom: 48, color: "#A3A3A3" }}>
          Sign in to start generating
        </Text>

        <TextInput
          style={{
            width: "100%",
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 12,
            marginBottom: 16,
            backgroundColor: "#1A1A1A",
            color: "#FFFFFF",
            borderWidth: 1,
            borderColor: "#262626",
          }}
          placeholder="Enter your email"
          placeholderTextColor="#737373"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />

        <TouchableOpacity
          style={{
            width: "100%",
            borderRadius: 12,
            paddingVertical: 12,
            backgroundColor: "#8B5CF6",
            alignItems: "center",
          }}
          onPress={sendMagicCode}
        >
          <Text style={{ color: "#FFFFFF", fontWeight: "600" }}>
            Continue with Email
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
