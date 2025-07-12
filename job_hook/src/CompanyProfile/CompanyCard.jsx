import { ActionIcon, useMantineTheme } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import React from "react";

const CompanyCard = ({ ...props }) => {
  const theme = useMantineTheme();
  return (
    <div>
      <div
        className="flex justify-between transition-all duration-300 hover:shadow-md hover:scale-105 hover:bg-mine-shaft-800 w-96 p-4  border border-bright-sun-400 rounded-xl mx-7"
        style={{
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.activeClassName.dark,
        }}
      >
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <img className="h-8" src={`../Icons/${props.name}.png`} alt="" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-semibold">{props.name}</div>
          <div className="text-xs text-mine-shaft-300">
            {props.employees} Employees
          </div>
        </div>
        <div className=" flex  ">
          <ActionIcon
            color="brightSun.4"
            variant="subtle"
            className="hover:opacity-80"
          >
            <IconExternalLink />
          </ActionIcon>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;

