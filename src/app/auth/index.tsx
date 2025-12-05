import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { db } from "@/lib/instantdb";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [sentEmail, setSentEmail] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [codeError, setCodeError] = useState("");
  const router = useRouter();
  const slideAnim = useRef(new Animated.Value(0)).current;

  const { user } = db.useAuth();

  useEffect(() => {
    if (user) {
      router.push("/home");
    }
  }, [user]);

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: sentEmail ? 1 : 0,
      useNativeDriver: true,
      tension: 50,
      friction: 8,
    }).start();
  }, [sentEmail]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sendMagicCode = async () => {
    setEmailError("");

    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }

    try {
      await db.auth.sendMagicCode({ email });
      setSentEmail(true);
    } catch (error) {
      console.error("Error sending magic code:", error);
      setEmailError("Failed to send code. Please try again.");
    }
  };

  const verifyCode = async () => {
    setCodeError("");

    if (!code.trim()) {
      setCodeError("Code is required");
      return;
    }

    try {
      await db.auth.signInWithMagicCode({ email, code });
    } catch (error) {
      console.error("Error verifying code:", error);
      setCodeError("Invalid code. Please try again.");
    }
  };

  if (sentEmail) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, backgroundColor: "#0F0F0F" }}
      >
        <Image
          source={require("../static/trying1.jpg")}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            opacity: 0.4,
          }}
          resizeMode="cover"
        />
        <View className="absolute z-10 w-screen bottom-10 items-center justify-center p-2">
          <Text className="text-4xl text-green-400 font-extrabold">
            Speak your Music.
          </Text>
          <Text className="text-sm text-white">
            Copyright 2025 Meli. All rights reserved.
          </Text>
        </View>
        <Animated.View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 24,
            transform: [
              {
                translateX: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [300, 0],
                }),
              },
            ],
            opacity: slideAnim,
          }}
        >
          <Text
            style={{
              fontSize: 60,
              fontWeight: "bold",
              marginBottom: 8,
              color: "#FFFFFF",
            }}
          >
            GeneChords
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
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
              marginBottom: codeError ? 8 : 16,
              backgroundColor: "#1A1A1A",
              color: "#FFFFFF",
              borderWidth: 1,
              borderColor: codeError ? "#EF4444" : "#262626",
            }}
            placeholder="Enter code"
            placeholderTextColor="#737373"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            autoFocus
          />

          {codeError ? (
            <Text
              style={{
                color: "#EF4444",
                fontSize: 14,
                marginBottom: 16,
                width: "100%",
              }}
            >
              {codeError}
            </Text>
          ) : null}

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
        </Animated.View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#0F0F0F" }}
    >
      <View className="absolute z-10 w-screen bottom-10 items-center justify-center p-2">
        <Text className="text-4xl text-green-400 font-extrabold">
          Speak your Music.
        </Text>
        <Text className="text-sm text-white">
          Copyright 2025 Meli. All rights reserved.
        </Text>
      </View>
      <Image
        source={require("../static/trying1.jpg")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.4,
        }}
        resizeMode="cover"
      />

      <Animated.View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 24,
          transform: [
            {
              translateX: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -300],
              }),
            },
          ],
          opacity: slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
        }}
      >
        <Text
          style={{
            fontSize: 60,
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
            marginBottom: emailError ? 8 : 16,
            backgroundColor: "#1A1A1A",
            color: "#FFFFFF",
            borderWidth: 1,
            borderColor: emailError ? "#EF4444" : "#262626",
          }}
          placeholder="Enter your email"
          placeholderTextColor="#737373"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />

        {emailError ? (
          <Text
            style={{
              color: "#EF4444",
              fontSize: 14,
              marginBottom: 16,
              width: "100%",
            }}
          >
            {emailError}
          </Text>
        ) : null}

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
      </Animated.View>
    </KeyboardAvoidingView>
  );
}
