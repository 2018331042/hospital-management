import { Button } from "@mantine/core";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Page from "../../../components/page";
import useRteContentStore from "../../../store/store"

const RichTextEditor = dynamic(() => import('@mantine/rte'),{
    ssr: false,
    loading: () => null,
})

const Prescription = () => {
    const [value, onChange] = useState('');
    // const text = useRteContentStore((state) => state.text);
    // const setText = useRteContentStore((state) => state.setText);
    const [text, setText] = useState('');

    const handlerRte = (value) => {
        console.log({value});
        setText(value);
    }
    return (
        <Page>
            <RichTextEditor value={value} onChange={onChange} />
            <Button  value={value} onClick={(e) => handlerRte(value)}> Submit</Button>

            <div dangerouslySetInnerHTML={{__html: text}} />
        </Page>
    );
}

export default Prescription;