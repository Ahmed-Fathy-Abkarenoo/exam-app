import Image from "next/image";
import Logo from "../app/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { GraduationCap, UserRound } from "lucide-react";
import Link from "next/link";
import { NavUser } from "../nav-user/nav-user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export default async function AppSidebar() {
  // Session
  const session = await getServerSession(authOptions);

  return (
    <Sidebar collapsible="none" className="h-screen p-10 bg-blue-50">
      <SidebarHeader className="mb-14">
        <Image src="/assets/images/Final-Logo1.svg" alt="elevate" width={192} height={37} />
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive>
                <Link
                  href={"/diplomas"}
                  className="flex items-center gap-1 focus:bg-blue-100 focus:border focus:border-blue-600">
                  <GraduationCap /> <span>Diplomas</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive>
                <Link
                  href={"/account"}
                  className="flex items-center gap-1 focus:bg-blue-100 focus:border focus:border-blue-600 ">
                  <UserRound /> <span>Account Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>{session && <NavUser userInfo={session?.user} />}</SidebarFooter>
    </Sidebar>
  );
}
