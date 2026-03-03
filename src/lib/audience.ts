'use client';

import { createContext, useContext } from 'react';

export type Audience = 'corporate' | 'consumer';

export const AudienceContext = createContext<Audience>('consumer');

export function useAudience(): Audience {
  return useContext(AudienceContext);
}
