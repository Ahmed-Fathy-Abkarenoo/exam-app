"use client";

import { getQuestionsByExam } from "@/lib/api/get-questions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import AnswerList from "./answer-list";

export default function QuestionDetails() {
  // Hooks
  const { id } = useParams<{ id: string }>();

  // Queries
  const { isLoading, error, data } = useQuery({
    queryKey: ["questions"],
    queryFn: () => {
      return getQuestionsByExam(id);
    },
    staleTime: 10 * 1000,
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="space-y-5">
        <p>Loading...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="space-y-5">
        <p>Error loading question details.</p>
      </div>
    );
  }
  if (!data || !("questions" in data) || !data.questions.length) {
    return (
      <div className="space-y-5">
        <p>No questions found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <h3 className="pt-6">{data.questions[0].question}</h3>
      <ul className="space-y-3">
        {data?.questions[0].answers.map((answer, i) => (
          <AnswerList key={i} answerList={answer} />
        ))}
      </ul>
    </div>
  );
}
