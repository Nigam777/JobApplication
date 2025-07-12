import React from "react";
import { IconBell, IconFishHook, IconSettings } from "@tabler/icons-react";

import { Avatar, Button, Indicator } from "@mantine/core";
import NavLinks from "./NavLinks";
import { Link, useLocation } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useSelector } from "react-redux";

const Header = () => {
  const user=useSelector((state) => state.user);

  const location = useLocation();
return (
    location.pathname !== "/signup" &&
    location.pathname !== "/login" && (
      <div className="w-full bg-mine-shaft-950 h-28 text-white flex justify-between items-center px-6">
        {/* Logo Section */}
        <Link to={`/*`}>
          <div className="flex items-center text-bright-sun-400 hover:scale-105 transition-transform duration-300">
            <IconFishHook
              className="w-12 h-12 -mr-3 drop-shadow-lg"
              stroke={3}
            />
            <div className="text-4xl font-extrabold tracking-tight drop-shadow-md">
              obHunt
            </div>
          </div>
        </Link>

        {/* Link Section */}
        <NavLinks />

        {/* Profiles Section */}
        <div className="flex gap-5 items-center">
         <div className="flex items-center gap-2">
            {user ?<ProfileMenu />:
            <Link to="/login">
             <Button variant="subtle" color="brightSun.4" size="md" className="bg-bright-sun-400 hover:bg-bright-sun-500 text-white font-semibold rounded-md px-4 py-2 transition duration-300 ease-in-out">
                Login
              </Button>
             
            </Link>}  
            
          </div>
          <Indicator processing color="red" offset={7} size={9}>
            <div className="bg-mine-shaft-900 p-1.5 rounded-full">
              <IconBell stroke={1.5} />
            </div>
          </Indicator>
        </div>
      </div>
    )
  )
};

export default Header;
