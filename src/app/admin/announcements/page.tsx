"use client"

import { useEffect, useState, useCallback } from "react"
import { 
  ChevronLeft, ChevronRight, Loader2, 
  Layers, CheckCircle, Calendar, 
  Eye, FileText, Filter, Trash2, X, AlertTriangle,
  Clock, FileCheck2, BarChart3, ListFilter
} from "lucide-react"

import { 
  getAnnouncements, 
  approveAnnouncement,
  deleteAnnouncement,
  Announcement, 
  AnnouncementResponse 
} from "../../../services/AdminServices/Announcment"

const AdminAnnouncements = () => {
  // --- STATE MANAGEMENT ---
  const [response, setResponse] = useState<AnnouncementResponse["data"] | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedApproval, setSelectedApproval] = useState<string>("") 

  // Modal States
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  
  const [activeAnnouncement, setActiveAnnouncement] = useState<Announcement | null>(null)
  const [announcementToDelete, setAnnouncementToDelete] = useState<Announcement | null>(null)
  
  // Action Loadings
  const [isDeleting, setIsDeleting] = useState(false)
  const [toggleLoadingId, setToggleLoadingId] = useState<string | null>(null)

  // API-dan gələn real kateqoriyalara uyğun struktur
  const categories = ["B", "General", "Təhsil", "Yenilik", "Tədbir"]

  // --- DATA FETCHING ---
  const fetchAnnouncements = useCallback(async () => {
    setLoading(true)
    try {
      const approvalParam = selectedApproval === "true" ? true : selectedApproval === "false" ? false : undefined
      const categoryParam = selectedCategory || undefined

      const res = await getAnnouncements(page, 10, categoryParam, approvalParam)
      if (res.succeeded) {
        setResponse(res.data)
        
        if (activeAnnouncement) {
          const updated = res.data.items.find((item: Announcement) => item.id === activeAnnouncement.id)
          if (updated) setActiveAnnouncement(updated)
        }
      }
    } catch (error) {
      console.error("Fetch Announcements Error:", error)
    } finally {
      setLoading(false)
    }
  }, [page, selectedCategory, selectedApproval, activeAnnouncement?.id])

  useEffect(() => {
    const timer = setTimeout(() => fetchAnnouncements(), 300)
    return () => clearTimeout(timer)
  }, [fetchAnnouncements])

  // --- REAL API ACTIONS ---
  const handleApprove = async (id: string) => {
    setToggleLoadingId(id)
    try {
      await approveAnnouncement(id)
      await fetchAnnouncements()
    } catch (error) {
      console.error("Approve Error:", error)
    } finally {
      setToggleLoadingId(null)
    }
  }

  const handleDeleteAnnouncement = async () => {
    if (!announcementToDelete) return
    setIsDeleting(true)
    try {
      await deleteAnnouncement(announcementToDelete.id)
      setIsDeleteModalOpen(false)
      setAnnouncementToDelete(null)
      
      if (response?.items.length === 1 && page > 1) {
        setPage(p => p - 1)
      } else {
        await fetchAnnouncements()
      }
    } catch (error) {
      console.error("Delete Error:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("az-AZ", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return (
    <div className="p-4 md:p-8 lg:p-10 bg-[#F8FAFC] min-h-screen font-sans selection:bg-indigo-100">
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* 1. ANNOUNCEMENT PREVIEW MODAL */}
        {isPreviewModalOpen && activeAnnouncement && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsPreviewModalOpen(false)} />
            <div className="relative bg-white w-full max-w-xl rounded-xl shadow-2xl overflow-hidden z-10 border border-slate-100 flex flex-col max-h-[85vh]">
              <div className="px-6 pt-6 pb-4 flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 border border-indigo-100">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-950 tracking-tight">Elan Məlumatı</h3>
                    <p className="text-xs font-semibold text-indigo-600 opacity-80">{activeAnnouncement.category}</p>
                  </div>
                </div>
                <button onClick={() => setIsPreviewModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg transition-all cursor-pointer">
                  <X size={16} />
                </button>
              </div>

              <hr className="border-slate-100 mx-6" />

              <div className="p-6 space-y-5 overflow-y-auto flex-1">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${activeAnnouncement.isApproved ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'}`}>
                      {activeAnnouncement.isApproved ? 'Təsdiqlənib' : 'Gözləmədə'}
                    </span>
                    <span className="text-slate-400 text-xs font-medium flex items-center gap-1">
                      <Calendar size={13} /> {formatDate(activeAnnouncement.createdAt)}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-950 tracking-tight">{activeAnnouncement.title}</h2>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-5 rounded-lg text-sm text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
                  {activeAnnouncement.content}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. DELETE CONFIRMATION MODAL */}
        {isDeleteModalOpen && announcementToDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => !isDeleting && setIsDeleteModalOpen(false)} />
            <div className="relative bg-white w-full max-w-sm rounded-xl shadow-2xl overflow-hidden p-8 text-center z-10 border border-slate-100">
                <div className="mx-auto w-12 h-12 bg-rose-50 rounded-lg flex items-center justify-center text-rose-500 mb-4 border border-rose-100">
                  <AlertTriangle size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-950 mb-1">Elanı Sil?</h3>
                <p className="text-slate-500 text-xs mb-6 px-2">
                  <span className="font-semibold text-slate-900">"{announcementToDelete.title}"</span> başlıqlı elan geri qaytarılmamaq üzrə silinsin?
                </p>
                <div className="flex gap-3">
                  <button disabled={isDeleting} onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-2.5 bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600 rounded-lg transition-all hover:bg-slate-100 cursor-pointer disabled:opacity-50">Ləğv et</button>
                  <button disabled={isDeleting} onClick={handleDeleteAnnouncement} className="flex-1 py-2.5 bg-rose-600 text-xs font-bold text-white rounded-lg transition-all hover:bg-rose-700 cursor-pointer flex items-center justify-center">
                    {isDeleting ? <Loader2 className="animate-spin" size={16} /> : "Bəli, Sil"}
                  </button>
                </div>
            </div>
          </div>
        )}

        {/* TOP PANEL: HEADER & FILTERS */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight uppercase">Announcement Management</h1>
              </div>
              <p className="text-slate-400 text-xs font-medium pl-3">Sistemə daxil edilmiş elanların idarə edilməsi paneli</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              {/* Category Filter */}
              <div className="relative w-full sm:w-56">
                <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={15} />
                <select 
                  value={selectedCategory} 
                  onChange={(e) => { setSelectedCategory(e.target.value); setPage(1); }}
                  className="w-full pl-9 pr-8 py-2.5 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all appearance-none cursor-pointer"
                >
                  <option value="">Bütün Kateqoriyalar</option>
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Approval Status Filter */}
              <div className="relative w-full sm:w-56">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={15} />
                <select 
                  value={selectedApproval} 
                  onChange={(e) => { setSelectedApproval(e.target.value); setPage(1); }}
                  className="w-full pl-9 pr-8 py-2.5 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all appearance-none cursor-pointer"
                >
                  <option value="">Bütün Statuslar</option>
                  <option value="true">Təsdiqlənənlər</option>
                  <option value="false">Gözləmədə olanlar</option>
                </select>
              </div>
            </div>
        </div>

        {/* STATS VISUAL CARDS (EKRANI DOLĞUN GÖSTƏRƏN HİSSƏ) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cəmi Elan</p>
              <h3 className="text-2xl font-black text-slate-900">{response?.totalCount || 0}</h3>
            </div>
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center border border-indigo-100">
              <BarChart3 size={20} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Təsdiqlənənlər</p>
              <h3 className="text-2xl font-black text-emerald-600">
                {response?.items.filter(i => i.isApproved).length || 0} <span className="text-xs text-slate-400 font-medium">/ səhifə</span>
              </h3>
            </div>
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center border border-emerald-100">
              <FileCheck2 size={20} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Gözləmədə olanlar</p>
              <h3 className="text-2xl font-black text-amber-600">
                {response?.items.filter(i => !i.isApproved).length || 0} <span className="text-xs text-slate-400 font-medium">/ səhifə</span>
              </h3>
            </div>
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center border border-amber-100">
              <Clock size={20} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Aktiv Süzgəc</p>
              <h3 className="text-xs font-bold text-slate-700 truncate max-w-[150px]">
                {selectedCategory || selectedApproval ? "Aktivdir" : "Filtr yoxdur"}
              </h3>
            </div>
            <div className="w-12 h-12 bg-slate-50 text-slate-500 rounded-xl flex items-center justify-center border border-slate-200">
              <ListFilter size={20} />
            </div>
          </div>
        </div>

        {/* MAIN DATA TABLE */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Elan Başlığı / Məzmun</th>
                    <th className="px-6 py-4.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Kateqoriya</th>
                    <th className="px-6 py-4.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Yaradılma Tarixi</th>
                    <th className="px-6 py-4.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Təsdiq Statusu</th>
                    <th className="px-6 py-4.5 text-right text-[11px] font-bold text-slate-500 uppercase tracking-wider">Əməliyyatlar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                     [...Array(5)].map((_, i) => (
                       <tr key={i} className="h-20 bg-white">
                         <td colSpan={5} className="px-6 py-4 text-center">
                           <Loader2 size={22} className="animate-spin mx-auto text-indigo-400 opacity-60" />
                         </td>
                       </tr>
                     ))
                  ) : response?.items && response.items.length > 0 ? (
                    response.items.map((announcement: Announcement) => (
                      <tr key={announcement.id} className="hover:bg-slate-50/60 transition-colors group">
                        {/* Title & Content */}
                        <td className="px-6 py-4.5 max-w-xs md:max-w-md">
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                              {announcement.title}
                            </span>
                            <span className="text-xs font-medium text-slate-400 truncate mt-1">
                              {announcement.content}
                            </span>
                          </div>
                        </td>
                        
                        {/* Category */}
                        <td className="px-6 py-4.5">
                          <span className="px-3 py-1 rounded-full border border-indigo-100 bg-indigo-50 text-indigo-600 text-[10px] font-extrabold uppercase tracking-wider">
                            {announcement.category || "General"}
                          </span>
                        </td>

                        {/* Created At */}
                        <td className="px-6 py-4.5">
                          <span className="text-slate-600 text-xs font-semibold flex items-center gap-1.5">
                            <Calendar size={14} className="text-slate-400" />
                            {formatDate(announcement.createdAt)}
                          </span>
                        </td>

                        {/* Status / Toggle Action */}
                        <td className="px-6 py-4.5">
                          <div className="flex items-center justify-center">
                            {toggleLoadingId === announcement.id ? (
                              <Loader2 size={16} className="animate-spin text-indigo-500" />
                            ) : announcement.isApproved ? (
                              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-sm">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                Approved
                              </span>
                            ) : (
                              <button
                                onClick={() => handleApprove(announcement.id)}
                                className="px-3 py-1 bg-white hover:bg-indigo-600 border border-slate-200 hover:border-indigo-600 text-slate-700 hover:text-white rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                              >
                                Approve
                              </button>
                            )}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4.5 text-right">
                          <div className="flex justify-end items-center gap-1">
                            <button 
                              onClick={() => { setActiveAnnouncement(announcement); setIsPreviewModalOpen(true); }}
                              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all cursor-pointer"
                              title="Elana Bax"
                            >
                              <Eye size={17} />
                            </button>
                            <button 
                              onClick={() => { setAnnouncementToDelete(announcement); setIsDeleteModalOpen(true); }}
                              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                              title="Elanı Sil"
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-16 text-center text-sm font-semibold text-slate-400 italic bg-slate-50/30">
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <FileText size={32} className="text-slate-300" />
                          <span>Sistemdə heç bir elan tapılmadı.</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION BAR */}
            <div className="px-6 py-4.5 bg-slate-50 flex justify-between items-center border-t border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Səhifə <span className="text-slate-700 font-extrabold">{page}</span> / {response?.totalPages || 1}
              </span>
              <div className="flex gap-2">
                <button 
                  disabled={!response?.hasPreviousPage || loading} 
                  onClick={() => setPage(p => p - 1)} 
                  className="p-2 bg-white border border-slate-200 rounded-lg disabled:opacity-40 transition-all hover:bg-slate-50 shadow-sm cursor-pointer disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16}/>
                </button>
                <button 
                  disabled={!response?.hasNextPage || loading} 
                  onClick={() => setPage(p => p + 1)} 
                  className="p-2 bg-white border border-slate-200 rounded-lg disabled:opacity-40 transition-all hover:bg-slate-50 shadow-sm cursor-pointer disabled:cursor-not-allowed"
                >
                  <ChevronRight size={16}/>
                </button>
              </div>
            </div>
        </div>

      </div>
    </div>
  )
}

export default AdminAnnouncements