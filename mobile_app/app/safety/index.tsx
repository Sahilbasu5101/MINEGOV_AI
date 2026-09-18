import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/context/auth-context';

export default function SafetyHome() {
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (session?.user.role === 'SIRDAR') {
      router.replace('/safety/sirdar');
    } else {
      router.replace('/(main)');
    }
  }, [session, router]);

  return null;
}

