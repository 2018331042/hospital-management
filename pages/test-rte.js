// import dynamic from 'next/dynamic';


// const RichText = dynamic(() => import('@mantine/rte'), {
//     // Disable during server side rendering
//     ssr: false,
  
//     // Render anything as fallback on server, e.g. loader or html content without editor
//     loading: () => null,
// });


// const TestRTE = () => {
//     return(
//         <RichText />
//     )
// }

// export default TestRTE;


import { useEffect, useState } from 'react';
import { Calendar } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState(null);
  useEffect(() => {
    console.log({ value });
  },[value]);
  return <Calendar value={value} onChange={setValue} />;
}

export default Demo;