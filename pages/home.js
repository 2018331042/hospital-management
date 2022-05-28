
// const dept = [
//     {
//         id:1,
//         name:'oncology',
//         description:'blah blah'
//     },
//     {
//         id:2,
//         name:'oncology',
//         description:'blah blah'
//     },
//     {
//         id:2,
//         name:'oncology',
//         description:'blah blah'
//     }
// ]


function Home(props){
    const {data} = props;
    return(
        <>
            {
                data.map((data) => (
                    <div key={data.id}>
                        <p>{data.id}</p>
                        <p>{data.title}</p>
                        <p>{data.body}</p>
                    </div>
                ))
            }
        </>
       
    )
}

export async function getServerSideProps(){
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    console.log({data});
    return{
        props:{
            data,
        }
    }
}

export default Home