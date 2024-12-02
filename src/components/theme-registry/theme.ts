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
      secondary: mode === "dark" ? "#cccccc" : "#011A27", // Màu chữ phụ
    },
    background: {
      default: mode === "dark" ? "#1E1F26" : "#F1F1F2", // Màu nền chính
      paper: mode === "dark" ? "#283655" : "#F1F1F2", // Màu nền phụ
    },

    info: {
      main: mode === "dark" ? "#283655" : "#6fb98f", // Đặt màu chính cho primary (có thể dùng nếu cần)
    },

  },
  typography: {
    fontFamily: roboto.style.fontFamily, // Gán font Roboto
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === "dark" ? "#1E1F26" : "#F1F1F2", // Sử dụng màu nền phụ
          color: mode === "dark" ? "#1e1e1e" : "#011A27",
        },
      },
    },
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
