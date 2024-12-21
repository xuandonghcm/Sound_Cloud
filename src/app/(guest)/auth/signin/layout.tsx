
import HeaderAppBar from '@/components/layout/header';
import BottomAppBar from '@/components/layout/footer';
import ThemeRegistry from '@/components/theme-registry/theme.registry';
import { AlertDialogProvider } from '@/context/AlertDialogContext';
import '@/style/global.scss'
import Container from '@mui/material/Container/Container';




export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>

  );
}
