"use client";

import { useState, useEffect } from "react";
import { Plus, Search as SearchIcon, MapPin, Clock, RefreshCw, MessageSquare, ArrowUpRight, X, Send, CheckCircle2 } from "lucide-react";
import type { LostFoundItem } from "@/types/student";

interface ExtendedLostFoundItem extends LostFoundItem {
    IsOwner?: boolean;
}

const initialItems: ExtendedLostFoundItem[] = [
    {
        Id: "1",
        Title: "Qara çanta",
        Description: "Kitabxana yaxınlığında qara çanta itirilib.",
        Location: "Kitabxana",
        Type: "Lost",
        CreatedAt: "2026-05-15T10:00:00.000Z",
        IsOwner: false,
    },
    {
        Id: "2",
        Title: "Tələbə kartı",
        Description: "Kafeteriyada tələbə kartı tapılıb.",
        Location: "Kafeteriya",
        Type: "Found",
        CreatedAt: "2026-05-14T12:30:00.000Z",
        IsOwner: false,
    },
];

export default function LostFoundPage() {
    const [items, setItems] = useState<ExtendedLostFoundItem[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState<"All" | "Lost" | "Found">("All");

    // Form states
    const [showForm, setShowForm] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newDesc, setNewDesc] = useState("");
    const [newLoc, setNewLoc] = useState("");
    const [newType, setNewType] = useState<"Lost" | "Found">("Lost");

    // ─── MODAL STATES ───
    const [activeContactItem, setActiveContactItem] = useState<ExtendedLostFoundItem | null>(null);
    const [messageText, setMessageText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("campus_lost_found");
        if (stored) {
            setItems(JSON.parse(stored));
        } else {
            setItems(initialItems);
            localStorage.setItem("campus_lost_found", JSON.stringify(initialItems));
        }
    }, []);

    const saveToLocalStorage = (updatedItems: ExtendedLostFoundItem[]) => {
        setItems(updatedItems);
        localStorage.setItem("campus_lost_found", JSON.stringify(updatedItems));
    };

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle.trim() || !newLoc.trim()) return;

        const newItem: ExtendedLostFoundItem = {
            Id: Date.now().toString(),
            Title: newTitle,
            Description: newDesc,
            Location: newLoc,
            Type: newType,
            CreatedAt: new Date().toISOString(),
            IsOwner: true,
        };

        const updated = [newItem, ...items];
        saveToLocalStorage(updated);

        setNewTitle("");
        setNewDesc("");
        setNewLoc("");
        setNewType("Lost");
        setShowForm(false);
    };

    const toggleStatus = (id: string) => {
        const updated = items.map((item) => {
            if (item.Id === id && item.IsOwner) {
                return {
                    ...item,
                    Type: item.Type === "Lost" ? ("Found" as const) : ("Lost" as const),
                };
            }
            return item;
        });
        saveToLocalStorage(updated);
    };

    // Müraciət Göndərmə Simulyasiyası
    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!messageText.trim()) return;

        setIsSubmitting(true);

        // 1.5 saniyəlik soft göndərilmə effekti
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);

            // Uğurlu xəbərdarlıqdan 1 saniyə sonra modalı bağla
            setTimeout(() => {
                setActiveContactItem(null);
                setMessageText("");
                setIsSuccess(false);
            }, 1200);
        }, 1500);
    };

    const filteredItems = items
        .filter((item) => {
            const matchesSearch =
                item.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.Location.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filterType === "All" || item.Type === filterType;
            return matchesSearch && matchesFilter;
        })
        .sort((a, b) => new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime());

    return (
        <div className="space-y-8 relative">
            
            {/* ─── HEADER SECTION ─── */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                    <h1 className="text-2xl font-black tracking-tight text-slate-950">Lost & Found</h1>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Kampus daxilində itirilmiş və tapılmış əşyaların canlı idarəetməsi
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#5c85ee] hover:bg-[#4b74dd] text-white text-xs font-bold rounded-lg shadow-sm shadow-blue-100 hover:shadow-md transition-all self-start sm:self-center cursor-pointer"
                >
                    <Plus size={16} />
                    <span>{showForm ? "Formu Bağla" : "Yeni Elan Əlavə Et"}</span>
                </button>
            </div>

            {/* ─── NEW ITEM FORM ─── */}
            {showForm && (
                <form onSubmit={handleAddItem} className="p-6 border border-slate-200/80 bg-slate-50/40 rounded-lg space-y-4 animate-fade-in">
                    <h3 className="text-sm font-black text-slate-950 uppercase tracking-wider mb-2">Yeni Əşya Qeydiyyatı</h3>
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Əşyanın Adı</label>
                            <input
                                type="text"
                                required
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                placeholder="Məs: MacBook Pro air, Tələbə Kartı"
                                className="w-full border border-slate-200 px-3 py-2 text-xs rounded-lg bg-white outline-none focus:border-indigo-500 transition-all font-medium text-slate-800"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Tapıldığı / İtirdiyi Məkan</label>
                            <input
                                type="text"
                                required
                                value={newLoc}
                                onChange={(e) => setNewLoc(e.target.value)}
                                placeholder="Məs: 3-cü mərtəbə koridor, Oxu zalı"
                                className="w-full border border-slate-200 px-3 py-2 text-xs rounded-lg bg-white outline-none focus:border-indigo-500 transition-all font-medium text-slate-800"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Əlavə Qeyd / Təsvir</label>
                        <textarea
                            value={newDesc}
                            onChange={(e) => setNewDesc(e.target.value)}
                            placeholder="Əşya haqqında rəng, fərqləndirici nişanə və s. ətraflı məlumat..."
                            rows={3}
                            className="w-full border border-slate-200 px-3 py-2 text-xs rounded-lg bg-white outline-none focus:border-indigo-500 transition-all font-medium text-slate-800 resize-none"
                        />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setNewType("Lost")}
                                className={`px-4 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                                    newType === "Lost"
                                        ? "bg-rose-50 border-rose-200 text-rose-600"
                                        : "bg-white border-slate-200 text-slate-500"
                                }`}
                            >
                                İtirilib (Lost)
                            </button>
                            <button
                                type="button"
                                onClick={() => setNewType("Found")}
                                className={`px-4 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                                    newType === "Found"
                                        ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                                        : "bg-white border-slate-200 text-slate-500"
                                }`}
                            >
                                Tapılıb (Found)
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="px-5 py-2 bg-slate-950 text-white text-xs font-bold rounded-lg hover:bg-slate-900 shadow-sm transition-all cursor-pointer"
                        >
                            Paylaş
                        </button>
                    </div>
                </form>
            )}

            {/* ─── FILTERS & SEARCH CONTROLS ─── */}
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
                <div className="relative flex items-center flex-1 max-w-md">
                    <SearchIcon className="absolute left-3 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Əşya adı və ya məkana görə axtar..."
                        className="w-full border border-slate-200 pl-9 pr-3 py-2 text-xs rounded-lg bg-white outline-none focus:border-indigo-500 transition-all font-medium text-slate-800 shadow-sm"
                    />
                </div>

                <div className="flex border border-slate-200 p-0.5 rounded-lg bg-white shadow-sm shrink-0 self-start sm:self-auto">
                    {(["All", "Lost", "Found"] as const).map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilterType(type)}
                            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                                filterType === type
                                    ? "bg-slate-100 text-slate-900"
                                    : "text-slate-400 hover:text-slate-600"
                            }`}
                        >
                            {type === "All" ? "Hamısı" : type === "Lost" ? "İtənlər" : "Tapılanlar"}
                        </button>
                    ))}
                </div>
            </div>

            {/* ─── DYNAMIC ITEMS GRID ─── */}
            {filteredItems.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-slate-200 rounded-lg bg-slate-50/50">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Məlumat tapılmadı</p>
                    <p className="text-xs text-slate-400 mt-1">Axtarış kriteriyalarınıza uyğun əşya yoxdur.</p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 items-stretch">
                    {filteredItems.map((item) => (
                        <div
                            key={item.Id}
                            className="bg-white border border-slate-200/80 rounded-lg p-5 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:border-slate-300 transition-all"
                        >
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`inline-flex items-center text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                                                item.Type === "Lost"
                                                    ? "bg-rose-50 border border-rose-100 text-rose-600"
                                                    : "bg-emerald-50 border border-emerald-100 text-emerald-600"
                                            }`}
                                        >
                                            {item.Type === "Lost" ? "İtirilib" : "Tapılıb"}
                                        </span>
                                        {item.IsOwner && (
                                            <span className="text-[9px] bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold px-1.5 py-0.5 rounded-md">
                                                Mənim Elanım
                                            </span>
                                        )}
                                    </div>
                                    
                                    {item.IsOwner ? (
                                        <button
                                            onClick={() => toggleStatus(item.Id)}
                                            title="Statusu Dəyiş"
                                            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-indigo-100 rounded-lg transition-all cursor-pointer group/btn"
                                        >
                                            <RefreshCw size={13} className="group-hover/btn:rotate-180 transition-transform duration-500" />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setActiveContactItem(item)}
                                            className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-[#5c85ee] px-2 py-1 rounded-md hover:bg-blue-50/50 transition-all cursor-pointer group/contact"
                                        >
                                            <MessageSquare size={12} />
                                            <span>Müraciət et</span>
                                            <ArrowUpRight size={11} className="opacity-0 group-hover/contact:opacity-100 transition-opacity" />
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-sm font-black text-slate-900 tracking-tight group-hover:text-[#5c85ee] transition-colors">
                                        {item.Title}
                                    </h3>
                                    {item.Description && (
                                        <p className="text-xs text-slate-400 font-medium leading-relaxed">
                                            {item.Description}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-50 text-[11px] font-bold text-slate-400">
                                <span className="flex items-center gap-1">
                                    <MapPin size={12} className="text-slate-400" />
                                    {item.Location}
                                </span>
                                <span className="flex items-center gap-1 font-mono text-[10px] text-slate-400 font-medium">
                                    <Clock size={12} />
                                    {new Date(item.CreatedAt).toLocaleDateString("az-AZ", {
                                        month: "short",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ─── PREMIUM CONTACT MODAL ─── */}
            {activeContactItem && (
                <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white w-full max-w-md rounded-lg border border-slate-100 shadow-xl overflow-hidden transform transition-all animate-scale-up">
                        
                        {/* Modal Header */}
                        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div className="space-y-0.5">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">Elan Sahibinə Müraciət</h3>
                                <p className="text-sm font-black text-slate-900 tracking-tight">
                                    {activeContactItem.Title}
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    if (!isSubmitting && !isSuccess) setActiveContactItem(null);
                                }}
                                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
                                disabled={isSubmitting || isSuccess}
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Modal Body / Form */}
                        <form onSubmit={handleSendMessage} className="p-5 space-y-4">
                            {isSuccess ? (
                                /* Təsdiq ekranı */
                                <div className="py-6 flex flex-col items-center justify-center text-center space-y-2 animate-fade-in">
                                    <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center border border-emerald-100 shadow-sm">
                                        <CheckCircle2 size={22} />
                                    </div>
                                    <h4 className="text-sm font-black text-slate-900">Müraciət Göndərildi!</h4>
                                    <p className="text-xs text-slate-400 font-medium max-w-[240px]">
                                        Mesajınız qarşı tərəfə uğurla çatdırıldı.
                                    </p>
                                </div>
                            ) : isSubmitting ? (
                                /* Loader ekranı */
                                <div className="py-8 flex flex-col items-center justify-center text-center space-y-3 animate-fade-in">
                                    <div className="w-6 h-6 border-2 border-[#5c85ee] border-t-transparent rounded-full animate-spin"></div>
                                    <p className="text-xs font-bold text-slate-500 tracking-wide">
                                        Müraciətiniz göndərilir...
                                    </p>
                                </div>
                            ) : (
                                /* Mesaj yazma sahəsi */
                                <div className="space-y-3 animate-fade-in">
                                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs text-slate-500 font-medium leading-relaxed">
                                        <span className="font-bold text-slate-700 block mb-0.5">Elan təsviri:</span>
                                        {activeContactItem.Description || "Əlavə təsvir qeyd edilməyib."}
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Mesajınız</label>
                                        <textarea
                                            required
                                            rows={4}
                                            value={messageText}
                                            onChange={(e) => setMessageText(e.target.value)}
                                            placeholder="Salam, bu əşya haqqında məlumat almaq istəyirəm..."
                                            className="w-full border border-slate-200 px-3 py-2 text-xs rounded-lg bg-white outline-none focus:border-indigo-500 transition-all font-medium text-slate-800 resize-none"
                                        />
                                    </div>

                                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-50">
                                        <button
                                            type="button"
                                            onClick={() => setActiveContactItem(null)}
                                            className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
                                        >
                                            Ləğv et
                                        </button>
                                        <button
                                            type="submit"
                                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-950 text-white text-xs font-bold rounded-lg hover:bg-slate-900 shadow-sm transition-all cursor-pointer"
                                        >
                                            <Send size={12} />
                                            <span>Göndər</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}