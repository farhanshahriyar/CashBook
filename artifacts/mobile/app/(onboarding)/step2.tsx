import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import Colors from "@/constants/colors";
import { Feather } from "@expo/vector-icons";
import { useOnboarding } from "./_layout";

const C = Colors.light;

export default function Step2Screen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { data, updateData } = useOnboarding();
  const [phone, setPhone] = useState(data.phone);

  const isFormValid = phone.trim().length >= 10;

  const handleNext = () => {
    if (!isFormValid) return;
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    updateData({ phone: phone.trim() });
    router.push("/(onboarding)/step3");
  };

  return (
    <View style={[styles.container, { backgroundColor: C.backgroundCard }]}>
      <View style={[styles.header, { marginTop: insets.top + 16 }]}>
        <Pressable 
          style={styles.backButton}
          onPress={() => {
            if (Platform.OS !== "web") Haptics.selectionAsync();
            router.back();
          }}
        >
          <Feather name="arrow-left" size={24} color={C.text} />
        </Pressable>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Text style={[styles.subtitle, { color: C.textSecondary }]}>Step 2 of 4</Text>
            <Text style={[styles.title, { color: C.text }]}>What is your phone number?</Text>
            
            <View style={styles.formGroup}>
              <TextInput
                style={[styles.input, { backgroundColor: C.backgroundSecondary, color: C.text }]}
                placeholder="Phone Number"
                placeholderTextColor={C.textTertiary}
                value={phone}
                onChangeText={setPhone}
                autoFocus
                keyboardType="phone-pad"
                selectionColor={C.tint}
              />
            </View>
          </View>

          <View style={[styles.footer, { paddingBottom: insets.bottom + 24 }]}>
            <Pressable
              style={({ pressed }) => [
                styles.submitBtn,
                { 
                  backgroundColor: isFormValid ? C.tint : C.border,
                  opacity: pressed && isFormValid ? 0.9 : 1,
                },
              ]}
              onPress={handleNext}
              disabled={!isFormValid}
            >
              <Text style={[styles.submitBtnText, { color: isFormValid ? "#FFFFFF" : C.textSecondary }]}>
                Next
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, marginBottom: 12 },
  backButton: { padding: 8, marginLeft: -8, width: 40 },
  keyboardView: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 24 },
  subtitle: { fontSize: 16, fontFamily: "Inter_500Medium", marginBottom: 8 },
  title: { fontSize: 28, fontFamily: "Inter_700Bold", letterSpacing: -0.5, marginBottom: 32, lineHeight: 36 },
  formGroup: { width: "100%", marginTop: 16 },
  input: { height: 56, borderRadius: 12, paddingHorizontal: 16, fontSize: 16, fontFamily: "Inter_500Medium" },
  footer: { paddingHorizontal: 24, paddingTop: 16 },
  submitBtn: { height: 56, borderRadius: 28, alignItems: "center", justifyContent: "center" },
  submitBtnText: { fontSize: 16, fontFamily: "Inter_600SemiBold" },
});
