"use client";

import { useEffect, useState } from "react";

export const useWindowWidth = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return window.innerWidth;
};
