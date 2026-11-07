"use client";
import { LoginSeller } from "@/redux-store/authstore/seller/action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AlertCircle, Loader2 } from "lucide-react";

export default function Page({ handleClose, setPage }) {
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");
    const router = useRouter();
    const dispatch = useDispatch();

    const handlesubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        setLoading(true);
        setServerError("");

        try {
            const res = await dispatch(LoginSeller(data));
            if (res?.success) {
                router.push("/seller");
            } else if (res?.error) {
                setServerError(res.error);
            }
        } catch (e) {
            setServerError("Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="bg-background/70 w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-8 transition-all duration-300 border">
                    <h1 className="text-foreground text-2xl sm:text-3xl font-bold text-center mb-6">
                        Seller Login
                    </h1>

                    {serverError && (
                        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                            <span>{serverError}</span>
                        </div>
                    )}

                    <form onSubmit={handlesubmit} className="flex flex-col gap-4 w-full">
                        <div className="flex flex-col gap-1">
                            <label className="text-foreground text-sm">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="Enter your email"
                                className="px-4 py-2 rounded-lg border border-foreground/40 bg-transparent text-foreground focus:outline-none focus:ring-2 focus:ring-yellow transition"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-foreground text-sm">Password</label>
                            <input
                                type="password"
                                name="password"
                                required
                                placeholder="Enter your password"
                                className="px-4 py-2 rounded-lg border border-foreground/40 bg-transparent text-foreground focus:outline-none focus:ring-2 focus:ring-yellow transition"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className={loading ? "py-2 cursor-pointer rounded-lg border border-yellow-200 bg-yellow-500 text-foreground font-semibold opacity-50 transition flex items-center justify-center gap-2" : "py-2 cursor-pointer rounded-lg border border-yellow-200 bg-yellow-500 text-foreground font-semibold hover:opacity-90 transition"}
                            >
                                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                                {loading ? "Signing in..." : "Submit"}
                            </button>

                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="py-2 rounded-lg border cursor-pointer border-foreground text-foreground hover:bg-background hover:text-foreground transition"
                            >
                                Back
                            </button>
                        </div>

                        <p className="text-xs text-foreground/70 text-center mt-4">
                            By clicking, you agree to our <a href="/legal/terms" className="text-yellow-400 cursor-pointer hover:underline">terms & conditions</a> and <a className="text-yellow-400 cursor-pointer hover:underline" href="/legal/privacy">privacy policy</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
