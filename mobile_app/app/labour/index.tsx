import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function LabourHome() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/(main)');
  }, [router]);
  return null;
}

