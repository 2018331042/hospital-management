import Page from "../components/page";
import { useAuth } from "../utils/contexts/auth";

export default function Home() {
  const { isLoggedIn, isLoading, token, user } = useAuth();
  return (
    <Page>
      <div style={{display: "flex", direction:"column", minHeight:"50vh", alignItems:"center"}}>{isLoading ? <div>Loading...</div> : <div>{user.type}</div>}</div>
    </Page>
  );
}
