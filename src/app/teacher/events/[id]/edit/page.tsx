"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  getEventById,
  updateEvent,
} from "@/services/TeacherServices/EventService";
import {
  ArrowLeft,
  Loader2,
  Pencil,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await getEventById(id);
        if (res.succeeded && res.data) {
          // Format date for datetime-local input
          const d = new Date(res.data.date);
          const localDate = new Date(
            d.getTime() - d.getTimezoneOffset() * 60000
          )
            .toISOString()
            .slice(0, 16);

          setFormData({
            title: res.data.title || "",
            description: res.data.description || "",
            date: localDate,
          });
        } else {
          setError("Event not found");
        }
      } catch {
        setError("Could not connect to the server");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.date
    ) {
      setError("All fields are required");
      setSaving(false);
      return;
    }

    try {
      const res = await updateEvent(id, {
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
        setError(res.message || "Failed to update the event");
      }
    } catch {
      setError("Could not connect to the server");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-violet-600" />
      </div>
    );
  }

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
          <div className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg">
            <Pencil className="size-5" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-950">
              Edit Event
            </h2>
            <p className="text-sm text-slate-500">
              Save your changes.
            </p>
          </div>
        </div>
      </div>

      {/* Success */}
      {success && (
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
          <CheckCircle2 className="size-5 shrink-0" />
          Event updated successfully! Redirecting...
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
            disabled={saving || success}
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-violet-600 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {saving ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Pencil className="size-4" />
                Save Changes
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
