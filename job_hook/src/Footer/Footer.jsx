import React from "react";
import { IconFishHook } from "@tabler/icons-react";
import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter } from "@tabler/icons-react";

const Footer = () => {
  return (
    <footer className="mt-20 pb-5 bg-mine-shaft-950 text-white px-6 py-8">
      {/* Logo and Description */}
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center text-bright-sun-400 -mr-2 group hover:translate-y-[5px] transition-transform duration-300 w-fit">
          <IconFishHook className="w-12 h-12 -mr-3 drop-shadow-lg" stroke={2.5} />
          <div className="text-3xl font-extrabold tracking-tight drop-shadow-md">
            obHunt
          </div>
        </div>
        <p className="mt-2 text-mine-shaft-100 max-w-md">
          A job portal that connects employers with talented individuals.
        </p>
      </div>

      {/* Footer Links */}
      <div className="mt-6 flex justify-center gap-6 text-mine-shaft-200 text-sm">
        <a href="#" className="hover:text-bright-sun-400 transition-colors">About Us</a>
        <a href="#" className="hover:text-bright-sun-400 transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-bright-sun-400 transition-colors">Contact</a>
      </div>

      {/* Social Icons */}
      <div className="mt-6 flex justify-center gap-4">
        <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-bright-sun-400 transition-transform hover:scale-110">
          <IconBrandGithub className="w-6 h-6" />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-bright-sun-400 transition-transform hover:scale-110">
          <IconBrandLinkedin className="w-6 h-6" />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-bright-sun-400 transition-transform hover:scale-110">
          <IconBrandTwitter className="w-6 h-6" />
        </a>
      </div>

      {/* Copyright */}
      <div className="mt-6 text-xs text-mine-shaft-400 text-center">
        &copy; {new Date().getFullYear()} JobHunt. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
