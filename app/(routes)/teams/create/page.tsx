"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function CreateTeam() {
  const [teamName, setTeamName] = useState("");
  const createTeam = useMutation(api.teams.createTeam);
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();

  const createNewTeam = () => {
    createTeam({
      teamName: teamName,
      createdBy: user?.email,
    }).then((resp) => {
      console.log(resp);
      if (resp) {
        router.push("/dashboard");
        toast("Team Created Successfully!");
      }
    });
  };

  return (
    <div className="px-6 md:px-16 my-16">
      <Image src="/logo-black.png" alt="Logo" width={200} height={200} />
      <div className="flex flex-col items-center my-8">
        <h1 className="font-bold text-[40px] py-3">
          What should we call your team?
        </h1>
        <h2 className="text-grey-500">
          You can alwayschange this later from the settings.
        </h2>
        <div className="mt-7 w-[40%]">
          <label className="text-grey-500">Team Name</label>
          <Input
            placeholder="Team Name"
            className="mt-3"
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>
        <Button
          className="bg-emerald-500 mt-9 w-[40%] hover:bg-emerald-600"
          disabled={!(teamName && teamName?.length > 0)}
          onClick={() => createNewTeam()}
        >
          Create Team
        </Button>
      </div>
    </div>
  );
}

export default CreateTeam;
