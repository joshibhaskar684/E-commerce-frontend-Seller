"use client";
import { VerifyForSeller } from "@/redux-store/authstore/verify/action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useDispatch } from "react-redux";

export default function Login({ handleClose, setPage }) {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const router=useRouter();   
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

        } finally {
            setLoading(false);
          window.location.reload();
        }
    }


    
    return (
        <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
            <div className="flex min-h-full items-start sm:items-center justify-center p-4">
                <div className="bg-foreground w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-8 transition-all duration-300">

                    <h1 className="text-background text-2xl sm:text-3xl font-bold text-center mb-6">
                        Verify Email
                    </h1>

                    <form onSubmit={handlesubmit} className="flex flex-col gap-4 w-full">

                        <div className="flex flex-col gap-1">
                            <label className="text-background text-sm">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="Enter your email"
                                className="px-4 py-2 rounded-lg border border-background/40 bg-transparent text-background focus:outline-none focus:ring-2 focus:ring-yellow transition"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-background text-sm">Password</label>
                            <input
                                type="password"
                                name="password"
                                required
                                placeholder="Enter your password"
                                className="px-4 py-2 rounded-lg border border-background/40 bg-transparent text-background focus:outline-none focus:ring-2 focus:ring-yellow transition"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                            <button
                                type="submit"
                                className="py-2 cursor-pointer rounded-lg border border-yellow-200 bg-yellow-500 text-foreground font-semibold hover:opacity-90 transition"
                            >
                                {loading ? "Submitting..." : "Submit"}
                            </button>

                            <button
                                type="button"
                                onClick={() => handleClose()}
                                className="py-2 rounded-lg border cursor-pointer border-background text-background hover:bg-background hover:text-foreground transition"
                            >
                                Close
                            </button>
                        </div>




                        <p className="text-xs text-background/70 text-center mt-4 ">
                            By clicking, you agree to our<a href="/legal/terms" className=" text-yellow-400 cursor-pointer hover:underline"> terms & conditions </a>  and <a className=" text-yellow-400 cursor-pointer hover:underline" href="legal/privacy">privacy policy</a>
                        </p>



                    </form>

                </div>
            </div>
        </div>
    );
}

