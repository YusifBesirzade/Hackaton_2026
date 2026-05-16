"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAnnouncement } from "@/services/TeacherServices/AnnouncementService";
import {
  ArrowLeft,
  Loader2,
  Megaphone,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

const categories = [
  "Academic",
  "Events",
  "Urgent",
  "General",
  "Exam",
  "Project",
];

export default function CreateAnnouncementPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Title and content are required");
      setLoading(false);
      return;
    }

    try {
      const res = await createAnnouncement({
        title: formData.title.trim(),
        content: formData.content.trim(),
        category: formData.category || "General",
      });

      if (res.succeeded) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/teacher/announcements");
        }, 1500);
      } else {
        setError(res.message || "Failed to create announcement");
      }
    } catch {
      setError("Could not connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Back button */}
      <Link
        href="/teacher/announcements"
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft className="size-4" />
        Back to Announcements
      </Link>

      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-400 text-white shadow-lg">
            <Megaphone className="size-5" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-950">
              Create New Announcement
            </h2>
            <p className="text-sm text-slate-500">
              The announcement will be reviewed by an admin.
            </p>
          </div>
        </div>
      </div>

      {/* Success */}
      {success && (
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
          <CheckCircle2 className="size-5 shrink-0" />
          Announcement created successfully! Redirecting...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertTriangle className="size-5 shrink-0" />
          {error}
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-[24px] border border-slate-100 bg-white p-6 shadow-sm"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter announcement title..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">
            Content <span className="text-red-500">*</span>
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={6}
            placeholder="Write the announcement content..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100 resize-none"
          />
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={loading || success}
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-amber-600 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Megaphone className="size-4" />
                Create Announcement
              </>
            )}
          </button>
          <Link
            href="/teacher/announcements"
            className="rounded-2xl border border-slate-200 px-6 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
