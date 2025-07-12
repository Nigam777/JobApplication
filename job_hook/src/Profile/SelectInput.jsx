import { TextInput, Combobox, useCombobox, ScrollArea } from "@mantine/core";

function SelectInput({ label, placeholder, options, name, form }) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const value = form.values[name];

  const handleChange = (val) => {
    form.setFieldValue(name, val); 
    combobox.closeDropdown();
  };

  return (
    <Combobox store={combobox} onOptionSubmit={handleChange}>
      <Combobox.Target>
        <TextInput
          withAsterisk
          label={label}
          placeholder={placeholder}
          value={value || ""}
          readOnly 
          onClick={() => combobox.toggleDropdown()}
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          <ScrollArea.Autosize mah={200} type="scroll">
            {options.map((item) => (
              <Combobox.Option value={item} key={item}>
                {item}
              </Combobox.Option>
            ))}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export default SelectInput;
