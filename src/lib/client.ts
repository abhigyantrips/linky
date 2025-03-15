import { createAuthClient } from 'better-auth/react';

import { siteConfig } from '@/config/site';

export const authClient = createAuthClient({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : siteConfig.url,
});
