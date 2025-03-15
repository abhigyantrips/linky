'use client';

import { Button } from '@heroui/react';

import { authClient } from '@/lib/client';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Button
        onPress={async () =>
          await authClient.signIn.social({ provider: 'google' })
        }
      >
        Log In
      </Button>
    </div>
  );
}
