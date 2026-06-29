import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LessonNav {
  id: string;
  title: string;
}

export function LessonNavigation({
  slug,
  prevLesson,
  nextLesson,
}: {
  slug: string;
  prevLesson: LessonNav | null;
  nextLesson: LessonNav | null;
}) {
  return (
    <div className="flex items-center justify-between mt-8">
      {prevLesson ? (
        <Button variant="ghost" asChild>
          <Link href={`/courses/${slug}/lessons/${prevLesson.id}`}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            {prevLesson.title}
          </Link>
        </Button>
      ) : (
        <div />
      )}

      {nextLesson ? (
        <Button variant="ghost" asChild>
          <Link href={`/courses/${slug}/lessons/${nextLesson.id}`}>
            {nextLesson.title}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      ) : (
        <div />
      )}
    </div>
  );
}
