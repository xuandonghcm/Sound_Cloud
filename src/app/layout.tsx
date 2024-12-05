
import HeaderAppBar from '@/components/layout/header';
import BottomAppBar from '@/components/layout/footer';
import ThemeRegistry from '@/components/theme-registry/theme.registry';
import { SnackbarProvider } from '@/context/SnackbarContext';



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <SnackbarProvider>
            <HeaderAppBar />
            {children}
            <BottomAppBar />
          </SnackbarProvider>,
        </ThemeRegistry>
      </body>
    </html>
  );
}
