"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { 
  Search, ChevronLeft, ChevronRight, 
  Trash2, AlertTriangle, Loader2, Eye,
  UserPlus, X, Shield, Settings2
} from "lucide-react"

import { 
  getUsers, 
  deleteUser, 
  assignRole, 
  removeRole, 
  toggleUserActive, // İdxal olundu
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
      await fetchUsers(); // Siyahını yeniləyərək yeni statusu əks etdiririk
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
      case 'admin': return 'bg-rose-50 text-rose-600 border-rose-100 ring-rose-500/10';
      case 'teacher': return 'bg-amber-50 text-amber-600 border-amber-100 ring-amber-500/10';
      case 'student': return 'bg-indigo-50 text-indigo-600 border-indigo-100 ring-indigo-500/10';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  }

  return (
    <div className="p-4 md:p-8 lg:p-10 bg-[#FCFCFE] min-h-screen space-y-8 font-sans">
      
      {/* 1. DELETE MODAL */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => !isDeleting && setIsDeleteModalOpen(false)} />
          <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden p-10 text-center z-10">
              <div className="mx-auto w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-6">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Hesabı Sil?</h3>
              <p className="text-slate-500 text-sm mb-8">
                <span className="font-bold text-slate-900">{userToDelete?.fullName}</span> birdəfəlik silinsin?
              </p>
              <div className="flex gap-4">
                <button disabled={isDeleting} onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-3 bg-slate-100 rounded-xl text-sm font-bold text-slate-600 transition-all hover:bg-slate-200">Ləğv et</button>
                <button disabled={isDeleting} onClick={handleDelete} className="flex-1 py-3 bg-rose-500 rounded-xl text-sm font-bold text-white shadow-lg shadow-rose-200 transition-all hover:bg-rose-600">
                  {isDeleting ? <Loader2 className="animate-spin mx-auto" size={18} /> : "Bəli, Sil"}
                </button>
              </div>
          </div>
        </div>
      )}

      {/* 2. ROLE MANAGEMENT MODAL */}
      {isRoleModalOpen && activeRoleUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsRoleModalOpen(false)} />
          <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden z-10 border border-slate-100">
            <div className="px-8 pt-8 pb-4 flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                  <Shield size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">Səlahiyyət İdarə Paneli</h3>
                  <p className="text-xs font-bold text-slate-400">{activeRoleUser.fullName}</p>
                </div>
              </div>
              <button onClick={() => setIsRoleModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all">
                <X size={18} />
              </button>
            </div>

            <hr className="border-slate-100 mx-8" />

            <div className="p-8 space-y-6">
              <div className="space-y-3">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Aktiv Rollar ({activeRoleUser.roles?.length || 0})</h4>
                {activeRoleUser.roles && activeRoleUser.roles.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {activeRoleUser.roles.map((role, idx) => (
                      <div 
                        key={idx} 
                        className={`flex items-center gap-2 pl-3 pr-1.5 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${getRoleStyle(role)}`}
                      >
                        <span>{role}</span>
                        <button
                          disabled={roleActionLoading === `remove-${role}`}
                          onClick={() => handleRemoveRole(role)}
                          className="p-1 hover:bg-white/60 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                          title="Rolu Sil"
                        >
                          {roleActionLoading === `remove-${role}` ? (
                            <Loader2 size={12} className="animate-spin" />
                          ) : (
                            <X size={12} />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 text-center text-xs text-slate-400 font-medium">
                    Bu istifadəçiyə hələ heç bir rol təyin edilməyib.
                  </div>
                )}
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Yeni Rol Əlavə Et</h4>
                <div className="flex gap-2">
                  <select 
                    className="flex-1 bg-slate-50 border border-slate-200 text-xs font-bold py-3 px-4 rounded-xl outline-none focus:border-indigo-500 focus:bg-white transition-all appearance-none"
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
                    className="px-5 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-700 disabled:opacity-30 disabled:hover:bg-indigo-600 transition-all shadow-md shadow-indigo-100 flex items-center gap-2"
                  >
                    {roleActionLoading === 'assign' ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <>
                        <UserPlus size={16} />
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

      {/* HEADER SECTION */}
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight uppercase italic">User Authority Control</h1>
            <p className="text-slate-400 text-xs font-bold tracking-widest">TOTAL DIRECTORY: {response?.totalCount || 0}</p>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-[1.5rem] text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all shadow-sm"
              placeholder="İstifadəçi axtarışı..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
      </div>

      {/* MAIN TABLE */}
      <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-50">
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">User Profile</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Roles</th>
                  <th className="px-8 py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Management</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                   [...Array(5)].map((_, i) => <tr key={i} className="animate-pulse h-24 bg-slate-50/20"></tr>)
                ) : response?.items.map((user: User) => (
                  <tr key={user.id} className="hover:bg-slate-50/30 transition-colors">
                    {/* User Profile (Status Indikatoru İlə) */}
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="h-12 w-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-sm">
                            {user.fullName ? user.fullName[0].toUpperCase() : "?"}
                          </div>
                          {/* Pulsing Status Dot */}
                          <span className={`absolute -bottom-1 -right-1 flex h-3.5 w-3.5 rounded-full border-2 border-white ${user.isActive ? 'bg-emerald-500' : 'bg-slate-400'}`}>
                            {user.isActive && (
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            )}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-black text-slate-800 tracking-tight">{user.fullName}</span>
                            {/* Text Status Badge */}
                            <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider ${user.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                              {user.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          <span className="text-[11px] font-bold text-indigo-500 opacity-70">@{user.userName}</span>
                        </div>
                      </div>
                    </td>
                    
                    {/* Active Roles */}
                    <td className="px-8 py-5">
                      <div className="flex flex-wrap gap-1.5 max-w-[400px]">
                        {user.roles && user.roles.length > 0 ? (
                          user.roles.map((role, idx) => (
                            <span key={idx} className={`px-3 py-1 rounded-lg border text-[9px] font-black uppercase tracking-widest ${getRoleStyle(role)}`}>
                              {role}
                            </span>
                          ))
                        ) : (
                          <span className="text-[11px] text-slate-400 font-medium italic">Rol yoxdur</span>
                        )}
                      </div>
                    </td>

                    {/* Management Actions (Toggle Switch Əlavə Olundu) */}
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end items-center gap-4">
                        
                        {/* CUSTOM TOGGLE / SWITCH COMPONENT */}
                        <div className="flex items-center gap-2" title={user.isActive ? "Deaktiv et" : "Aktiv et"}>
                          {activeToggleLoadingId === user.id ? (
                            <Loader2 size={16} className="animate-spin text-indigo-500 mx-2" />
                          ) : (
                            <button
                              onClick={() => handleToggleActive(user.id)}
                              disabled={activeToggleLoadingId !== null}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors outline-none duration-300 ${
                                user.isActive ? "bg-emerald-500" : "bg-slate-200"
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                                  user.isActive ? "translate-x-6" : "translate-x-1"
                                }`}
                              />
                            </button>
                          )}
                        </div>

                        <div className="h-4 w-[1px] bg-slate-200" /> {/* Seperator */}

                        {/* Rol Tənzimləmə Düyməsi */}
                        <button 
                          onClick={() => { setActiveRoleUser(user); setIsRoleModalOpen(true); }}
                          className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all"
                          title="Rolları İdarə Et"
                        >
                          <Settings2 size={20} />
                        </button>
                        
                        {/* Detallara Baxış */}
                        <Link href={`/admin/users/${user.id}`} className="p-3 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-2xl transition-all" title="Profilə bax">
                          <Eye size={20} />
                        </Link>

                        {/* Silmə Düyməsi */}
                        <button onClick={() => { setUserToDelete(user); setIsDeleteModalOpen(true); }} className="p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all" title="İstifadəçini Sil">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="px-10 py-6 bg-slate-50/30 flex justify-between items-center border-t border-slate-50">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Səhifə {page} / {response?.totalPages || 1}</span>
            <div className="flex gap-2">
              <button disabled={!response?.hasPreviousPage} onClick={() => setPage(p => p - 1)} className="p-2 bg-white border border-slate-200 rounded-xl disabled:opacity-20 transition-all hover:bg-slate-50"><ChevronLeft size={18}/></button>
              <button disabled={!response?.hasNextPage} onClick={() => setPage(p => p + 1)} className="p-2 bg-white border border-slate-200 rounded-xl disabled:opacity-20 transition-all hover:bg-slate-50"><ChevronRight size={18}/></button>
            </div>
          </div>
      </div>
    </div>
  )
}

export default AdminUsers;