import { Roboto } from "next/font/google";
import { createTheme, ThemeOptions } from "@mui/material/styles";

// Font Roboto
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Base function để tạo theme dựa trên mode (light/dark)
export const getTheme = (mode: "light" | "dark"): ThemeOptions => ({
  palette: {
    mode, // Chế độ light hoặc dark
    text: {
      primary: mode === "dark" ? "#ffffff" : "#011A27", // Màu chữ chính
      secondary: mode === "dark" ? "#cccccc" : "#F0810F", // Màu chữ phụ
    },
    background: {
      default: mode === "dark" ? "#121212" : "#ffffff", // Màu nền chính
      paper: mode === "dark" ? "#1e1e1e" : "#063852", // Màu nền phụ
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily, // Gán font Roboto
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }: any) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#60a5fa",
          }),
        }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }: any) => ({
          color:
            theme.palette.mode === "dark"
              ? theme.palette.text.primary
              : theme.palette.text.secondary,
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
        }),
      },
    },
  },
});

// Hàm trả về theme hoàn chỉnh dựa trên mode
export const createCustomTheme = (mode: "light" | "dark") => {
  return createTheme(getTheme(mode));
};
