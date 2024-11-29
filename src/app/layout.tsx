import PrimarySearchAppBar from '@/components/layout/appbar';
import ThemeRegistry from '@/components/theme-registry/theme.registry';



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <PrimarySearchAppBar />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
