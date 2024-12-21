import { Roboto } from "next/font/google";
import { createTheme, ThemeOptions } from "@mui/material/styles";

// Font Roboto
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});
declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    navbar: string; // Thêm thuộc tính navbar
    footer: string;
    wavetop: string;
    wavebottom: string;
    progresswavebottom: string;
    progresswavetop: string;
    wavebgf: string;
    wavebgt: string;
    darkstormy: string;
    signup: string;
    signupContainer: string;
  }
  interface TypeText {
    white: string; // Thêm thuộc tính navbar

  }
}
// Base function để tạo theme dựa trên mode (light/dark)
export const getTheme = (mode: "light" | "dark"): ThemeOptions => ({
  palette: {
    mode, // Chế độ light hoặc dark
    text: {
      primary: mode === "dark" ? "#ffffff" : "#011A27", // Màu chữ chính
      secondary: mode === "dark" ? "#cccccc" : "#011A27", // Màu chữ phụ
      white: "#ffffff",

    },
    background: {
      default: mode === "dark" ? "#181C14" : "#EEEEEE", // màu nền chính
      paper: mode === "dark" ? "#283655" : "#B2C8DF",// màu nền phụ

      navbar: mode === "dark" ? "#212e49" : "#6E85B7",// màu nền navbar
      footer: mode === "dark" ? "#283655" : "#a7b4d2",// màu nền footer

      wavetop: "#283655", // màu nền khi chạy nhạc
      wavebottom: "#7077A1", // màu nền wave
      progresswavetop: "#ff5500", // màu nền khi chạy nhạc
      progresswavebottom: "#ff7e51",  // màu nền khi chạy nhạc

      wavebgf: "#3b4762",
      wavebgt: "#a2a9b8",
      darkstormy: "#353f58",
      signup: '#ffffff',
      signupContainer: "#cccccc",
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
