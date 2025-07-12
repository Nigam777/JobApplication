import  { useState } from "react";
import { IconPlus, IconDeviceFloppy, IconPencil } from "@tabler/icons-react";
import { ActionIcon } from "@mantine/core";
import { useSelector } from "react-redux";
import ExpCard from "./ExpCard";
import ExpInput from "./ExpInput";

const Experience = () => {
  const profile = useSelector((state) => state.profile);
  const [editMode, setEditMode] = useState(false);
  const [addExp, setAddExp] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  return (
    <div className="px-6">
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-semibold">Experience</div>
        <div className="flex gap-2">
          <ActionIcon
            onClick={() => setAddExp(true)}
            color="brightSun.4"
            variant="subtle"
          >
            <IconPlus className="h-5 w-5" />
          </ActionIcon>
          <ActionIcon
            onClick={() => setEditMode(!editMode)}
            color="brightSun.4"
            variant="subtle"
          >
            {editMode ? (
              <IconDeviceFloppy className="w-5 h-5" />
            ) : (
              <IconPencil className="w-5 h-5" />
            )}
          </ActionIcon>
        </div>
      </div>

      {/* Existing experiences */}
      {(profile.experiences || []).map((exp, index) =>
        editingIndex === index ? (
          <ExpInput
            key={index}
            setEdit={() => setEditingIndex(null)}
            expData={exp}
          />
        ) : (
          <ExpCard
            key={index}
            {...exp}
            edit={editMode}
            onEdit={() => setEditingIndex(index)}
          />
        )
      )}

      {/* Add new experience */}
      {addExp && <ExpInput setEdit={setAddExp} />}
    </div>
  );
};

export default Experience;
