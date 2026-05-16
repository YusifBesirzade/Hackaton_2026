"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { 
  Search, ChevronLeft, ChevronRight, 
  Trash2, AlertTriangle, Loader2, Eye,
  UserPlus, X, Shield, Settings2, Users, UserCheck, ShieldAlert, Filter
} from "lucide-react"

import { 
  getUsers, 
  deleteUser, 
  assignRole, 
  removeRole, 
  toggleUserActive,
  User, 
  UserResponse 
} from "@/services/AdminServices/User"
import { getRoles, RolesResponse, RoleItem } from "@/services/AdminServices/RoleService"

const AdminUsers = () => {
  // --- STATE MANAGEMENT ---
  const [response, setResponse] = useState<UserResponse["data"] | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  
  // Role States
  const [availableRoles, setAvailableRoles] = useState<RoleItem[]>([])
  const [selectedRoleForAssign, setSelectedRoleForAssign] = useState<string>("")
  const [roleActionLoading, setRoleActionLoading] = useState<string | null>(null)

  // Toggle Active States
  const [activeToggleLoadingId, setActiveToggleLoadingId] = useState<string | null>(null)

  // Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false)
  const [activeRoleUser, setActiveRoleUser] = useState<User | null>(null)

  // --- DATA FETCHING ---
  const fetchAllRoles = useCallback(async () => {
    try {
      const rolesData: RolesResponse = await getRoles();
      const rolesList = rolesData.data || rolesData.items || [];
      setAvailableRoles(rolesList);
    } catch (error) {
      console.error("❌ Roles Load Error:", error);
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getUsers(page, 10, search)
      if (res.succeeded) {
        setResponse(res.data)
        
        if (activeRoleUser) {
          const updatedUser = res.data.items.find((u: User) => u.id === activeRoleUser.id);
          if (updatedUser) setActiveRoleUser(updatedUser);
        }
      }
    } catch (error) {
      console.error("Fetch Error:", error)
    } finally {
      setLoading(false)
    }
  }, [page, search, activeRoleUser?.id])

  useEffect(() => {
    fetchAllRoles();
    const timer = setTimeout(() => fetchUsers(), 400)
    return () => clearTimeout(timer)
  }, [page, search])

  // --- ACTIONS ---
  const handleToggleActive = async (userId: string) => {
    setActiveToggleLoadingId(userId);
    try {
      await toggleUserActive(userId);
      await fetchUsers();
    } catch (error) {
      alert("İstifadəçi statusu dəyişdirilərkən xəta baş verdi.");
    } finally {
      setActiveToggleLoadingId(null);
    }
  };

  const handleAssignRole = async () => {
    if (!activeRoleUser || !selectedRoleForAssign) return;

    setRoleActionLoading('assign');
    try {
      await assignRole(activeRoleUser.id, selectedRoleForAssign);
      setSelectedRoleForAssign("");
      await fetchUsers();
    } catch (error) {
      alert("Rol təyin edilərkən xəta baş verdi.");
    } finally {
      setRoleActionLoading(null);
    }
  };

  const handleRemoveRole = async (roleName: string) => {
    if (!activeRoleUser) return;

    setRoleActionLoading(`remove-${roleName}`);
    try {
      await removeRole(activeRoleUser.id, roleName);
      await fetchUsers();
    } catch (error) {
      alert("Rol silinərkən xəta baş verdi.");
    } finally {
      setRoleActionLoading(null);
    }
  };

  const handleDelete = async () => {
    if (!userToDelete) return
    setIsDeleting(true)
    try {
      await deleteUser(userToDelete.id)
      setIsDeleteModalOpen(false)
      setUserToDelete(null)
      fetchUsers() 
    } catch (error) {
      alert("Xəta baş verdi. İstifadəçi silinmədi.")
    } finally {
      setIsDeleting(false)
    }
  }

  const getRoleStyle = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'teacher': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'student': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  }

  return (
    <div className="p-4 md:p-8 lg:p-10 bg-[#F8FAFC] min-h-screen font-sans text-slate-900 selection:bg-slate-200">
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* 1. DELETE MODAL */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => !isDeleting && setIsDeleteModalOpen(false)} />
            <div className="relative bg-white w-full max-w-sm rounded-xl shadow-2xl overflow-hidden p-8 text-center z-10 border border-slate-100">
                <div className="mx-auto w-12 h-12 bg-rose-50 rounded-lg flex items-center justify-center text-rose-500 mb-4 border border-rose-100">
                  <AlertTriangle size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-950 mb-1">Hesabı Sil?</h3>
                <p className="text-slate-500 text-xs mb-6 px-2">
                  <span className="font-semibold text-slate-900">"{userToDelete?.fullName}"</span> başlıqlı istifadəçi hesabı geri qaytarılmamaq üzrə silinsin?
                </p>
                <div className="flex gap-3">
                  <button disabled={isDeleting} onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-2.5 bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600 rounded-lg transition-all hover:bg-slate-100 cursor-pointer disabled:opacity-50">Ləğv et</button>
                  <button disabled={isDeleting} onClick={handleDelete} className="flex-1 py-2.5 bg-rose-600 text-xs font-bold text-white rounded-lg transition-all hover:bg-rose-700 cursor-pointer flex items-center justify-center">
                    {isDeleting ? <Loader2 className="animate-spin" size={16} /> : "Bəli, Sil"}
                  </button>
                </div>
            </div>
          </div>
        )}

        {/* 2. ROLE MANAGEMENT MODAL */}
        {isRoleModalOpen && activeRoleUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsRoleModalOpen(false)} />
            <div className="relative bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden z-10 border border-slate-100 flex flex-col">
              <div className="px-6 pt-6 pb-4 flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 border border-indigo-100">
                    <Shield size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-950 tracking-tight">Səlahiyyət İdarə Paneli</h3>
                    <p className="text-xs font-semibold text-indigo-600 opacity-80">{activeRoleUser.fullName}</p>
                  </div>
                </div>
                <button onClick={() => setIsRoleModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg transition-all cursor-pointer">
                  <X size={16} />
                </button>
              </div>

              <hr className="border-slate-100 mx-6" />

              <div className="p-6 space-y-5">
                <div className="space-y-2">
                  <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Aktiv Rollar ({activeRoleUser.roles?.length || 0})</h4>
                  {activeRoleUser.roles && activeRoleUser.roles.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {activeRoleUser.roles.map((role, idx) => (
                        <div 
                          key={idx} 
                          className={`flex items-center gap-1.5 pl-2.5 pr-1 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wider transition-all ${getRoleStyle(role)}`}
                        >
                          <span>{role}</span>
                          <button
                            disabled={roleActionLoading === `remove-${role}`}
                            onClick={() => handleRemoveRole(role)}
                            className="p-0.5 hover:bg-white/80 rounded text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                            title="Rolu Sil"
                          >
                            {roleActionLoading === `remove-${role}` ? (
                              <Loader2 size={10} className="animate-spin" />
                            ) : (
                              <X size={10} />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 bg-slate-50 rounded-lg border border-dashed border-slate-200 text-center text-xs text-slate-400 font-medium italic">
                      Bu istifadəçiyə hələ heç bir rol təyin edilməyib.
                    </div>
                  )}
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Yeni Rol Əlavə Et</h4>
                  <div className="flex gap-2">
                    <select 
                      className="flex-1 bg-slate-50 border border-slate-200 text-xs font-bold py-2.5 px-3 rounded-lg outline-none focus:border-indigo-500 focus:bg-white transition-all appearance-none cursor-pointer"
                      value={selectedRoleForAssign}
                      onChange={(e) => setSelectedRoleForAssign(e.target.value)}
                    >
                      <option value="">Siyahıdan bir rol seçin...</option>
                      {availableRoles
                        .filter(role => !activeRoleUser.roles?.includes(role.name))
                        .map(role => (
                          <option key={role.id} value={role.name}>{role.name}</option>
                      ))}
                    </select>
                    <button 
                      disabled={roleActionLoading === 'assign' || !selectedRoleForAssign}
                      onClick={handleAssignRole}
                      className="px-4 bg-slate-900 text-white font-bold text-xs rounded-lg hover:bg-slate-800 disabled:opacity-40 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      {roleActionLoading === 'assign' ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <>
                          <UserPlus size={14} />
                          <span>Əlavə Et</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TOP PANEL: HEADER & SEARCH */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="h-6 w-1 bg-slate-900 rounded-full"></span>
                <h1 className="text-xl font-extrabold tracking-tight uppercase flex items-center gap-2">
                  User Authority Control
                </h1>
              </div>
              <p className="text-slate-400 text-xs font-medium pl-3.5">İstifadəçilərin status tənzimlənməsi və sistem rollarının idarə edilməsi</p>
            </div>

            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all"
                placeholder="İstifadəçi axtarışı (Ad və ya İstifadəçi adı)..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              />
            </div>
        </div>

        {/* METRICS / ANALYTICS CARDS (EKRANI DOLĞUN GÖSTƏRƏN HİSSƏ) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cəmi İstifadəçi</p>
              <h3 className="text-2xl font-black text-slate-900">{response?.totalCount || 0}</h3>
            </div>
            <div className="w-12 h-12 bg-slate-50 text-slate-700 rounded-xl flex items-center justify-center border border-slate-200">
              <Users size={20} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Aktiv Hesablar</p>
              <h3 className="text-2xl font-black text-emerald-600">
                {response?.items.filter(u => u.isActive).length || 0} <span className="text-xs text-slate-400 font-medium">/ səhifə</span>
              </h3>
            </div>
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center border border-emerald-100">
              <UserCheck size={20} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">İnzibatçılar (Admin)</p>
              <h3 className="text-2xl font-black text-rose-600">
                {response?.items.filter(u => u.roles?.some(r => r.toLowerCase() === 'admin')).length || 0} <span className="text-xs text-slate-400 font-medium">/ səhifə</span>
              </h3>
            </div>
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center border border-rose-100">
              <ShieldAlert size={20} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Axtarış Statusu</p>
              <h3 className="text-xs font-bold text-slate-700 truncate max-w-[150px]">
                {search ? `"${search}" üzrə` : "Filtr yoxdur"}
              </h3>
            </div>
            <div className="w-12 h-12 bg-slate-50 text-slate-500 rounded-xl flex items-center justify-center border border-slate-200">
              <Filter size={20} />
            </div>
          </div>
        </div>

        {/* MAIN DATA TABLE */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">User Profile</th>
                    <th className="px-6 py-4.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Active Roles</th>
                    <th className="px-6 py-4.5 text-right text-[11px] font-bold text-slate-500 uppercase tracking-wider pr-8">Management</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                     [...Array(5)].map((_, i) => (
                       <tr key={i} className="h-20 bg-white">
                         <td colSpan={3} className="px-6 py-4 text-center">
                           <Loader2 size={22} className="animate-spin mx-auto text-slate-400 opacity-60" />
                         </td>
                       </tr>
                     ))
                  ) : response?.items && response.items.length > 0 ? (
                    response.items.map((user: User) => (
                      <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                        {/* User Profile */}
                        <td className="px-6 py-4.5">
                          <div className="flex items-center gap-3.5">
                            <div className="relative shrink-0">
                              <div className="h-10 w-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs border border-slate-800 shadow-sm">
                                {user.fullName ? user.fullName[0].toUpperCase() : "?"}
                              </div>
                              <span className={`absolute -bottom-1 -right-1 flex h-3 w-3 rounded-full border-2 border-white ${user.isActive ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                                {user.isActive && (
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                )}
                              </span>
                            </div>
                            <div className="flex flex-col min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">{user.fullName}</span>
                                <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider shadow-sm border ${user.isActive ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                                  {user.isActive ? 'Active' : 'Inactive'}
                                </span>
                              </div>
                              <span className="text-[11px] font-medium text-slate-400 mt-0.5">@{user.userName}</span>
                            </div>
                          </div>
                        </td>
                        
                        {/* Active Roles */}
                        <td className="px-6 py-4.5">
                          <div className="flex flex-wrap gap-1.5 max-w-md">
                            {user.roles && user.roles.length > 0 ? (
                              user.roles.map((role, idx) => (
                                <span key={idx} className={`px-2.5 py-0.5 rounded border text-[9px] font-extrabold uppercase tracking-wider shadow-sm ${getRoleStyle(role)}`}>
                                  {role}
                                </span>
                              ))
                            ) : (
                              <span className="text-xs text-slate-400 font-medium italic">Rol təyin edilməyib</span>
                            )}
                          </div>
                        </td>

                        {/* Management Actions */}
                        <td className="px-6 py-4.5 text-right pr-8">
                          <div className="flex justify-end items-center gap-3">
                            
                            {/* CUSTOM TOGGLE / SWITCH COMPONENT */}
                            <div className="flex items-center" title={user.isActive ? "Deaktiv et" : "Aktiv et"}>
                              {activeToggleLoadingId === user.id ? (
                                <Loader2 size={14} className="animate-spin text-indigo-500 mx-2" />
                              ) : (
                                <button
                                  onClick={() => handleToggleActive(user.id)}
                                  disabled={activeToggleLoadingId !== null}
                                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors outline-none duration-300 cursor-pointer ${
                                    user.isActive ? "bg-emerald-500" : "bg-slate-200"
                                  }`}
                                >
                                  <span
                                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-300 ${
                                      user.isActive ? "translate-x-5" : "translate-x-1"
                                    }`}
                                  />
                                </button>
                              )}
                            </div>

                            <div className="h-4 w-[1px] bg-slate-200" />

                            {/* Rol Tənzimləmə Düyməsi */}
                            <button 
                              onClick={() => { setActiveRoleUser(user); setIsRoleModalOpen(true); }}
                              className="p-2 bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 rounded-lg shadow-sm transition-all cursor-pointer"
                              title="Rolları İdarə Et"
                            >
                              <Settings2 size={16} />
                            </button>
                            
                            {/* Detallara Baxış */}
                            <Link href={`/admin/users/${user.id}`} className="p-2 bg-white border border-slate-200 text-slate-400 hover:text-emerald-600 hover:border-emerald-100 rounded-lg shadow-sm transition-all" title="Profilə bax">
                              <Eye size={16} />
                            </Link>

                            {/* Silmə Düyməsi */}
                            <button onClick={() => { setUserToDelete(user); setIsDeleteModalOpen(true); }} className="p-2 bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-100 rounded-lg shadow-sm transition-all cursor-pointer" title="İstifadəçini Sil">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-6 py-16 text-center text-sm font-semibold text-slate-400 italic bg-slate-50/30">
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <Users size={32} className="text-slate-300" />
                          <span>Sistemdə heç bir istifadəçi tapılmadı.</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
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

export default AdminUsers