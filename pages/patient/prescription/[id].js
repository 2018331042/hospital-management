import { Textarea, Title } from "@mantine/core";
import React, { useState } from "react";
import Page from "../../../components/page";
import db from "../../../utils/db";
import { GET_PREVIOUS_PRESCRIPTION } from "../../../utils/queries/sql-query";

export default function id({ prescription }) {
  const [text, setText] = useState(prescription);
  //TODO --- DIV SECTION FOR PRESCRIPTION
  return (
    <Page>
        <Title>PRESCRIPTION</Title>
        <div dangerouslySetInnerHTML={{ __html: text }} />
    </Page>
  );
}

export async function getServerSideProps(ctx) {
  const prescribedId = ctx.query.id;
  console.log({ prescribedId });

  const res = await db.query(GET_PREVIOUS_PRESCRIPTION, [prescribedId]);
  console.log({ res });

  return {
    props: {
      prescription: res[0].prescription,
    },
  };
}
