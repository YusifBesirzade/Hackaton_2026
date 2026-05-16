"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAnnouncement } from "@/services/TeacherServices/AnnouncementService";
import {
  ArrowLeft,
  Loader2,
  Megaphone,
  CheckCircle2,
  AlertCircle,
  Sparkles,
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
    category: "General", // Default olaraq ilk kateqoriya seçili gəlir
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

  // Soft badge seçimi üçün xüsusi funksiya
  const handleCategorySelect = (cat: string) => {
    setFormData((prev) => ({ ...prev, category: cat }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Başlıq və məzmun daxil edilməlidir.");
      setLoading(false);
      return;
    }

    try {
      const res = await createAnnouncement({
        title: formData.title.trim(),
        content: formData.content.trim(),
        category: formData.category,
      });

      if (res.succeeded) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/teacher/announcements");
        }, 1500);
      } else {
        setError(res.message || "Elan yaradıla bilmədi.");
      }
    } catch {
      setError("Serverlə əlaqə qurulmadı. Yenidən yoxlayın.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-5 font-sans">
      
      {/* ─── BACK NAVIGATION ─── */}
      <Link
        href="/teacher/announcements"
        className="group inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 transition-colors hover:text-slate-700"
      >
        <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
        <span>Elanlara qayıt</span>
      </Link>

      {/* ─── HEADER SECTION ─── */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 text-[#5c85ee] flex items-center justify-center shadow-sm shrink-0">
          <Megaphone className="size-4.5" />
        </div>
        <div>
          <h2 className="text-lg font-black tracking-tight text-slate-900 sm:text-xl">
            Yeni Elan Yaradılması
          </h2>
          <p className="text-[11px] font-medium text-slate-400 mt-0.5">
            Paylaşılacaq məlumat idarəçi (admin) təsdiqindən sonra görünəcək.
          </p>
        </div>
      </div>

      {/* ─── STATUS NOTIFICATIONS ─── */}
      {success && (
        <div className="flex items-center gap-2.5 rounded-lg border border-emerald-100 bg-emerald-50/60 p-3.5 text-xs font-bold text-emerald-700 animate-in fade-in duration-200">
          <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
          <span>Elan uğurla yaradıldı! Yönləndirilirsiniz...</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2.5 rounded-lg border border-rose-100 bg-rose-50/60 p-3.5 text-xs font-bold text-rose-700 animate-in fade-in duration-200">
          <AlertCircle className="size-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* ─── MAIN PREMIUM FORM (8px - 12px Radius) ─── */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        {/* Title Input */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
            Elanın Başlığı <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="Məs: Buraxılış işlərinin təhvil verilmə tarixi"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-bold text-slate-700 placeholder:text-slate-400 outline-none transition-all focus:border-[#5c85ee] focus:bg-white"
          />
        </div>

        {/* Soft Interactive Category Selector (No standard select dropdown) */}
        <div className="space-y-2">
          <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
            Kateqoriya Seçimi
          </label>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => {
              const isSelected = formData.category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                      : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Input */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
            Məzmun və Detallar <span className="text-rose-500">*</span>
          </label>
          <textarea
            name="content"
            required
            value={formData.content}
            onChange={handleChange}
            rows={5}
            placeholder="Tələbələrə çatdırılacaq rəsmi qeydləri daxil edin..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-600 placeholder:text-slate-400 outline-none transition-all focus:border-[#5c85ee] focus:bg-white resize-none field-sizing-content min-h-[120px]"
          />
        </div>

        {/* Form Actions Section */}
        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-50">
          <Link
            href="/teacher/announcements"
            className="px-4 py-2 bg-slate-50 border border-slate-200 text-slate-600 font-bold text-xs rounded-lg transition-all hover:bg-slate-100 text-center"
          >
            Ləğv et
          </Link>
          
          <button
            type="submit"
            disabled={loading || success}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg disabled:opacity-40 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="size-3.5 animate-spin" />
                <span>Yaradılır...</span>
              </>
            ) : (
              <>
                <Sparkles className="size-3.5" />
                <span>Elanı Tamamla</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}