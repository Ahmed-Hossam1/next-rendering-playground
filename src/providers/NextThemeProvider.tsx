"use client";

import { ThemeProvider, type ThemeProviderProps } from "next-themes";

const NextThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return <ThemeProvider {...props}>{children}</ThemeProvider>;
};

export default NextThemeProvider;
