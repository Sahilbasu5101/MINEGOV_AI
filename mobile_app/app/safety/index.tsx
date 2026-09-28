import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/context/auth-context';

export default function SafetyHome() {
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (session?.user.role === 'TECHNICAL_COMPETENT_PERSON') {
      router.replace('/safety/technical');
    } else if (
      session?.user.role === 'SIRDAR' ||
      session?.user.role === 'MINE_MANAGER' ||
      session?.user.role === 'SAFETY_INSPECTOR' ||
      session?.user.domain === 'safety'
    ) {
      router.replace('/safety/sirdar');
    } else {
      router.replace('/(main)');
    }
  }, [session, router]);

  return null;
}

