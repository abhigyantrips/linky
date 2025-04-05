'use client';

import { authClient } from '@/lib/client';

import { Button } from '@/components/ui/button';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Button
        onClick={async () =>
          await authClient.signIn.social({
            provider: 'google',
            callbackURL: '/dashboard',
          })
        }
      >
        Log In
      </Button>
    </div>
  );
}
