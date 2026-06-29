"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Save,
  Plus,
  Trash2,
  GripVertical,
  Eye,
  EyeOff,
  BookOpen,
} from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  type: string;
  published: boolean;
  order: number;
}

interface Module {
  id: string;
  title: string;
  description: string | null;
  published: boolean;
  order: number;
  lessons: Lesson[];
}

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  published: boolean;
  modules: Module[];
}

export default function AdminCourseEditPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [saving, setSaving] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [newLessonTitles, setNewLessonTitles] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    fetch(`/api/admin/courses/${courseId}`)
      .then((r) => r.json())
      .then(setCourse);
  }, [courseId]);

  async function saveCourse() {
    if (!course) return;
    setSaving(true);
    await fetch(`/api/admin/courses/${courseId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: course.title,
        description: course.description,
        price: course.price,
        published: course.published,
      }),
    });
    setSaving(false);
  }

  async function addModule() {
    if (!newModuleTitle.trim()) return;
    const res = await fetch(`/api/admin/courses/${courseId}/modules`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newModuleTitle }),
    });
    if (res.ok) {
      const mod = await res.json();
      setCourse((prev) =>
        prev
          ? { ...prev, modules: [...prev.modules, { ...mod, lessons: [] }] }
          : prev
      );
      setNewModuleTitle("");
    }
  }

  async function addLesson(moduleId: string) {
    const title = newLessonTitles[moduleId]?.trim();
    if (!title) return;
    const res = await fetch(`/api/admin/modules/${moduleId}/lessons`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    if (res.ok) {
      const lesson = await res.json();
      setCourse((prev) =>
        prev
          ? {
              ...prev,
              modules: prev.modules.map((m) =>
                m.id === moduleId
                  ? { ...m, lessons: [...m.lessons, lesson] }
                  : m
              ),
            }
          : prev
      );
      setNewLessonTitles((prev) => ({ ...prev, [moduleId]: "" }));
    }
  }

  async function deleteCourse() {
    if (!confirm("Er du sikker på at du vil slette dette kursus?")) return;
    await fetch(`/api/admin/courses/${courseId}`, { method: "DELETE" });
    router.push("/admin/courses");
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Rediger kursus</h1>
        <div className="flex gap-2">
          <Button variant="destructive" size="sm" onClick={deleteCourse}>
            <Trash2 className="mr-2 h-4 w-4" />
            Slet
          </Button>
          <Button onClick={saveCourse} disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            {saving ? "Gemmer..." : "Gem"}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Kursus detaljer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Titel</label>
              <Input
                value={course.title}
                onChange={(e) =>
                  setCourse({ ...course, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Pris (DKK)</label>
              <Input
                type="number"
                value={course.price}
                onChange={(e) =>
                  setCourse({ ...course, price: parseInt(e.target.value) || 0 })
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Beskrivelse</label>
            <textarea
              value={course.description ?? ""}
              onChange={(e) =>
                setCourse({ ...course, description: e.target.value })
              }
              className="flex w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white min-h-[80px]"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant={course.published ? "default" : "secondary"}
              size="sm"
              onClick={() =>
                setCourse({ ...course, published: !course.published })
              }
            >
              {course.published ? (
                <>
                  <Eye className="mr-2 h-4 w-4" /> Publiceret
                </>
              ) : (
                <>
                  <EyeOff className="mr-2 h-4 w-4" /> Kladde
                </>
              )}
            </Button>
            <span className="text-xs text-gray-500">Slug: {course.slug}</span>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Moduler</h2>
        </div>

        {course.modules.map((mod, modIndex) => (
          <Card key={mod.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono text-purple-400">
                  {String(modIndex + 1).padStart(2, "0")}
                </span>
                <CardTitle className="text-base">{mod.title}</CardTitle>
                <Badge variant={mod.published ? "success" : "outline"} className="ml-auto">
                  {mod.published ? "Publiceret" : "Kladde"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {mod.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/5 px-4 py-3"
                >
                  <GripVertical className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-white flex-1">
                    {lesson.title}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {lesson.type}
                  </Badge>
                </div>
              ))}

              <div className="flex gap-2">
                <Input
                  value={newLessonTitles[mod.id] ?? ""}
                  onChange={(e) =>
                    setNewLessonTitles((prev) => ({
                      ...prev,
                      [mod.id]: e.target.value,
                    }))
                  }
                  placeholder="Ny lektion titel"
                  onKeyDown={(e) =>
                    e.key === "Enter" && addLesson(mod.id)
                  }
                />
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => addLesson(mod.id)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        <Card className="border-dashed">
          <CardContent className="p-4">
            <div className="flex gap-2">
              <Input
                value={newModuleTitle}
                onChange={(e) => setNewModuleTitle(e.target.value)}
                placeholder="Nyt modul titel"
                onKeyDown={(e) => e.key === "Enter" && addModule()}
              />
              <Button onClick={addModule}>
                <Plus className="mr-2 h-4 w-4" />
                Tilføj modul
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
