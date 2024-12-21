import ThemeRegistry from '@/components/theme-registry/theme.registry';
import '@/style/global.scss'



export const metadata = {
  title: 'Next.js MUI',
  description: 'signin with next-auth'
}


export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
