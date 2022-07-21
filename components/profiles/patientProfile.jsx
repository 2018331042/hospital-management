import {
  Card,
  Image,
  Group,
  useMantineTheme,
  Avatar,
  Title,
  Grid,
} from '@mantine/core';
import Page from '../../components/page';

function PatientProfile(profileInfo) {
  const theme = useMantineTheme();
  console.log({ profileInfo });
  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <div style={{ marginTop: '5vh' }}>
      <Card shadow="sm" p="lg">
        <Grid>
          <Grid.Col
            span={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
              padding: '100px',
            }}
          >
            <Group style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
              <Avatar src="/images/user.png" alt="it's me" />
              <Title order={6}>name</Title>
            </Group>
            <Group style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
              <Avatar src="/images/age.png" alt="it's me" />
              <Title order={6}>Norway Fjord Adventures</Title>
            </Group>
            <Group style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
              <Avatar src="/images/gender.png" alt="it's me" />
              <Title order={6}>Norway Fjord Adventures</Title>
            </Group>
            <Group style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
              <Avatar src="/images/email.png" alt="it's me" />
              <Title order={6}>Norway Fjord Adventures</Title>
            </Group>
          </Grid.Col>
          <Grid.Col
            span={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              width={200}
              height={200}
              src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
              fit="contain"
              radius={100}
              alt="With default placeholder"
              withPlaceholder
            />
          </Grid.Col>
        </Grid>
      </Card>
    </div>
  );
}

export default PatientProfile;
