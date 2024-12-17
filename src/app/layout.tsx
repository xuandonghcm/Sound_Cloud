
import HeaderAppBar from '@/components/layout/header';
import BottomAppBar from '@/components/layout/footer';
import ThemeRegistry from '@/components/theme-registry/theme.registry';
import { AlertDialogProvider } from '@/context/AlertDialogContext';
import '@/style/global.scss'
import Container from '@mui/material/Container/Container';



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">

      <body>
        <script src="https://unpkg.com/wavesurfer.js@7/dist/plugins/timeline.esm.js"></script>
        <ThemeRegistry>
          <AlertDialogProvider>
            <HeaderAppBar />
            <Container sx={{ marginTop: "20px", paddingBottom: "180px" }}>{children}</Container>
            <BottomAppBar />

          </AlertDialogProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
