"use client";

import { GraduationCap } from "lucide-react";
import DiplomaCard from "./diploma-card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getSubjects } from "@/lib/api/get-subjects";
import Loading from "../../loading";

export default function Diplomas() {
  const { isLoading, error, data } = useSuspenseQuery({
    queryKey: ["subjects"],
    queryFn: () => getSubjects(),
  });

  return (
    <>
      <header className="flex items-center gap-3 p-4 bg-blue-600 text-white">
        <GraduationCap />
        <h1>Diplomas</h1>
      </header>
      <section className="overflow-y-visible">
        {isLoading && !error ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {data?.subjects?.map((card) => (
              <DiplomaCard key={card._id} subject={card} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
