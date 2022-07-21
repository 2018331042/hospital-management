import { NotificationsProvider } from '@mantine/notifications';
import { Sidebar } from '../components/sidebar';
import '../styles/globals.css';
import { AuthProvider } from '../utils/contexts/auth';
import { SidebarProvider } from '../utils/contexts/sidebarContext';
import '../styles/patient.profile.css';
function MyApp({ Component, pageProps }) {
  return (
    <NotificationsProvider>
      <SidebarProvider>
        <AuthProvider>
          <Sidebar>
            <Component {...pageProps} />
          </Sidebar>
        </AuthProvider>
      </SidebarProvider>
    </NotificationsProvider>
  );
}

export default MyApp;
