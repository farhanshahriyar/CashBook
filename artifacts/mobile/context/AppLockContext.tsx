import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { AppState, AppStateStatus, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";

const STORAGE_KEY = "@cashbook_app_lock_enabled";

type AppLockContextType = {
  /** Whether biometric hardware is available on this device */
  isBiometricAvailable: boolean;
  /** Whether the user has enabled the App Lock toggle */
  isAppLockEnabled: boolean;
  /** Whether the app is currently locked (overlay should be shown) */
  isLocked: boolean;
  /** Toggle App Lock on or off (prompts biometric when enabling) */
  toggleAppLock: () => Promise<void>;
  /** Trigger the biometric prompt to unlock */
  unlockApp: () => Promise<boolean>;
};

const AppLockContext = createContext<AppLockContextType | null>(null);

export function AppLockProvider({ children }: { children: React.ReactNode }) {
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [isAppLockEnabled, setIsAppLockEnabled] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const appState = useRef(AppState.currentState);

  // ── 1. Check hardware + load persisted preference ────────────
  useEffect(() => {
    (async () => {
      if (Platform.OS === "web") {
        setIsReady(true);
        return;
      }

      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      setIsBiometricAvailable(hasHardware && isEnrolled);

      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored === "true" && hasHardware && isEnrolled) {
          setIsAppLockEnabled(true);
          setIsLocked(true); // Lock on app launch when enabled
        }
      } catch {
        // Silently ignore storage read errors
      }

      setIsReady(true);
    })();
  }, []);

  // ── 2. Re-lock when app goes to background ──────────────────
  useEffect(() => {
    if (Platform.OS === "web") return;

    const subscription = AppState.addEventListener("change", (nextAppState: AppStateStatus) => {
      // App went from active/foreground → background/inactive
      if (
        appState.current === "active" &&
        (nextAppState === "background" || nextAppState === "inactive")
      ) {
        if (isAppLockEnabled) {
          setIsLocked(true);
        }
      }
      appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, [isAppLockEnabled]);

  // ── 3. Toggle handler ────────────────────────────────────────
  const toggleAppLock = useCallback(async () => {
    if (Platform.OS === "web") return;

    if (!isAppLockEnabled) {
      // Enabling → authenticate first to confirm ownership
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to enable App Lock",
        fallbackLabel: "Use Passcode",
        cancelLabel: "Cancel",
        disableDeviceFallback: false,
      });

      if (result.success) {
        setIsAppLockEnabled(true);
        await AsyncStorage.setItem(STORAGE_KEY, "true");
      }
    } else {
      // Disabling → authenticate to confirm
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to disable App Lock",
        fallbackLabel: "Use Passcode",
        cancelLabel: "Cancel",
        disableDeviceFallback: false,
      });

      if (result.success) {
        setIsAppLockEnabled(false);
        setIsLocked(false);
        await AsyncStorage.setItem(STORAGE_KEY, "false");
      }
    }
  }, [isAppLockEnabled]);

  // ── 4. Unlock handler ────────────────────────────────────────
  const unlockApp = useCallback(async () => {
    if (Platform.OS === "web") return true;

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Unlock CashBook",
      fallbackLabel: "Use Passcode",
      cancelLabel: "Cancel",
      disableDeviceFallback: false,
    });

    if (result.success) {
      setIsLocked(false);
      return true;
    }
    return false;
  }, []);

  // Don't render children until we know the stored preference
  if (!isReady) return null;

  return (
    <AppLockContext.Provider
      value={{
        isBiometricAvailable,
        isAppLockEnabled,
        isLocked,
        toggleAppLock,
        unlockApp,
      }}
    >
      {children}
    </AppLockContext.Provider>
  );
}

export function useAppLock() {
  const context = useContext(AppLockContext);
  if (!context) {
    throw new Error("useAppLock must be used within an AppLockProvider");
  }
  return context;
}
