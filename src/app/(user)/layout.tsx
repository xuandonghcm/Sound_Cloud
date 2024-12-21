
import HeaderAppBar from '@/components/layout/header';
import BottomAppBar from '@/components/layout/footer';

import '@/style/global.scss'
import Container from '@mui/material/Container/Container';




export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderAppBar />
      <Container sx={{ marginTop: "20px", paddingBottom: "180px" }}>{children}</Container>
      <BottomAppBar />
    </>
  );
}
