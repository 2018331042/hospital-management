import { NotificationsProvider } from "@mantine/notifications";
import { Sidebar } from "../components/sidebar";
import "../styles/globals.css";
import { AuthProvider } from "../utils/contexts/auth";
import { SidebarProvider } from "../utils/contexts/sidebarContext";
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
