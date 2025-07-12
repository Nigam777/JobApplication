import React from "react";
import { Menu, Button, Text, Avatar } from "@mantine/core";
import { removeUser } from "../Slices/UserSlices";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  IconUserCircle,
  IconMessageCircle,
  IconFileText,
  IconLogout2,
} from "@tabler/icons-react";

function ProfileMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(removeUser());
    localStorage.removeItem("user");

  };

  return (
    <Menu shadow="md" width={260}>
      <Menu.Target>
        <div className="flex cursor-pointer items-center gap-2">
          <Avatar
            src={
              user.avatarUrl ||
              "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            }
          />
          <div>{user.name || "User"}</div>
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Link to="/profile_page">
          <Menu.Item leftSection={<IconUserCircle size={14} />}>Profile</Menu.Item>
        </Link>
        <Menu.Item leftSection={<IconMessageCircle size={14} />}>
          Messages
        </Menu.Item>
        <Menu.Item leftSection={<IconFileText size={14} />}>Resume</Menu.Item>

        <Menu.Divider />

        <Menu.Item
          onClick={handleLogout}
          color="red"
          leftSection={<IconLogout2 size={14} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default ProfileMenu;
