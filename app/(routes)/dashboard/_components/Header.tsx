import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Search, Send } from "lucide-react";
import Image from "next/image";
import React from "react";

function Header() {
  const { user }: any = useKindeBrowserClient();
  return (
    <div className="flex justify-end w-full gap-2 items-center">
      <div className="flex items-center gap-2 border rounded-md p-1">
        <Search className="h-4 w-4" />
        <input
          type="text"
          placeholder="Search"
          className="border-none outline-none"
        />
      </div>
      <div>
        <Image
          src={user?.picture}
          alt="user"
          width={32}
          height={32}
          className="rounded-full"
        />
      </div>
      <Button className="gap-2 flex text-sm h-8 hover:bg-emerald-600 bg-emerald-400">
        <Send className="h-4 w-4"/>
        Invite
      </Button>
    </div>
  );
}

export default Header;
