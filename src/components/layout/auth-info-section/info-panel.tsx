import Logo from "../app/logo";
import InfoPanelContent from "./info-panel-content";

export default function InfoPanel() {
  return (
    <div className="z-10">
      <div className="w-[28.6rem]">
        <Logo />

        <InfoPanelContent />
      </div>
    </div>
  );
}
