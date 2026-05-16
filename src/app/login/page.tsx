"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import { KeyRound, Mail, Sparkles } from "lucide-react";

import {
    loginUser,
    googleLogin,
} from "@/services/AuthServices/AuthServices";

const Page = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // save user + redirect
    const saveUserAndRedirect = (userData: any) => {
        localStorage.setItem("accessToken", userData.accessToken);
        localStorage.setItem("refreshToken", userData.refreshToken);
        localStorage.setItem("user", JSON.stringify(userData));

        const role = userData.roles?.[0];

        if (role === "Admin" || role === "SuperAdmin") {
            router.push("/admin");
        } else if (role === "Teacher") {
            router.push("/teacher");
        } else if (role === "Client" || role === "Student") {
            router.push("/student");
        } else {
            router.push("/");
        }
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await loginUser(formData);
            console.log("LOGIN RESPONSE:", response);

            if (response.succeeded) {
                console.log("USER DATA:", response.data);
                saveUserAndRedirect(response.data);
            } else {
                setError(response.message || "Login xətası");
            }
        } catch (err: any) {
            console.log("LOGIN ERROR:", err);
            setError(
                err?.response?.data?.message ||
                "Email və ya şifrə yanlışdır"
            );
        } finally {
            setLoading(false);
        }
    };

    // GOOGLE LOGIN
    const handleGoogleSuccess = async (credentialResponse: any) => {
        try {
            const idToken = credentialResponse.credential;
            const response = await googleLogin({ idToken });

            if (response.succeeded) {
                saveUserAndRedirect(response.data);
            } else {
                setError("Google login uğursuz oldu");
            }
        } catch (error) {
            setError("Google login xətası");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 antialiased px-4">
            <div className="w-full max-w-[400px] p-8 rounded-lg border border-slate-200/80 bg-white shadow-sm space-y-6 transition-all duration-300">
                
                {/* Header Section */}
                <div className="text-center space-y-2">
                 
                  <h1 className="text-2xl font-black tracking-tight text-slate-950">
                      Xoş gəlmisiniz
                  </h1>
                  <p className="text-xs text-slate-400 font-medium">
                      Hesabınıza daxil olaraq davam edin
                  </p>
                </div>

                {/* FORM */}
                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email Input Group */}
                    <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                            Email ünvanı
                        </label>
                        <div className="relative flex items-center">
                            <Mail className="absolute left-3 w-4 h-4 text-slate-400" />
                            <input
                                type="email"
                                name="email"
                                placeholder="name@domain.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border border-slate-200 pl-10 pr-3 py-2.5 text-sm rounded-lg bg-slate-50/30 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium text-slate-800"
                            />
                        </div>
                    </div>

                    {/* Password Input Group */}
                    <div className="space-y-1">
                        <div className="flex justify-between items-center">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                                Şifrə
                            </label>
                            <span
                                onClick={() => router.push("/forgot-password")}
                                className="text-[11px] font-bold text-indigo-600 cursor-pointer hover:text-indigo-700 hover:underline transition-colors"
                            >
                                Şifrəni unutmusunuz?
                            </span>
                        </div>
                        <div className="relative flex items-center">
                            <KeyRound className="absolute left-3 w-4 h-4 text-slate-400" />
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full border border-slate-200 pl-10 pr-3 py-2.5 text-sm rounded-lg bg-slate-50/30 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium text-slate-800"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 bg-[#5c85ee] hover:bg-[#4b74dd] disabled:bg-slate-300 text-white py-2.5 text-sm font-bold rounded-lg shadow-sm shadow-blue-100 hover:shadow-md transition-all flex items-center justify-center cursor-pointer"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Yüklənir...
                            </span>
                        ) : (
                            "Daxil ol"
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="relative flex items-center justify-center my-2">
                    <div className="w-full border-t border-slate-100" />
                    <span className="absolute bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        və ya
                    </span>
                </div>

                {/* GOOGLE LOGIN */}
                <div className="flex justify-center w-full transform hover:scale-[1.01] transition-transform">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => setError("Google login failed")}
                        theme="outline"
                        size="large"
                        shape="square"
                        width="336"
                    />
                </div>

                {/* ERROR FEEDBACK */}
                {error && (
                    <div className="p-3 bg-rose-50 border border-rose-100 rounded-lg text-rose-600 text-xs font-semibold text-center animate-fade-in">
                        {error}
                    </div>
                )}

                {/* REGISTER REDIRECT */}
                <p className="text-center text-xs font-semibold text-slate-400 pt-2">
                    Hesabınız yoxdur?{" "}
                    <span
                        onClick={() => router.push("/register")}
                        className="text-indigo-600 cursor-pointer hover:text-indigo-700 hover:underline transition-colors font-bold ml-0.5"
                    >
                        Qeydiyyatdan keçin
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Page;