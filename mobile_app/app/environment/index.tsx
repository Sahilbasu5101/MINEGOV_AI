import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function EnvironmentHome() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/(main)');
  }, [router]);
  return null;
}

