"use client";
import React, { useState, useMemo, useEffect } from "react";
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

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--wavebgt", theme.palette.background.wavebgt);
    root.style.setProperty("--wavetop", theme.palette.background.wavetop);
    root.style.setProperty("--wavebottom", theme.palette.background.wavebottom);
    root.style.setProperty("--progresswavetop", theme.palette.background.progresswavetop);
    root.style.setProperty("--progresswavebottom", theme.palette.background.progresswavebottom);
    root.style.setProperty("--wavebgf", theme.palette.background.wavebgf);
    root.style.setProperty("--darkstormy", theme.palette.background.darkstormy);

    root.style.setProperty("--text-white", theme.palette.text.white);

  }, []);
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
