import { Sidebar } from '../components/sidebar';
import '../styles/globals.css';
import { AuthProvider } from '../utils/contexts/auth';
import { SidebarProvider } from '../utils/contexts/sidebarContext';
function MyApp({ Component, pageProps }) {
  return (
    <SidebarProvider>
      <AuthProvider>
        <Sidebar>
          <Component {...pageProps} />
        </Sidebar>
      </AuthProvider>
    </SidebarProvider>
  );
}

export default MyApp;
