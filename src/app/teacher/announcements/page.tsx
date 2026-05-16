"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getTeacherAnnouncements,
  deleteAnnouncement,
} from "@/services/TeacherServices/AnnouncementService";
import type { Announcement } from "@/types/Teacher";
import {
  Megaphone,
  Plus,
  Pencil,
  Trash2,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertTriangle,
} from "lucide-react";

export default function TeacherAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const pageSize = 10;

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getTeacherAnnouncements(page, pageSize);
      if (res.succeeded) {
        setAnnouncements(res.data.items);
        setTotalPages(res.data.totalPages);
      } else {
        setError(res.message || "Failed to load announcements");
      }
    } catch {
      setError("Could not connect to the server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;
    setDeletingId(id);
    try {
      const res = await deleteAnnouncement(id);
      if (res.succeeded) {
        setAnnouncements((prev) => prev.filter((a) => a.id !== id));
      } else {
        alert(res.message || "Failed to delete the announcement");
      }
    } catch {
      alert("Server error");
    } finally {
      setDeletingId(null);
    }
  };

  const getCategoryColor = (cat: string) => {
    const c = cat?.toLowerCase();
    if (c === "urgent")
      return "bg-red-50 text-red-700 border-red-200";
    if (c === "academic")
      return "bg-blue-50 text-blue-700 border-blue-200";
    if (c === "event")
      return "bg-purple-50 text-purple-700 border-purple-200";
    return "bg-slate-50 text-slate-700 border-slate-200";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-600">
            Announcements
          </p>
          <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">
            My Announcements
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage all announcements you have created.
          </p>
        </div>
        <Link
          href="/teacher/announcements/create"
          className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-amber-600"
        >
          <Plus className="size-4" />
          New Announcement
        </Link>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="size-8 animate-spin text-amber-600" />
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertTriangle className="size-5 shrink-0" />
          {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && announcements.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="grid size-16 place-items-center rounded-3xl bg-amber-50 text-amber-500 mb-4">
            <Megaphone className="size-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            No announcements yet
          </h3>
          <p className="mt-2 text-sm text-slate-500 max-w-sm">
            Create your first announcement and start sharing information with students.
          </p>
          <Link
            href="/teacher/announcements/create"
            className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-amber-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-amber-700"
          >
            <Plus className="size-4" />
            Create Announcement
          </Link>
        </div>
      )}

      {/* Announcements List */}
      {!loading && !error && announcements.length > 0 && (
        <div className="space-y-3">
          {announcements.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-[22px] border border-slate-100 bg-white p-5 shadow-sm transition hover:border-slate-200 hover:shadow-md"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {item.category && (
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-bold ${getCategoryColor(
                          item.category
                        )}`}
                      >
                        {item.category}
                      </span>
                    )}
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-bold ${
                        item.isApproved
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-yellow-50 text-yellow-700 border-yellow-200"
                      }`}
                    >
                      {item.isApproved ? (
                        <>
                          <CheckCircle2 className="size-3" /> Approved
                        </>
                      ) : (
                        <>
                          <Clock className="size-3" /> Pending
                        </>
                      )}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 truncate">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 line-clamp-2">
                    {item.content}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/teacher/announcements/${item.id}/edit`}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 hover:border-slate-300"
                  >
                    <Pencil className="size-3.5" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-white px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                  >
                    {deletingId === item.id ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="size-3.5" />
                    )}
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40"
          >
            <ChevronLeft className="size-4" />
            Previous
          </button>
          <span className="rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600">
            {page} / {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40"
          >
            Next
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}
