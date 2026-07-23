"use client";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { X, Loader2 } from "lucide-react";

export default function Signup({ handleClose, setPage }) {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = (data) => {
        let errs = {};
        if (!data.name || data.name.trim().length < 3) errs.name = "Name must be at least 3 characters.";
        if (!data.mobile || !/^[0-9]{10}$/.test(data.mobile)) errs.mobile = "Mobile must be a valid 10-digit number.";
        if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) errs.email = "Please enter a valid email address.";
        if (!data.password || data.password.length < 8) errs.password = "Password must be at least 8 characters.";
        return errs;
    };

    const handlesubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name'),
            mobile: formData.get('mobile'),
            email: formData.get('email'),
            password: formData.get('password')
        };

        const validationErrors = validate(data);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setLoading(true);
        // Simulate API call
        setTimeout(() => setLoading(false), 1000);
    }

    return (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 py-10 sm:p-6">
                <div className="w-full max-w-md bg-background rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-lg p-5 sm:p-8 relative mx-auto transition-all duration-300">
                    
                    <button 
                        onClick={handleClose}
                        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 dark:focus:ring-zinc-300"
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </button>

                    <div className="flex flex-col space-y-1.5 text-center mb-6 mt-2">
                        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                            Create an account
                        </h1>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                            Enter your details below to create your account
                        </p>
                    </div>

                    <form onSubmit={handlesubmit} className="space-y-4">
                        <div className="space-y-2 text-left">
                            <label className="text-sm font-medium leading-none text-foreground">Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="Enter your name"
                                className={`flex h-10 w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800'} bg-background px-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus-visible:ring-zinc-300 transition-colors`}
                            />
                            {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
                        </div>

                        <div className="space-y-2 text-left">
                            <label className="text-sm font-medium leading-none text-foreground">Mobile</label>
                            <input
                                type="text"
                                name="mobile"
                                required
                                placeholder="Enter mobile number"
                                className={`flex h-10 w-full rounded-md border ${errors.mobile ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800'} bg-background px-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus-visible:ring-zinc-300 transition-colors`}
                            />
                            {errors.mobile && <span className="text-red-500 text-xs">{errors.mobile}</span>}
                        </div>

                        <div className="space-y-2 text-left">
                            <label className="text-sm font-medium leading-none text-foreground">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="name@example.com"
                                className={`flex h-10 w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800'} bg-background px-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus-visible:ring-zinc-300 transition-colors`}
                            />
                            {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                        </div>

                        <div className="space-y-2 text-left">
                            <label className="text-sm font-medium leading-none text-foreground">Password</label>
                            <input
                                type="password"
                                name="password"
                                required
                                placeholder="Create a password"
                                className={`flex h-10 w-full rounded-md border ${errors.password ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800'} bg-background px-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus-visible:ring-zinc-300 transition-colors`}
                            />
                            {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 h-10 px-4 py-2 w-full"
                            >
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {loading ? "Submitting..." : "Sign Up"}
                            </button>
                        </div>

                        <div className="relative flex items-center my-4">
                            <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
                            <span className="mx-3 text-xs text-zinc-500 uppercase">OR CONTINUE WITH</span>
                            <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
                        </div>

                        <button
                            type="button"
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-zinc-200 dark:border-zinc-800 bg-background hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 h-10 px-4 py-2 w-full gap-2"
                        >
                            <FaGoogle className="h-4 w-4" />
                            Google
                        </button>

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

                        <div className="text-sm text-center text-zinc-500 dark:text-zinc-400 mt-4">
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={() => setPage('login')}
                                className="font-semibold text-zinc-900 dark:text-zinc-50 hover:underline transition-colors"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}