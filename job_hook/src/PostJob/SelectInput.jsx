import { useState } from 'react';
import { Input, InputBase, Combobox, useCombobox, ScrollArea } from '@mantine/core';

function SelectInput({ label, placeholder, options, onChange,error }) {
  const combobox = useCombobox({ onDropdownClose: () => combobox.resetSelectedOption() });
  const [value, setValue] = useState("");

  const handleSelect = (val) => {
    setValue(val);
    onChange?.(val); // Notify parent
    combobox.closeDropdown();
  };

  return (
    <Combobox store={combobox} onOptionSubmit={handleSelect}>
      <Combobox.Target>
        <InputBase
          withAsterisk
          label={label}
          component="button"
          type="button"
          pointer
          error={error}
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onFocus={() => combobox.toggleDropdown()}
        >
          {value || <Input.Placeholder>{placeholder}</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Options>
          <ScrollArea.Autosize mah={200} type="scroll">
            {options.map((item) => (
              <Combobox.Option key={item} value={item}>
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