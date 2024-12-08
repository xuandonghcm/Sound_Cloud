
import HeaderAppBar from '@/components/layout/header';
import BottomAppBar from '@/components/layout/footer';
import ThemeRegistry from '@/components/theme-registry/theme.registry';
import { AlertDialogProvider } from '@/context/AlertDialogContext';




export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">

      <body>
        <script src="https://unpkg.com/wavesurfer.js@7/dist/plugins/timeline.esm.js"></script>
        <ThemeRegistry>
          <AlertDialogProvider>
            <HeaderAppBar />
            {children}
            <BottomAppBar />
          </AlertDialogProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
