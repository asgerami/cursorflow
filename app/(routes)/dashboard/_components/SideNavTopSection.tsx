"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown, Icon, LogOut, Settings, User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Separator } from "@/components/ui/separator";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";

export interface TEAM {
  createdBy: String;
  teamName: String;
  _id: String;
}
function SideNavTopSection({ user }: any) {
  const menu = [
    {
      id: 1,
      name: "Create Team",
      path: "/teams/create",
      icon: User,
    },
    {
      id: 2,
      name: "Settings",
      path: "",
      icon: Settings,
    },
  ];
  const convex = useConvex();
  const [activeTeam, setActiveTeam] = useState<TEAM>();
  const [TeamList, setTeamList] = useState<TEAM[]>();

  useEffect(() => {
    user && getTeamList();
  }, [user]);

  const getTeamList = async () => {
    const result = await convex.query(api.teams.getTeam, {
      email: user?.email,
    });
    console.log("TeamList", result);
    setTeamList(result);
    setActiveTeam(result[0]);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <div
          className="flex items-center gap-3
    hover:bg-slate-200 rounded-lg p-2 cursor-pointer
    "
        >
          <Image src="/favicon.png" alt="logo" width={30} height={30} />
          <h2
            className="flex gap-2 items-center
    font-bold text-[17px]
    "
          >
            {activeTeam?.teamName}
            <ChevronDown />
          </h2>
        </div>
      </PopoverTrigger>
      <PopoverContent className="ml-7 p-4 ">
        {/* Team Section */}
        <div>
          {TeamList?.map((team, index) => (
            <h2
              key={index}
              className={`"p-2 hover:bg-blue-500
            hover:text-white rounded-md cursor-pointer"`}
            >
              {team.teamName}
            </h2>
          ))}
        </div>
        <Separator className="mt-2 bg-slate-200" />
        {/*Option Section */}
        <div>
          {menu.map((item, index) => (
            <h2
              key={index}
              className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer text-sm"
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </h2>
          ))}
          <LogoutLink>
            <h2 className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer text-sm">
              <LogOut className="h-4 w-4" />
              Logout
            </h2>
          </LogoutLink>
        </div>
        <Separator className="mt-2 bg-slate-100" />

        {/* User Info Section */}
        {user && (
          <div className="mt-2 flex items-center gap-2">
            <Image
              src={user?.picture}
              alt="user"
              width={30}
              height={30}
              className="rounded-full"
            />
            <div>
              <h2 className="text-[14px] font-bold">
                {user?.given_name} {user?.family_name}
              </h2>
              <h2 className="text-[12px] text-gray-500">{user?.email}</h2>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default SideNavTopSection;
