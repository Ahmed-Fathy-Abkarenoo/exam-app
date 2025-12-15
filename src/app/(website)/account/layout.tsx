import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ChevronLeft, UserRound } from "lucide-react";
import AccountSidebar from "./_components/account-sidebar";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="flex items-center gap-2">
        <div className="border border-blue-600 bg-white py-4 px-2">
          <Link href={"/diplomas"}>
            <ChevronLeft className="text-blue-600" />
          </Link>
        </div>
        <div className="flex items-center gap-3 flex-grow p-4 bg-blue-600 text-white border border-blue-600">
          <UserRound />
          <h1>Account Settings</h1>
        </div>
      </header>
      <SidebarProvider className="space-x-5">
        <AccountSidebar />
        <SidebarInset>
          <main className="h-full p-5">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
