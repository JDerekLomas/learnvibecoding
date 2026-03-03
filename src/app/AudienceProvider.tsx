'use client';

import { AudienceContext, type Audience } from '@/lib/audience';

export function AudienceProvider({
  audience,
  children,
}: {
  audience: Audience;
  children: React.ReactNode;
}) {
  return (
    <AudienceContext value={audience}>
      {children}
    </AudienceContext>
  );
}
