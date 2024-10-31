import { Button } from "@/components/ui/button";
import { Archive, Flag, Github } from "lucide-react";
import React from "react";

function SideNavBottomSection() {
  const menuList = [
    {
      id: 1,
      name: "Getting Started",
      path: "",
      icon: Flag,
    },
    {
      id: 2,
      name: "Github",
      path: "",
      icon: Github,
    },
    {
      id: 3,
      name: "Archive",
      path: "",
      icon: Archive,
    },
  ];
  return (
    <div>
      {menuList.map((menu, index) => (
        <h2 className="flex gap-2 p-1 px-2 text-[14px] hover:bg-gray-100 rounded-md cursor-pointer">
          <menu.icon className="w-5 h-5" />
          {menu.name}
        </h2>
      ))}
      {/* Add New File Button */}
      <Button className="w-full bg-emerald-400 hover:bg-emerald-500 text-white justify-start mt-3">
        New File
      </Button>

      {/* Progress Bar */}
      <div className="h-4 w-full bg-gray-200 rounded-full mt-5">
        <div className="h-4 w-[40%] bg-emerald-400 rounded-full">
        </div>
      </div>

      <h2 className="text-[12px] mt-3">
        <strong>2</strong> Out of <strong>5</strong> files used
      </h2>
      <h2 className="text-[12px] mt-1">Upgrade your plans for unlimited access</h2>
    </div>
  );
}

export default SideNavBottomSection;
