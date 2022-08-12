import { Card, Container, Textarea, Title } from '@mantine/core';
import React, { useState } from 'react';
import Page from '../../../components/page';
import db from '../../../utils/db';
import { GET_PREVIOUS_PRESCRIPTION } from '../../../utils/queries/sql-query';

export default function id({ prescription }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [text, setText] = useState(prescription);
  //TODO --- DIV SECTION FOR PRESCRIPTION
  return (
    <Page>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'gray',
          marginBottom: 10,
        }}
      >
        <h2>Prescription</h2>
      </div>
      <Container sx={{ margin: '3rem' }}>
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <div dangerouslySetInnerHTML={{ __html: text }} />
        </Card>
      </Container>
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
