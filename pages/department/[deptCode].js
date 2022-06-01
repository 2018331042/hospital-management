
import {useRouter} from 'next/router';


const doctorList = [
    {
        DoctorName: "Arif",
        DoctorSpeciality: "Cardiologist",
        DoctorImage: "https://www.docplanner.com/images/warsaw.png",
    }
]

export default function DoctorList(){
    const router = useRouter();
    console.log({router})
    return(
        <div>
            <h1>Doctor List for department no {router.query.deptCode}</h1>
        </div>
    )
}