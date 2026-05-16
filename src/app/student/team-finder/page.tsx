"use client";

import { useState, useEffect } from "react";
import { Plus, Search as SearchIcon, Users, Code, Clock, ArrowUpRight, X, Send, CheckCircle2, UserCheck } from "lucide-react";
import type { TeamFinderPost } from "@/types/student";

interface ExtendedTeamPost extends TeamFinderPost {
    IsOwner?: boolean;
}

// Başlanğıc mock məlumatları (Sistem tərəfindən gələn digər tələbələrin elanları)
const initialPosts: ExtendedTeamPost[] = [
    {
        Id: "1",
        Title: "Frontend developer axtarılır",
        Description: "Hackathon layihəsi üçün React və Tailwind bilən tələbə lazımdır. Dizayn hazırdır, kodlaşdırmaya başlanılacaq.",
        NeededMembers: 1,
        Skill: "React / Next.js",
        CreatedAt: "2026-05-15T09:00:00.000Z",
        IsOwner: false,
    },
    {
        Id: "2",
        Title: "UI/UX designer lazımdır",
        Description: "Campus daxili startap layihəsi üçün mobil interfeys dizayn bacarığı olan komanda üzvü axtarılır.",
        NeededMembers: 1,
        Skill: "Figma",
        CreatedAt: "2026-05-13T15:20:00.000Z",
        IsOwner: false,
    },
];

export default function TeamFinderPage() {
    const [posts, setPosts] = useState<ExtendedTeamPost[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSkill, setSelectedSkill] = useState("All");

    // Form States
    const [showForm, setShowForm] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newDesc, setNewDesc] = useState("");
    const [newSkill, setNewSkill] = useState("");
    const [newMembers, setNewMembers] = useState(1);

    // Modal States (Müraciət üçün)
    const [activePost, setActivePost] = useState<ExtendedTeamPost | null>(null);
    const [requestMessage, setRequestMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // LocalStorage sinxronizasiyası
    useEffect(() => {
        const stored = localStorage.getItem("campus_team_posts");
        if (stored) {
            setPosts(JSON.parse(stored));
        } else {
            setPosts(initialPosts);
            localStorage.setItem("campus_team_posts", JSON.stringify(initialPosts));
        }
    }, []);

    const saveToLocalStorage = (updatedPosts: ExtendedTeamPost[]) => {
        setPosts(updatedPosts);
        localStorage.setItem("campus_team_posts", JSON.stringify(updatedPosts));
    };

    // Yeni Elan Paylaşmaq
    const handleCreatePost = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle.trim() || !newSkill.trim()) return;

        const newPost: ExtendedTeamPost = {
            Id: Date.now().toString(),
            Title: newTitle,
            Description: newDesc,
            NeededMembers: Number(newMembers),
            Skill: newSkill,
            CreatedAt: new Date().toISOString(),
            IsOwner: true, // İstifadəçinin öz elanı
        };

        const updated = [newPost, ...posts];
        saveToLocalStorage(updated);

        // Formu sıfırlamaq
        setNewTitle("");
        setNewDesc("");
        setNewSkill("");
        setNewMembers(1);
        setShowForm(false);
    };

    // Komandaya qoşulmaq müraciəti simulyasiyası
    const handleSendRequest = (e: React.FormEvent) => {
        e.preventDefault();
        if (!requestMessage.trim()) return;

        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);

            setTimeout(() => {
                setActivePost(null);
                setRequestMessage("");
                setIsSuccess(false);
            }, 1200);
        }, 1500);
    };

    // Mövcud unikal skill-ləri filter üçün toplamaq
    const allSkills = ["All", ...Array.from(new Set(posts.map((p) => p.Skill)))];

    // Filtrasiya və Sıralama
    const filteredPosts = posts
        .filter((post) => {
            const matchesSearch =
                post.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.Description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSkill = selectedSkill === "All" || post.Skill === selectedSkill;
            return matchesSearch && matchesSkill;
        })
        .sort((a, b) => new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime());

    return (
        <div className="space-y-8 relative">
            
            {/* ─── HEADER SECTION ─── */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                    <h1 className="text-2xl font-black tracking-tight text-slate-950">Team Finder</h1>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Layihən üçün komanda yığ və ya aktiv komandalara qoşul
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#5c85ee] hover:bg-[#4b74dd] text-white text-xs font-bold rounded-lg shadow-sm shadow-blue-100 hover:shadow-md transition-all self-start sm:self-center cursor-pointer"
                >
                    <Plus size={16} />
                    <span>{showForm ? "Formu Bağla" : "Yeni Elan Yarat"}</span>
                </button>
            </div>

            {/* ─── NEW POST FORM ─── */}
            {showForm && (
                <form onSubmit={handleCreatePost} className="p-6 border border-slate-200/80 bg-slate-50/40 rounded-lg space-y-4 animate-fade-in">
                    <h3 className="text-sm font-black text-slate-950 uppercase tracking-wider mb-2">Yeni Komanda Elanı</h3>
                    
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="space-y-1 sm:col-span-2">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Axtarılan Vəzifə / Başlıq</label>
                            <input
                                type="text"
                                required
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                placeholder="Məs: Backend Developer (Node.js) axtarılır"
                                className="w-full border border-slate-200 px-3 py-2 text-xs rounded-lg bg-white outline-none focus:border-indigo-500 transition-all font-medium text-slate-800"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Tələb Olunan Say</label>
                            <input
                                type="number"
                                min={1}
                                max={10}
                                required
                                value={newMembers}
                                onChange={(e) => setNewMembers(Number(e.target.value))}
                                className="w-full border border-slate-200 px-3 py-2 text-xs rounded-lg bg-white outline-none focus:border-indigo-500 transition-all font-medium text-slate-800"
                            />
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1 sm:col-span-2">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Əsas Texnologiya / Skill</label>
                            <input
                                type="text"
                                required
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                placeholder="Məs: React / Next.js, Python, Figma"
                                className="w-full border border-slate-200 px-3 py-2 text-xs rounded-lg bg-white outline-none focus:border-indigo-500 transition-all font-medium text-slate-800"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Layihə Haqqında Qısa Məlumat</label>
                        <textarea
                            required
                            value={newDesc}
                            onChange={(e) => setNewDesc(e.target.value)}
                            placeholder="Layihənin məqsədi, komandanın hazırkı vəziyyəti və gözləntilər..."
                            rows={3}
                            className="w-full border border-slate-200 px-3 py-2 text-xs rounded-lg bg-white outline-none focus:border-indigo-500 transition-all font-medium text-slate-800 resize-none"
                        />
                    </div>

                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            className="px-5 py-2 bg-slate-950 text-white text-xs font-bold rounded-lg hover:bg-slate-900 shadow-sm transition-all cursor-pointer"
                        >
                            Elanı Paylaş
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
                        placeholder="Layihə adı və ya təsvirə görə axtar..."
                        className="w-full border border-slate-200 pl-9 pr-3 py-2 text-xs rounded-lg bg-white outline-none focus:border-indigo-500 transition-all font-medium text-slate-800 shadow-sm"
                    />
                </div>
            </div>

            {/* ─── DYNAMIC POSTS GRID ─── */}
            {filteredPosts.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-slate-200 rounded-lg bg-slate-50/50">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Axtarışa uyğun elan tapılmadı</p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 items-stretch">
                    {filteredPosts.map((post) => (
                        <div
                            key={post.Id}
                            className="bg-white border border-slate-200/80 rounded-lg p-5 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:border-slate-300 transition-all"
                        >
                            <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 bg-slate-50 border border-slate-100 text-slate-600 rounded-md">
                                        <Code size={11} className="text-slate-400" />
                                        <span>{post.Skill}</span>
                                    </div>

                                    {post.IsOwner ? (
                                        <span className="inline-flex items-center gap-1 text-[10px] bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold px-2 py-0.5 rounded-md">
                                            <UserCheck size={11} />
                                            Mənim Elanım
                                        </span>
                                    ) : (
                                        <button
                                            onClick={() => setActivePost(post)}
                                            className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-[#5c85ee] px-2 py-0.5 rounded-md hover:bg-blue-50/50 transition-all cursor-pointer group/join"
                                        >
                                            <span>Müraciət et</span>
                                            <ArrowUpRight size={11} className="opacity-0 group-hover/join:opacity-100 transition-opacity" />
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-1.5">
                                    <h3 className="text-sm font-black text-slate-900 tracking-tight group-hover:text-[#5c85ee] transition-colors">
                                        {post.Title}
                                    </h3>
                                    <p className="text-xs text-slate-400 font-medium leading-relaxed">
                                        {post.Description}
                                    </p>
                                </div>
                            </div>

                            {/* Bottom Metadata */}
                            <div className="flex items-center justify-between pt-4 mt-5 border-t border-slate-50 text-[11px] font-bold text-slate-400">
                                <span className="flex items-center gap-1 text-slate-500">
                                    <Users size={12} className="text-slate-400" />
                                    <span>{post.NeededMembers} nəfər axtarılır</span>
                                </span>
                                <span className="flex items-center gap-1 font-mono text-[10px] text-slate-400 font-medium">
                                    <Clock size={12} />
                                    {new Date(post.CreatedAt).toLocaleDateString("az-AZ", {
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

            {/* ─── PREMIUM JOIN REQUEST MODAL ─── */}
            {activePost && (
                <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white w-full max-w-md rounded-lg border border-slate-100 shadow-xl overflow-hidden transform transition-all animate-scale-up">
                        
                        {/* Modal Header */}
                        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div className="space-y-0.5">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">Komandaya Qoşulma Müraciəti</h3>
                                <p className="text-sm font-black text-slate-900 tracking-tight">
                                    {activePost.Title}
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    if (!isSubmitting && !isSuccess) setActivePost(null);
                                }}
                                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
                                disabled={isSubmitting || isSuccess}
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSendRequest} className="p-5 space-y-4">
                            {isSuccess ? (
                                <div className="py-6 flex flex-col items-center justify-center text-center space-y-2 animate-fade-in">
                                    <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center border border-emerald-100 shadow-sm">
                                        <CheckCircle2 size={22} />
                                    </div>
                                    <h4 className="text-sm font-black text-slate-900">Müraciətiniz Göndərildi!</h4>
                                    <p className="text-xs text-slate-400 font-medium max-w-[260px]">
                                        Komanda kapitanı müraciəti təsdiqlədikdə bildiriş alacaqsınız.
                                    </p>
                                </div>
                            ) : isSubmitting ? (
                                <div className="py-8 flex flex-col items-center justify-center text-center space-y-3 animate-fade-in">
                                    <div className="w-6 h-6 border-2 border-[#5c85ee] border-t-transparent rounded-full animate-spin"></div>
                                    <p className="text-xs font-bold text-slate-500 tracking-wide">
                                        Müraciətiniz göndərilir...
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3 animate-fade-in">
                                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs text-slate-500 font-medium leading-relaxed">
                                        <span className="font-bold text-slate-700 block mb-0.5">Tələb olunan skill:</span>
                                        <span className="text-indigo-600 font-bold">{activePost.Skill}</span>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Özünüz haqqında qısa qeyd</label>
                                        <textarea
                                            required
                                            rows={4}
                                            value={requestMessage}
                                            onChange={(e) => setRequestMessage(e.target.value)}
                                            placeholder="Salam, bu texnologiya üzrə təcrübəm var və layihənizlə maraqlanıram..."
                                            className="w-full border border-slate-200 px-3 py-2 text-xs rounded-lg bg-white outline-none focus:border-indigo-500 transition-all font-medium text-slate-800 resize-none"
                                        />
                                    </div>

                                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-50">
                                        <button
                                            type="button"
                                            onClick={() => setActivePost(null)}
                                            className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
                                        >
                                            Ləğv et
                                        </button>
                                        <button
                                            type="submit"
                                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-950 text-white text-xs font-bold rounded-lg hover:bg-slate-900 shadow-sm transition-all cursor-pointer"
                                        >
                                            <Send size={12} />
                                            <span>Müraciət et</span>
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