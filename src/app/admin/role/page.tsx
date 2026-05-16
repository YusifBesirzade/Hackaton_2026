"use client"

import React, { useEffect, useState, useRef } from "react"
import {
  getRoles,
  createRole,
  deleteRole,
  getAllPermissions,
  getRolePermissions,
  addPermissionsToRole,
  removePermissionsFromRole,
  PermissionData,
  RoleItem
} from "../../../services/AdminServices/RoleService"
import { 
  Shield, 
  Plus, 
  Trash2, 
  Eye, 
  ShieldCheck, 
  ShieldPlus,
  ChevronDown, 
  X, 
  Loader2,
  Folder,
  Lock,
  Server,
  Fingerprint
} from "lucide-react"

type Role = {
  id: string
  name: string
}

const RolesPage = () => {
  const [roles, setRoles] = useState<Role[]>([])
  const [permissionGroups, setPermissionGroups] = useState<PermissionData>({ Products: [], Users: [], Roles: [] })
  
  const [loading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const [permissionLoading, setPermissionLoading] = useState(false)
  
  // View/Manage Permissions Modu üçün state-lər
  const [viewingRoleName, setViewingRoleName] = useState<string | null>(null)
  const [activeRolePermissions, setActiveRolePermissions] = useState<string[]>([])

  // Form States
  const [roleName, setRoleName] = useState("")
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  
  const dropdownRef = useRef<HTMLDivElement>(null)

  // ================= DATA FETCHING =================
  const initPage = async () => {
    try {
      setLoading(true)
      const [rolesData, permsData] = await Promise.all([
        getRoles(),
        getAllPermissions()
      ])
      
      const rolesList = (rolesData as any)?.items || (rolesData as any)?.data || rolesData || []
      setRoles(rolesList)
      setPermissionGroups(permsData)
    } catch (err) {
      console.error("INIT PAGE ERROR:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    initPage()

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // ================= DROPDOWN TOGGLE PERMISSION =================
  const handleTogglePermission = (perm: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    )
  }

  // ================= RESET FORM / BACK TO CREATE =================
  const resetForm = () => {
    setRoleName("")
    setSelectedPermissions([])
    setViewingRoleName(null)
    setActiveRolePermissions([])
    setIsDropdownOpen(false)
  }

  // ================= VIEW ROLE PERMISSIONS (VIEW MODE) =================
  const handleViewPermissionsClick = async (role: Role) => {
    if (role.name.toLowerCase() === "admin") return
    try {
      setPermissionLoading(true)
      setViewingRoleName(role.name)
      setSelectedPermissions([]) // dropdown seçimini sıfırlayırıq
      
      const res = await getRolePermissions(role.name)
      const rolePerms: string[] = Array.isArray(res) ? res : (res as any)?.items || (res as any)?.data || []
      
      setActiveRolePermissions(rolePerms)
    } catch (err) {
      console.error("FETCH ROLE PERMISSIONS ERROR:", err)
    } finally {
      setPermissionLoading(false)
    }
  }

  // ================= SINGLE PERMISSION DELETE FROM ROLE =================
  const handleDeletePermissionFromRole = async (permToDelete: string) => {
    if (!viewingRoleName) return
    if (!confirm(`Are you sure you want to remove "${permToDelete}" permission from this role?`)) return

    try {
      setActionLoading(true)
      await removePermissionsFromRole(viewingRoleName, [permToDelete])
      
      // Siyahını dərhal yeniləyirik
      setActiveRolePermissions((prev) => prev.filter((p) => p !== permToDelete))
    } catch (err) {
      console.error("REMOVE PERMISSION ERROR:", err)
    } finally {
      setActionLoading(false)
    }
  }

  // ================= SUBMIT (CREATE ROLE OR ADD PERMISSIONS) =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setActionLoading(true)

      if (viewingRoleName) {
        // Mövcud rola yeni seçilən permission-ları əlavə et (POST /api/Roles/{roleName}/permissions)
        if (selectedPermissions.length > 0) {
          await addPermissionsToRole(viewingRoleName, selectedPermissions)
          
          // Aktiv permission siyahısını yenilə və formu təmizlə
          setActiveRolePermissions((prev) => [...prev, ...selectedPermissions])
          setSelectedPermissions([])
          setIsDropdownOpen(false)
        }
      } else {
        // Tamamilə yeni rol yarat (POST /api/Roles)
        if (!roleName.trim()) return
        const currentName = roleName.trim()
        
        await createRole({ name: currentName })
        
        // Əgər yaradılarkən dropdown-dan permission seçilibsə, onları da göndər
        if (selectedPermissions.length > 0) {
          await addPermissionsToRole(currentName, selectedPermissions)
        }
        
        resetForm()
        await initPage()
      }
    } catch (err) {
      console.error("ROLE SUBMIT ERROR:", err)
    } finally {
      setActionLoading(false)
    }
  }

  // ================= DELETE ROLE =================
  const handleDeleteRole = async (name: string) => {
    if (name.toLowerCase() === "admin") return
    if (!confirm(`Are you sure you want to delete "${name}" role?`)) return
    try {
      setActionLoading(true)
      await deleteRole(name)
      if (viewingRoleName === name) resetForm()
      await initPage()
    } catch (err) {
      console.error("DELETE ROLE ERROR:", err)
    } finally {
      setActionLoading(false)
    }
  }

  return (
    <div className="p-4 md:p-8 lg:p-10 bg-[#F8FAFC] min-h-screen font-sans text-slate-900 selection:bg-slate-200">
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* TOP PANEL / HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="h-6 w-1 bg-slate-900 rounded-full"></span>
              <h1 className="text-xl font-extrabold tracking-tight uppercase flex items-center gap-2">
                <Shield className="w-5 h-5 text-slate-900" />
                Access Control (Roles)
              </h1>
            </div>
            <p className="text-slate-400 text-xs font-medium pl-3.5">
              Sistem üzrə əməliyyat rollarının və dinamik API icazələrinin təyini və idarə edilməsi.
            </p>
          </div>
        </div>

        {/* METRICS / STATS CARDS (EKRANI DOLĞUN GÖSTƏRMƏK ÜÇÜN) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cəmi Rol</p>
              <h3 className="text-2xl font-black text-slate-900">{roles.length}</h3>
            </div>
            <div className="w-12 h-12 bg-slate-50 text-slate-700 rounded-xl flex items-center justify-center border border-slate-200">
              <Server size={20} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">İcazə Qrupları</p>
              <h3 className="text-2xl font-black text-slate-900">{Object.keys(permissionGroups).length} <span className="text-xs text-slate-400 font-medium">modul</span></h3>
            </div>
            <div className="w-12 h-12 bg-slate-50 text-slate-700 rounded-xl flex items-center justify-center border border-slate-200">
              <Folder size={20} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Təhlükəsizlik Statusu</p>
              <h3 className="text-xs font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md w-fit mt-1">
                RBAC Aktivdir
              </h3>
            </div>
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center border border-emerald-100">
              <Fingerprint size={20} />
            </div>
          </div>
        </div>

        {/* MAIN GRID LAYOUT */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
          
          {/* LEFT COLUMN: Dynamic Form / Permissions Management Card */}
          <div className="xl:col-span-1 bg-white p-6 border border-slate-200 rounded-xl shadow-sm h-fit xl:sticky xl:top-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                {viewingRoleName ? <Lock className="w-4 h-4 text-amber-500" /> : <Plus className="w-4 h-4 text-slate-900" />}
                {viewingRoleName ? "Manage Role Permissions" : "Create New Role"}
              </h2>
              {viewingRoleName && (
                <button type="button" onClick={resetForm} className="text-xs font-bold flex items-center gap-1 text-slate-500 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200 transition-all cursor-pointer">
                  <X className="w-3 h-3" /> Back to Create
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Conditional input display based on active Mode */}
              {!viewingRoleName ? (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase ml-0.5">Role Name</label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input value={roleName} placeholder="e.g., Manager" onChange={(e) => setRoleName(e.target.value)} required
                      className="w-full bg-slate-50 border border-slate-200 focus:border-slate-900 focus:bg-white pl-10 pr-3 py-2.5 rounded-lg text-sm font-medium outline-none transition-all" />
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Active Role</span>
                    <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span> {viewingRoleName}
                    </span>
                  </div>
                  
                  {/* Active Permissions List inside the viewing role */}
                  <div className="border-t border-slate-200/80 pt-3 space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Assigned Permissions:</span>
                    {permissionLoading ? (
                      <div className="flex items-center gap-2 text-xs text-slate-400 py-3 justify-center bg-white border border-slate-100 rounded-lg">
                        <Loader2 className="w-4 h-4 animate-spin text-slate-400" /> Fetching permissions...
                      </div>
                    ) : activeRolePermissions.length === 0 ? (
                      <p className="text-xs text-slate-400 italic py-3 text-center bg-white border border-slate-100 rounded-lg">No permissions assigned yet.</p>
                    ) : (
                      <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
                        {activeRolePermissions.map((perm) => (
                          <div key={perm} className="flex items-center justify-between bg-white border border-slate-100 rounded-lg pl-3 pr-1.5 py-1.5 text-xs text-slate-700 hover:border-slate-300 transition-colors">
                            <span className="font-mono text-[11px] text-slate-600 truncate mr-2">{perm}</span>
                            <button type="button" onClick={() => handleDeletePermissionFromRole(perm)} disabled={actionLoading}
                              className="p-1 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-md transition-colors shrink-0 cursor-pointer">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* GROUPED MULTI-SELECT DROPDOWN */}
              <div className="space-y-1.5 relative" ref={dropdownRef}>
                <label className="text-[11px] font-bold text-slate-400 uppercase ml-0.5">
                  {viewingRoleName ? "Grant New Permissions" : "Initial Permissions (Optional)"}
                </label>
                
                <div 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full min-h-[44px] bg-slate-50 border border-slate-200 rounded-lg p-2 flex items-center justify-between gap-2 cursor-pointer text-sm font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-100/50 transition-all"
                >
                  {selectedPermissions.length === 0 ? (
                    <span className="text-slate-400 pl-2 font-medium">Select permissions...</span>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {selectedPermissions.map((p) => (
                        <span key={p} className="inline-flex items-center gap-1 bg-slate-900 text-white text-[11px] font-bold px-2 py-0.5 rounded-md">
                          {p.split(".").pop()}
                          <X className="w-3 h-3 cursor-pointer hover:text-rose-400" onClick={(e) => { e.stopPropagation(); handleTogglePermission(p) }} />
                        </span>
                      ))}
                    </div>
                  )}
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform shrink-0 mr-1 ${isDropdownOpen ? "rotate-180" : ""}`} />
                </div>

                {/* Dropdown Menu Items */}
                {isDropdownOpen && (
                  <div className="absolute left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl max-h-64 overflow-y-auto z-50 p-2 space-y-3">
                    {Object.entries(permissionGroups).map(([groupName, perms]) => {
                      if (!perms || perms.length === 0) return null;
                      return (
                        <div key={groupName} className="space-y-1">
                          <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-2.5 py-1 bg-slate-50 rounded-lg flex items-center gap-1.5">
                            <Folder className="w-3 h-3" /> {groupName}
                          </div>
                          
                          <div className="space-y-0.5 pl-1">
                            {perms.map((perm: string) => {
                              const alreadyHas = activeRolePermissions.includes(perm)
                              const isSelected = selectedPermissions.includes(perm)
                              
                              return (
                                <div
                                  key={perm}
                                  onClick={() => !alreadyHas && handleTogglePermission(perm)}
                                  className={`flex items-center justify-between px-2.5 py-2 text-xs rounded-lg transition-colors ${
                                    alreadyHas ? "opacity-40 cursor-not-allowed bg-slate-50 text-slate-400" :
                                    isSelected ? "bg-slate-900 text-white font-bold cursor-pointer" : "hover:bg-slate-50 text-slate-600 font-medium cursor-pointer"
                                  }`}
                                >
                                  <span className={alreadyHas ? "line-through" : ""}>{perm}</span>
                                  {alreadyHas ? (
                                    <span className="text-[9px] font-bold text-slate-400 bg-slate-200 px-1.5 py-0.5 rounded">Assigned</span>
                                  ) : isSelected ? (
                                    <span className="text-[9px] font-bold bg-white/20 text-white px-1.5 py-0.5 rounded">To Add</span>
                                  ) : null}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              <button type="submit" disabled={actionLoading || (!viewingRoleName && !roleName.trim())}
                className={`w-full text-white font-bold p-3 rounded-lg text-sm transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm cursor-pointer ${
                  viewingRoleName ? "bg-amber-600 hover:bg-amber-700" : "bg-slate-900 hover:bg-slate-800"
                }`}>
                {actionLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : viewingRoleName ? (
                  <ShieldPlus className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                {viewingRoleName ? "Grant Selected Permissions" : "Create Role"}
              </button>
            </form>
          </div>

          {/* RIGHT COLUMN: Roles List Table */}
          <div className="xl:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden h-fit">
            {loading ? (
              <div className="py-28 flex flex-col items-center justify-center gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Fetching roles...</p>
              </div>
            ) : roles.length === 0 ? (
              <div className="py-28 text-center space-y-2">
                <Shield className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-slate-400 text-sm font-medium">Sistemdə qeydiyyatdan keçmiş heç bir rol tapılmadı.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-6 py-4.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Role Name</th>
                      <th className="px-6 py-4.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right pr-8">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {roles.map((r) => {
                      const isAdmin = r.name.toLowerCase() === "admin";
                      const isActive = viewingRoleName === r.name;
                      
                      return (
                        <tr key={r.id || r.name} className={`hover:bg-slate-50/50 transition-colors group ${isActive ? "bg-amber-50/30 hover:bg-amber-50/40" : ""}`}>
                          <td className="px-6 py-4.5">
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-lg font-bold text-xs uppercase shrink-0 flex items-center justify-center border ${
                                isAdmin ? "bg-slate-900 border-slate-900 text-white" : "bg-slate-50 border-slate-200 text-slate-600"
                              }`}>
                                {r.name.substring(0, 2)}
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-slate-900">{r.name}</span>
                                {isAdmin && (
                                  <span className="text-[9px] font-extrabold uppercase tracking-wider bg-slate-900 text-white px-2 py-0.5 rounded-full border border-slate-800 shadow-sm">
                                    System Owner
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4.5 text-right pr-8">
                            <div className="flex items-center justify-end gap-1.5">
                              {isAdmin ? (
                                <span className="flex items-center gap-1 bg-slate-100 text-slate-400 border border-slate-200 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                                  <Lock className="w-3 h-3" /> System Protected
                                </span>
                              ) : (
                                <>
                                  {/* VIEW/MANAGE PERMISSIONS BUTTON */}
                                  <button onClick={() => handleViewPermissionsClick(r)} disabled={actionLoading}
                                    className={`p-2 rounded-lg transition-all cursor-pointer border ${
                                      isActive 
                                        ? "bg-amber-500 border-amber-500 text-white hover:bg-amber-600" 
                                        : "bg-white border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-300 shadow-sm"
                                    }`} 
                                    title="Manage Permissions"
                                  >
                                    <ShieldPlus className="w-4 h-4" />
                                  </button>

                                  {/* DELETE ROLE BUTTON */}
                                  <button onClick={() => handleDeleteRole(r.name)} disabled={actionLoading}
                                    className="p-2 bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 rounded-lg shadow-sm transition-all cursor-pointer" 
                                    title="Delete Role"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default RolesPage