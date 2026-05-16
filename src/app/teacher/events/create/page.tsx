"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createEvent } from "@/services/TeacherServices/EventService";
import {
  ArrowLeft,
  Loader2,
  Calendar,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

export default function CreateEventPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.date
    ) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const res = await createEvent({
        title: formData.title.trim(),
        description: formData.description.trim(),
        date: new Date(formData.date).toISOString(),
      });

      if (res.succeeded) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/teacher/events");
        }, 1500);
      } else {
        setError(res.message || "Failed to create event");
      }
    } catch {
      setError("Could not connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Back */}
      <Link
        href="/teacher/events"
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft className="size-4" />
        Back to Events
      </Link>

      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-purple-400 text-white shadow-lg">
            <Calendar className="size-5" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-950">
              Create New Event
            </h2>
            <p className="text-sm text-slate-500">
              Plan a campus event.
            </p>
          </div>
        </div>
      </div>

      {/* Success */}
      {success && (
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
          <CheckCircle2 className="size-5 shrink-0" />
          Event created successfully! Redirecting...
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
            placeholder="Enter event title..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">
            Date & Time <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={6}
            placeholder="Write detailed information about the event..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100 resize-none"
          />
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={loading || success}
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-violet-600 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Calendar className="size-4" />
                Create Event
              </>
            )}
          </button>
          <Link
            href="/teacher/events"
            className="rounded-2xl border border-slate-200 px-6 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
