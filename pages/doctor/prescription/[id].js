import { Button } from "@mantine/core";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Page from "../../../components/page";
import useRteContentStore from "../../../store/store";
import db from "../../../utils/db";
import { GET_PREVIOUS_PRESCRIPTION } from "../../../utils/queries/sql-query";

const RichTextEditor = dynamic(() => import("@mantine/rte"), {
  ssr: false,
  loading: () => null,
});

const Prescription = ({prescription}) => {
  const [value, onChange] = useState(prescription);
  const [text, setText] = useState(prescription);
  const router = useRouter();
  const prescribedId = router.query;
  console.log({ prescription });
  const handlerRte = async (value) => {
    console.log({ value });
    setText(value);
    const insert_text_to_db = async() =>{
        const response = await axios.post("/api/prescription", {
            prescribeId: prescribedId.id,
            text: value,
          });
    }
    await insert_text_to_db();
    
  };    
  return (
    <Page>
      <div>
        <Button>GO BACK TO DASHBOARD</Button>
      </div>
      <RichTextEditor value={value} onChange={onChange} />
      <Button value={value} onClick={(e) => handlerRte(value)}>
        {" "}
        Submit
      </Button>

      <div dangerouslySetInnerHTML={{ __html: text }} />
    </Page>
  );
};

export default Prescription;

export async function getServerSideProps(ctx){
    console.log({ctx});
    const prescribedId = ctx.query.id;
    const res = await db.query(GET_PREVIOUS_PRESCRIPTION, [prescribedId]);
    console.log({res});
    return{
        props:{
            prescription: res[0].prescription,
        }
    }
}