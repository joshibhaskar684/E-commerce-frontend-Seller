"use client";
import { VerifyForSeller } from "@/redux-store/authstore/verify/action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Mail, Lock, Loader2, X } from "lucide-react";

export default function Verify({ handleClose, setPage }) {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    
    const handlesubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            email: formData.get('email'),
            password: formData.get('password')
        }
        setLoading(true);
        try {
            await dispatch(VerifyForSeller(data));
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
            window.location.reload();
        }
    }

    const isModal = typeof handleClose === 'function';

    const content = (
        <div className="w-full max-w-md bg-background rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-lg p-5 sm:p-8 relative mx-auto transition-all duration-300">
            {isModal && (
                <button 
                    onClick={handleClose}
                    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 dark:focus:ring-zinc-300"
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </button>
            )}

            <div className="flex flex-col space-y-1.5 text-center mb-6 mt-2">
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                    Verify Email
                </h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                    Enter your email and password to verify your account
                </p>
            </div>

            <form onSubmit={handlesubmit} className="space-y-4">
                <div className="space-y-2 text-left">
                    <label htmlFor="email" className="text-sm font-medium leading-none text-foreground">
                        Email
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                        <input
                            id="email"
                            type="email"
                            name="email"
                            required
                            placeholder="name@example.com"
                            className="flex h-10 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-background px-3 py-2 pl-10 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus-visible:ring-zinc-300 transition-colors"
                        />
                    </div>
                </div>

                <div className="space-y-2 text-left">
                    <label htmlFor="password" className="text-sm font-medium leading-none text-foreground">
                        Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                        <input
                            id="password"
                            type="password"
                            name="password"
                            required
                            placeholder="Enter your password"
                            className="flex h-10 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-background px-3 py-2 pl-10 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus-visible:ring-zinc-300 transition-colors"
                        />
                    </div>
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 h-10 px-4 py-2 w-full"
                    >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {loading ? "Verifying..." : "Verify Account"}
                    </button>
                    
                    {isModal && (
                        <button
                            type="button"
                            onClick={handleClose}
                            className="mt-3 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-zinc-200 dark:border-zinc-800 bg-background hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 h-10 px-4 py-2 w-full"
                        >
                            Cancel
                        </button>
                    )}
                </div>

                <div className="text-center text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-6 px-2">
                    By clicking continue, you agree to our{" "}
                    <a href="/legal/terms" className="underline underline-offset-4 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
                        Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/legal/privacy" className="underline underline-offset-4 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
                        Privacy Policy
                    </a>
                    .
                </div>
            </form>
        </div>
    );

    if (isModal) {
        return (
            <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 py-10 sm:p-6">
                    {content}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 py-10 bg-zinc-50 dark:bg-zinc-950 overflow-y-auto">
            {content}
        </div>
    );
}
