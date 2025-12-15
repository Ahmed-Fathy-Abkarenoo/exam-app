import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CircleUserRound, Lock } from "lucide-react";
import Link from "next/link";
import Logout from "./logout";

export default function AccountSidebar() {
  return (
    <Sidebar collapsible="none" className="w-72 gap-[22rem] p-6 bg-white">
      <SidebarContent>
        <SidebarGroup className="p-0" />
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size={"sm"} asChild isActive>
                <Link href={"/account/profile"} className="flex items-center gap-1 focus:bg-blue-100 ">
                  <CircleUserRound /> <span>Profile</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton size={"sm"} asChild isActive>
                <Link href={"/account/change-password"} className="flex items-center gap-1 focus:bg-blue-100">
                  <Lock /> <span>Change Password</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <Logout />
      </SidebarFooter>
    </Sidebar>
  );
}
