import React, { createContext, useContext, useState } from "react";
import { Stack } from "expo-router";

type OnboardingData = {
  name: string;
  phone: string;
  dob: string;
  occupation: "Student" | "Service" | "";
  university: string;
  major: string;
  position: string;
};

type OnboardingContextType = {
  data: OnboardingData;
  updateData: (fields: Partial<OnboardingData>) => void;
};

const OnboardingContext = createContext<OnboardingContextType | null>(null);

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
}

export default function OnboardingLayout() {
  const [data, setData] = useState<OnboardingData>({
    name: "",
    phone: "",
    dob: "",
    occupation: "",
    university: "",
    major: "",
    position: "",
  });

  const updateData = (fields: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...fields }));
  };

  return (
    <OnboardingContext.Provider value={{ data, updateData }}>
      <Stack screenOptions={{ headerShown: false }} />
    </OnboardingContext.Provider>
  );
}
