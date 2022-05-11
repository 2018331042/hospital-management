import { Sidebar } from "../components/sidebar";
import "../styles/globals.css";
import { AuthProvider } from "../utils/contexts/auth";
import { SidebarProvider } from "../utils/contexts/sidebarContext";
function MyApp({ Component, pageProps }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </Sidebar>
    </SidebarProvider>
  );
}

export default MyApp;
