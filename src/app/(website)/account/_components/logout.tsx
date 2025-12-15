"use client";

import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <Button onClick={() => signOut()} className="bg-red-50 text-red-600 hover:bg-red-100">
      <LogOutIcon /> Logout
    </Button>
  );
}
