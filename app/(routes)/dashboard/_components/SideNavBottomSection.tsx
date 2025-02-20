import { Button } from "@/components/ui/button";
import { Archive, Flag, Github } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

function SideNavBottomSection({onFileCreate, totalFiles}:any) {
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
  const [fileInput, setFileInput] = useState('');
  return (
    <div>
      {menuList.map((menu, index) => (
        <h2 key={index} className="flex gap-2 p-1 px-2 text-[14px] hover:bg-gray-100 rounded-md cursor-pointer">
          <menu.icon className="w-5 h-5" />
          {menu.name}
        </h2>
      ))}
      {/* Add New File Button */}
      <Dialog>
        <DialogTrigger className="w-full" asChild>
          <Button className="w-full bg-emerald-400 hover:bg-emerald-500 text-white justify-start mt-3">
            New File
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New File</DialogTitle>
            <DialogDescription>
              <Input placeholder="File Name" 
              className="mt-3"
              onChange={(e) => setFileInput(e.target.value)} />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="">
            <DialogClose asChild>
              <Button type="button" className="bg-emerald-400 hover:bg-emerald-500 text-white"
              disabled={fileInput.length === 0}
              onClick={() => onFileCreate(fileInput)}
              >
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Progress Bar */}
      <div className="h-4 w-full bg-gray-200 rounded-full mt-5">
        <div className={`h-4 bg-emerald-400 rounded-full`} 
        style={{width: `${(totalFiles/5)*100}%`}}>

        </div>
      </div>

      <h2 className="text-[12px] mt-3">
        <strong>{totalFiles}</strong> Out of <strong>5</strong> files used
      </h2>
      <h2 className="text-[12px] mt-1">
        Upgrade your plans for unlimited access
      </h2>
    </div>
  );
}

export default SideNavBottomSection;
