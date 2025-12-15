import { LoaderIcon } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-3/4 h-20 flex items-center justify-center shadow-md bg-slate-200">
      <LoaderIcon />
    </div>
  );
}
