"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { CheckCircle2, Download, FileText } from "lucide-react";

interface LessonFile {
  id: string;
  name: string;
  url: string;
}

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Quiz {
  id: string;
  question: string;
  options: QuizOption[];
}

interface LessonData {
  id: string;
  title: string;
  type: string;
  content: string | null;
  videoUrl: string | null;
  files: LessonFile[];
  quizzes: Quiz[];
}

export function LessonContent({
  lesson,
  courseId,
  isCompleted: initialCompleted,
}: {
  lesson: LessonData;
  courseId: string;
  isCompleted: boolean;
}) {
  const [completed, setCompleted] = useState(initialCompleted);
  const [marking, setMarking] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [quizResults, setQuizResults] = useState<Record<string, boolean>>({});

  async function markComplete() {
    setMarking(true);
    const res = await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lessonId: lesson.id, courseId, completed: !completed }),
    });
    if (res.ok) setCompleted(!completed);
    setMarking(false);
  }

  function checkQuiz(quizId: string, optionId: string) {
    setSelectedAnswers((prev) => ({ ...prev, [quizId]: optionId }));
    const quiz = lesson.quizzes.find((q) => q.id === quizId);
    const option = quiz?.options.find((o) => o.id === optionId);
    setQuizResults((prev) => ({
      ...prev,
      [quizId]: option?.isCorrect ?? false,
    }));
  }

  return (
    <div className="space-y-6">
      {lesson.videoUrl && (
        <div className="aspect-video rounded-xl overflow-hidden bg-black">
          <iframe
            src={lesson.videoUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {lesson.content && (
        <div
          className="prose prose-invert max-w-none text-gray-300"
          dangerouslySetInnerHTML={{ __html: lesson.content }}
        />
      )}

      {lesson.quizzes.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-white">Quiz</h3>
          {lesson.quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="rounded-xl border border-white/10 bg-white/5 p-6"
            >
              <p className="text-white font-medium mb-4">{quiz.question}</p>
              <div className="space-y-2">
                {quiz.options.map((option) => {
                  const isSelected = selectedAnswers[quiz.id] === option.id;
                  const hasResult = quiz.id in quizResults;
                  const isCorrectAnswer = option.isCorrect && hasResult;

                  return (
                    <button
                      key={option.id}
                      onClick={() => checkQuiz(quiz.id, option.id)}
                      disabled={hasResult}
                      className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                        isSelected && quizResults[quiz.id]
                          ? "border-green-500/50 bg-green-500/10 text-green-300"
                          : isSelected && !quizResults[quiz.id]
                          ? "border-red-500/50 bg-red-500/10 text-red-300"
                          : isCorrectAnswer
                          ? "border-green-500/50 bg-green-500/10 text-green-300"
                          : "border-white/10 hover:border-purple-500/30 text-gray-300"
                      } ${hasResult ? "cursor-default" : "cursor-pointer"}`}
                    >
                      {option.text}
                    </button>
                  );
                })}
              </div>
              {quiz.id in quizResults && (
                <p
                  className={`mt-3 text-sm ${
                    quizResults[quiz.id] ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {quizResults[quiz.id] ? "Korrekt!" : "Forkert. Prøv igen."}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {lesson.files.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Downloads</h3>
          {lesson.files.map((file) => (
            <a
              key={file.id}
              href={file.url}
              download
              className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4 hover:border-purple-500/30 transition-colors"
            >
              <FileText className="h-5 w-5 text-purple-400" />
              <span className="text-sm text-white flex-1">{file.name}</span>
              <Download className="h-4 w-4 text-gray-500" />
            </a>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <Button
          onClick={markComplete}
          disabled={marking}
          variant={completed ? "secondary" : "default"}
        >
          <CheckCircle2 className="mr-2 h-4 w-4" />
          {completed ? "Marker som ikke gennemført" : "Marker som gennemført"}
        </Button>
        {completed && <Badge variant="success">Gennemført</Badge>}
      </div>
    </div>
  );
}
