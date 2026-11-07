"use client";
import { VerifyForSeller } from "@/redux-store/authstore/verify/action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Mail, Lock, Loader2, X, AlertCircle, ArrowLeft, Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function Verify({ handleClose, setPage }) {
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const handlesubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        setLoading(true);
        setServerError("");

        try {
            const res = await dispatch(VerifyForSeller(data));
            if (res?.success) {
                if (typeof handleClose === 'function') {
                    handleClose();
                }
                router.push("/register");
            } else if (res?.error) {
                setServerError(res.error);
            }
        } catch (e) {
            setServerError("Verification failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    const isModal = typeof handleClose === 'function';

    const handleBackOrClose = () => {
        if (isModal) {
            handleClose();
        } else {
            router.back();
        }
    };

    const cardContent = (
        <div className="w-full max-w-md bg-background rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl p-6 sm:p-8 relative mx-auto transition-all duration-300">
            {isModal && (
                <button
                    type="button"
                    onClick={handleClose}
                    className="absolute right-4 top-4 p-1.5 rounded-lg text-zinc-400 hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    aria-label="Close"
                >
                    <X className="h-5 w-5" />
                </button>
            )}

            {/* Badge & Header */}
            <div className="flex flex-col items-center text-center mb-6">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500 ring-8 ring-yellow-500/5">
                    <ShieldCheck className="h-6 w-6" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    Verify Seller Email
                </h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-sm">
                    Enter your email and password to verify your identity and start selling.
                </p>
            </div>

            {/* Error Feedback Banner */}
            {serverError && (
                <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm flex items-start gap-2.5 animate-in fade-in duration-200">
                    <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                    <span className="leading-snug">{serverError}</span>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handlesubmit} className="space-y-4">
                {/* Email Field */}
                <div className="flex flex-col gap-1.5 text-left">
                    <label htmlFor="verify-email" className="text-sm font-medium text-foreground">
                        Email Address
                    </label>
                    <div className="relative flex items-center">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
                        <input
                            id="verify-email"
                            type="email"
                            name="email"
                            required
                            placeholder="seller@example.com"
                            className="w-full h-11 pl-10 pr-4 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-background text-foreground text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all shadow-sm"
                        />
                    </div>
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-1.5 text-left">
                    <label htmlFor="verify-password" className="text-sm font-medium text-foreground">
                        Password
                    </label>
                    <div className="relative flex items-center">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
                        <input
                            id="verify-password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            required
                            placeholder="Enter your password"
                            className="w-full h-11 pl-10 pr-11 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-background text-foreground text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all shadow-sm"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-foreground transition-colors p-1"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                </div>

                {/* Actions Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="h-11 px-4 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-zinc-950 font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Verifying...</span>
                            </>
                        ) : (
                            <span>Verify Account</span>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={handleBackOrClose}
                        className="h-11 px-4 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-foreground font-medium text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>{isModal ? "Cancel" : "Back"}</span>
                    </button>
                </div>

                {/* Footer terms */}
                <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center mt-5 leading-relaxed">
                    By clicking continue, you agree to our{" "}
                    <a href="/legal/terms" className="text-yellow-600 dark:text-yellow-400 hover:underline font-medium">
                        Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/legal/privacy" className="text-yellow-600 dark:text-yellow-400 hover:underline font-medium">
                        Privacy Policy
                    </a>.
                </p>
            </form>
        </div>
    );

    if (isModal) {
        return (
            <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 py-10 sm:p-6">
                    {cardContent}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-zinc-50 dark:bg-zinc-950 overflow-y-auto">
            {cardContent}
        </div>
    );
}
