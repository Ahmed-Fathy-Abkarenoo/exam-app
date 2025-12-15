import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "../../components/layout/sidebar/sidebar";
import { BreadCrumb } from "@/components/layout/Breadcrumbs/breadcrumbs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="p-4">
            <BreadCrumb />
          </header>

          <main className="h-full p-5 space-y-4 bg-gray-50">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
