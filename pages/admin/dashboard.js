import React from 'react';
import Page from '../../components/page';
import {
  Grid,
  Card,
  ScrollArea,
  Container,
  Table,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';

export default function Dashboard() {
  return (
    <Page>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'DarkCyan',
          marginBottom: 10,
        }}
      >
        <h1>Admin Dashboard</h1>
      </div>
      <div
        style={{
          backgroundColor: 'MediumAquamarine',
          padding: 5,
        }}
      >
        <Grid>
          <Grid.Col span={8}>
            <Card shadow="lg" p="lg" radius="md" withBorder>
              <ScrollArea style={{ height: 500 }}>
                <Container sx={{ margin: 'rem' }}>
                  <h3> Booking Cancellation</h3>
                  <Table>
                    <thead>
                      <tr>
                        <th>Patient Name</th>
                        <th>Doctor Name</th>
                        <th>Time</th>
                        <th>Reason</th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </Table>
                </Container>
              </ScrollArea>
            </Card>
          </Grid.Col>
          <Grid.Col span={4}>
            <Card
              shadow="lg"
              p="lg"
              radius="md"
              withBorder
              sx={{ alignContent: 'right' }}
            >
              <ScrollArea style={{ height: 500 }}>
                <Container sx={{ margin: 'rem' }}>
                  <h3>Doctor Review</h3>
                  <Table>
                    <thead>
                      <tr>
                        <th>Patient Name</th>
                        <th>Doctor Name</th>
                        <th>Review</th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </Table>
                </Container>
              </ScrollArea>
            </Card>
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col span={12}>
            <Card shadow="lg" p="lg" radius="md" withBorder>
              <ScrollArea style={{ height: 500 }}>
                <Container sx={{ margin: 'rem' }}>
                  <h3> Money Withdrawal Request</h3>
                  <Table>
                    <thead>
                      <tr>
                        <th>Doctor Id</th>
                        <th>Doctor Name</th>
                        <th>Amount</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </Table>
                </Container>
              </ScrollArea>
            </Card>
          </Grid.Col>
        </Grid>
      </div>
    </Page>
  );
}
