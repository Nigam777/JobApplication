import { useState } from "react";
import { Combobox, useCombobox } from "@mantine/core";
import { IconAdjustments } from "@tabler/icons-react";

const optionsList = [
  "Relevance",
  "Most recent",
  "Lowest salary",
  "Highest salary",
  "Most popular",
  "Salary (High to Low)",
];

const SortTalents = () => {
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState("Relevance"); // Default text
  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      setSearch("");
    },
    onDropdownOpen: () => {
      combobox.focusSearchInput();
    },
  });

  const filteredOptions = optionsList
    .filter((item) => item.toLowerCase().includes(search.toLowerCase().trim()))
    .map((item) => (
      <Combobox.Option   value={item} key={item}>
        {item}
      </Combobox.Option>
    ));

  return (
    <Combobox
      store={combobox}
      width={250}
      position="bottom-start"
      withArrow
      onOptionSubmit={(val) => {
        setSelectedItem(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target withAriaAttributes={false}>
        <div
          className="border px-3 py-2 flex items-center justify-between w-60 cursor-pointer rounded-md  border-bright-sun-300 text-white"
          onClick={combobox.toggleDropdown}
        >
          {selectedItem}
          <IconAdjustments size={24} className="text-bright-sun-300"/>
        </div>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{filteredOptions}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default SortTalents;
