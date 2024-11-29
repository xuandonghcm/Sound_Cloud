"use client";
import React, { useState, useMemo } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NextAppDirEmotionCacheProvider from "./emotion.cache";
import { createCustomTheme } from "./theme";

// Thêm kiểu ThemeContext để chia sẻ trạng thái theme
export const ThemeContext = React.createContext({
  toggleTheme: () => { },
  mode: "light" as "light" | "dark",
});

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const theme = useMemo(() => createCustomTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeContext.Provider value={{ toggleTheme, mode }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ThemeContext.Provider>
    </NextAppDirEmotionCacheProvider>
  );
}
