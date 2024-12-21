
import HeaderAppBar from '@/components/layout/header';
import BottomAppBar from '@/components/layout/footer';
import ThemeRegistry from '@/components/theme-registry/theme.registry';
import { AlertDialogProvider } from '@/context/AlertDialogContext';
import '@/style/global.scss'
import Container from '@mui/material/Container/Container';
import NextAuthWrapper from '@/lib/StoreWrapper';



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">

      <body>

        <ThemeRegistry>
          <NextAuthWrapper>
            <AlertDialogProvider>
              {children}
            </AlertDialogProvider>
          </NextAuthWrapper>
        </ThemeRegistry>
      </body>
    </html>
  );
}
