import { Button, Card, Center, Group, NumberInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { Select } from "@mantine/core";

export default function AddClassroom() {
  const handleSubmit = async (e) => {
    console.log({ e });
  };
  const validate = (value) => {
    console.log({ value });
    return value === "" ? "Please fillup this field" : null;
  };
  const form = useForm({
    initialValues: {
      code: "",
      title: "",
      credit: null,
      year: "",
      semester: "",
    },

    validate: {
      code: (value) => (value ? "Please fillup this field" : null),
    },
  });
  return (
    <div style={{ height: "100vh" }}>
      <Center style={{ width: "100%", height: "auto" }}>
        <Card
          sx={{
            width: "50%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <form
            onSubmit={form.onSubmit((values) => {
              form.validate();
              form.errors;
              handleSubmit(values);
            })}
            style={{
              width: "50%",
            }}
          >
            <TextInput
              required
              label="Code"
              placeholder="e.x. CSE333"
              {...form.getInputProps("code")}
            />
            <TextInput
              required
              label="Title"
              placeholder="Title of the course"
              {...form.getInputProps("title")}
            />
            <NumberInput
              required
              label="Credits"
              placeholder="The credit of the course"
              {...form.getInputProps("credit")}
            ></NumberInput>
            <Select
              required
              label="Year"
              placeholder="Pick one"
              data={[
                { value: "1", label: "1st" },
                { value: "2", label: "2nd" },
                { value: "3", label: "3rd" },
                { value: "4", label: "4th" },
              ]}
              {...form.getInputProps("year")}
            />
            <Select
              required
              label="Semester"
              placeholder="Pick one"
              data={[
                { value: "1", label: "1st" },
                { value: "2", label: "2nd" },
              ]}
              {...form.getInputProps("semester")}
            />
            <Group position="right" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Card>
      </Center>
    </div>
  );
}
