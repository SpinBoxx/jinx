// app/providers.tsx
"use client";

import { NextUIProvider as NextuiProvider } from "@nextui-org/react";

export function NextUIProvider({ children }: { children: React.ReactNode }) {
  return <NextuiProvider>{children}</NextuiProvider>;
}
