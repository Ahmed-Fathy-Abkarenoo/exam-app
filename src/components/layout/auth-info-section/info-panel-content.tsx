import { BookOpenCheck, Brain, RectangleEllipsis } from "lucide-react";

export default function InfoPanelContent() {
  return (
    <div className="flex flex-col gap-14 py-20">
      <p className="font-bold text-3xl text-gray-800">Empower your learning journey with our smart exam platform.</p>
      <ul className="info-list">
        <li className="pr-20">
          <div className="list-icons">
            <Brain strokeWidth={1.5} />
          </div>

          <div className="space-y-2">
            <h3 className="item-head">Tailored Diplomas</h3>
            <p className="item-p">Choose from specialized tracks like Frontend, Backend, and Mobile Development.</p>
          </div>
        </li>
        <li className="pr-20">
          <div className="list-icons">
            <BookOpenCheck strokeWidth={1.5} />
          </div>

          <div className="space-y-2">
            <h3 className="item-head">Focused Exams</h3>
            <p className="item-p">Access topic-specific tests including HTML, CSS, JavaScript, and more.</p>
          </div>
        </li>
        <li className="pr-20">
          <div className="list-icons">
            <RectangleEllipsis strokeWidth={1.5} />
          </div>

          <div className="space-y-2">
            <h3 className="item-head">Smart Multi-Step Forms</h3>
            <p className="item-p">Choose from specialized tracks like Frontend, Backend, and Mobile Development.</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
