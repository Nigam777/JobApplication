import { useEffect, useState } from "react";
import {
  Checkbox,
  Combobox,
  Group,
  Pill,
  PillsInput,
  useCombobox,
} from "@mantine/core";
import "../index.css";

export function TalentMultiInput({ options = [], title, icon }) {
  const [selectedValues, setSelectedValues] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (options.length > 0) {
      setSelectedValues([]);
    }
  }, [options]);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const handleValueToggle = (val) => {
    if (!val) return;
    setSelectedValues((current) =>
      current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val]
    );
  };

  const handleValueRemove = (val) => {
    setSelectedValues((current) => current.filter((v) => v !== val));
  };

  return (
    <Combobox store={combobox} withinPortal={false}>
      <Combobox.DropdownTarget>
        <PillsInput
          variant="unstyled"
          onClick={() => combobox.toggleDropdown()}
          leftSection={
            <div className="text-bright-sun-300 p-[3px] bg-mine-shaft-900 rounded-full">
              {icon}
            </div>
          }
          rightSection={
            <Combobox.Chevron
              size="lg"
              className="cursor-pointer"
              onClick={() => combobox.toggleDropdown()}
            />
          }
        >
          <Pill.Group>
            {selectedValues.length === 0 ? (
              <span className="text-gray-500">{title}</span>
            ) : (
              selectedValues.slice(0, 1).map((value) => (
                <Pill
                  key={value}
                  withRemoveButton
                  onRemove={() => handleValueRemove(value)}
                >
                  {value}
                </Pill>
              ))
            )}

            {selectedValues.length > 1 && (
              <Pill
                onClick={() => {
                  combobox.openDropdown();
                  setTimeout(() => document.querySelector("input")?.focus(), 0);
                }}
                style={{ cursor: "pointer" }}
              >
                +{selectedValues.length - 1} more
              </Pill>
            )}
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Search
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          placeholder="Pick a technology"
        />
        <Combobox.Options 
  className="max-h-[200px] overflow-y-auto overflow-clip scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800 scrollbar-thumb-rounded-lg"
>

          {options
            .filter((item) =>
              item.toLowerCase().includes(search.toLowerCase().trim())
            )
            .map((tech) => (
              <Combobox.Option
                key={tech}
                value={tech}
                onClick={() => handleValueToggle(tech)}
              >
                <Group gap="sm">
                  <Checkbox
                    size="xs"
                    checked={selectedValues.includes(tech)}
                    onChange={() => handleValueToggle(tech)}
                    cursor="pointer"
                    color="#FDD835"
                    style={{ accentColor: "#FDD835", cursor: "pointer" }}
                  />
                  <span>{tech}</span>
                </Group>
              </Combobox.Option>
            ))}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export default TalentMultiInput;
