"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getTeacherEvents,
  deleteEvent,
} from "@/services/TeacherServices/EventService";
import type { EventItem } from "@/types/Teacher";
import {
  Calendar,
  Plus,
  Pencil,
  Trash2,
  Clock,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertTriangle,
  MapPin,
} from "lucide-react";

export default function TeacherEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
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
      const res = await getTeacherEvents(page, pageSize);
      if (res.succeeded) {
        setEvents(res.data.items);
        setTotalPages(res.data.totalPages);
      } else {
        setError(res.message || "Failed to load events");
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
    if (!confirm("Are you sure you want to delete this event?")) return;
    setDeletingId(id);
    try {
      const res = await deleteEvent(id);
      if (res.succeeded) {
        setEvents((prev) => prev.filter((e) => e.id !== id));
      } else {
        alert(res.message || "Failed to delete the event");
      }
    } catch {
      alert("Server error");
    } finally {
      setDeletingId(null);
    }
  };

  const isUpcoming = (dateStr: string) => {
    return new Date(dateStr) >= new Date();
  };

  const formatEventDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return {
      day: d.getDate(),
      month: d.toLocaleDateString("en-US", { month: "short" }),
      year: d.getFullYear(),
      time: d.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      full: d.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-600">
            Events
          </p>
          <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">
            My Events
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage all events you have created.
          </p>
        </div>
        <Link
          href="/teacher/events/create"
          className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-violet-600"
        >
          <Plus className="size-4" />
          New Event
        </Link>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="size-8 animate-spin text-violet-600" />
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertTriangle className="size-5 shrink-0" />
          {error}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && events.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="grid size-16 place-items-center rounded-3xl bg-violet-50 text-violet-500 mb-4">
            <Calendar className="size-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            No events yet
          </h3>
          <p className="mt-2 text-sm text-slate-500 max-w-sm">
            Create your first event and share campus activities
            with students.
          </p>
          <Link
            href="/teacher/events/create"
            className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-violet-700"
          >
            <Plus className="size-4" />
            Create Event
          </Link>
        </div>
      )}

      {/* Events Grid */}
      {!loading && !error && events.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {events.map((item) => {
            const dt = formatEventDate(item.date);
            const upcoming = isUpcoming(item.date);

            return (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-[22px] border border-slate-100 bg-white shadow-sm transition hover:border-slate-200 hover:shadow-md"
              >
                {/* Date badge */}
                <div
                  className={`flex items-center gap-4 p-5 pb-0`}
                >
                  <div
                    className={`grid size-16 shrink-0 place-items-center rounded-2xl text-center ${
                      upcoming
                        ? "bg-violet-50 text-violet-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <div>
                      <p className="text-2xl font-black leading-none">
                        {dt.day}
                      </p>
                      <p className="text-xs font-bold uppercase mt-0.5">
                        {dt.month}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-bold ${
                          upcoming
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-slate-50 text-slate-500 border-slate-200"
                        }`}
                      >
                        <Clock className="size-3" />
                        {upcoming ? "Upcoming" : "Past"}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 truncate">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <div className="px-5 pt-3 pb-4">
                  <p className="text-sm text-slate-500 line-clamp-2">
                    {item.description}
                  </p>
                  <p className="mt-2 text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="size-3" />
                    {dt.full}
                  </p>

                  {/* Actions */}
                  <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4">
                    <Link
                      href={`/teacher/events/${item.id}/edit`}
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
            );
          })}
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
