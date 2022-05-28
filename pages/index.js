import Page from "../components/page";
import { useAuth } from "../utils/contexts/auth";


const departments = [
  {
    deptName: "Cardiology",
    numberOfDoctors: "10",
  },
  {
    deptName: "Dermatology",
    numberOfDoctors: "10",
  },
  {
    deptName: "Gastroenterology",
    numberOfDoctors: "10",
  },
  {
    deptName: "General Surgery",
    numberOfDoctors: "10",
  },
  {
    deptName: "Neurology",
    numberOfDoctors: "10",
  },
  {
    deptName: "Nephrology",
    numberOfDoctors: "10",
  }
]

export default function Home() {
  const { isLoggedIn, isLoading, token, user } = useAuth();
  return (
    <Page>
      
    </Page>
  );
}
