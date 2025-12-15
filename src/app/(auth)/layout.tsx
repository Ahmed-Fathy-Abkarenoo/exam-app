import InfoPanelBG from "@/components/layout/auth-info-section/info-panel-bg";
import InfoPanel from "../../components/layout/auth-info-section/info-panel";

type LayoutProps = {
  children: React.ReactNode;
};

export default function layout({ children }: LayoutProps) {
  return (
    <main className="h-screen flex bg-white">
      <section className="w-1/2 h-full flex items-center justify-center relative overflow-hidden bg-opacity-75">
        <InfoPanel />
        <InfoPanelBG />
      </section>

      <section className="w-1/2 h-full flex items-center justify-center">
        <div className="w-3/4 pt-6 px-9">{children}</div>
      </section>
    </main>
  );
}
