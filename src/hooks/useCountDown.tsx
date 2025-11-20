import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useCountDown = (
  initialSeconds: number,
  autoReset: boolean = false,
  localString: string
) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const loadCountdown = async () => {
      const storedStartTime = await AsyncStorage.getItem(localString);
      if (storedStartTime) {
        const startTime = parseInt(storedStartTime, 10);
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const remainingTime = Math.max(initialSeconds - elapsed, 0);
        setSeconds(remainingTime);
        if (remainingTime > 0) setIsRunning(true);
      }
    };

    loadCountdown();
  }, [initialSeconds]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isRunning && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsRunning(false);
      if (autoReset) setSeconds(initialSeconds);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, seconds, autoReset, initialSeconds]);

  const start = async () => {
    if (seconds > 0) {
      setIsRunning(true);
      await AsyncStorage.setItem(localString, Date.now().toString());
    }
  };

  const pause = () => {
    setIsRunning(false);
  };

  const reset = async (newSeconds?: number) => {
    const resetSeconds = newSeconds ?? initialSeconds;
    setIsRunning(false);
    setSeconds(resetSeconds);
    await AsyncStorage.removeItem(localString);
  };

  return { seconds, isRunning, start, pause, reset };
};

export default useCountDown;
