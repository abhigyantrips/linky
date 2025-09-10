'use client';

import { QRCodeSVG } from 'qrcode.react';

import { authClient } from '@/lib/client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="bg-neutral-50">
        <CardContent className="flex flex-col gap-4 md:flex-row md:gap-8">
          <Card className="aspect-square size-full bg-white">
            <CardContent>
              <QRCodeSVG
                className="size-full"
                value="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              />
            </CardContent>
          </Card>

          <div className="flex max-w-xs flex-col items-start justify-between md:max-w-sm">
            <div className="flex flex-col space-y-1 md:space-y-2">
              <h2 className="text-2xl font-bold md:text-3xl">linky.</h2>
              <p className="text-muted-foreground text-sm md:text-base">
                turn links into smaller links so that people can click on
                smaller links and then get redirected to bigger links.
              </p>
            </div>
            <div className="flex w-full justify-end">
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
