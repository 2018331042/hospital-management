import { Select } from "@mantine/core";

const depts = [
  { code: 111, name: "cardiac" },
  { code: 112, name: "neuro" }
];

const data = depts.map((dept) => ({value:dept.code.toString(), label:dept.name}));
console.log({data});

function Demo() {
  return (
    <Select
      label="What item is the best?"
      placeholder="Pick one"
      searchable
      nothingFound="No options"
      maxDropdownHeight={280}
      data={depts.map((dept) => ({value:dept.code.toString(), label:dept.name}))}
    />
  );
}

export default Demo;
