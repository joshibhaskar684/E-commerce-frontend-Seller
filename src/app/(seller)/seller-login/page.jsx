"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

export default function page({ handleClose, setPage }) {
    const [loading, setLoading] = useState(false);
    const router=useRouter();


    const handlesubmit = (e) => {
        e.preventDefault();
        console.log("ghhghgfhf")
        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name'),
            mobile: formData.get('mobile'),
            email: formData.get('email'),
            password: formData.get('password')
        }
        if(data.email=="joshibhaskar684@gmail.com"&&data.password==="admin123"){
            Cookies.set("sellerToken", "2434");
        }
        router.push("/seller");
    }

    return (
        <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
    <div className="flex min-h-full items-center justify-center p-4">
            <div className="bg-background/70 w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-8 transition-all duration-300 border">

                <h1 className="text-foreground text-2xl sm:text-3xl font-bold text-center mb-6">
                    Login
                </h1>

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
                            className="py-2 cursor-pointer rounded-lg border border-yellow-200 bg-yellow-500 text-foreground font-semibold hover:opacity-90 transition"
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </button>

                        <button
                            type="button"
                            // onClick={() => handleClose()}
                            className="py-2 rounded-lg border cursor-pointer border-foreground text-foreground hover:bg-background hover:text-foreground transition"
                        >
                           Back
                        </button>
                    </div>
{/* 
                    <div className="relative flex items-center my-4">
                        <div className="flex-grow border-t border-background/30"></div>
                        <span className="mx-3 text-background text-sm">OR</span>
                        <div className="flex-grow border-t border-background/30"></div>
                    </div> */}

                    {/* <button
                        type="button"
                        className="py-2 cursor-pointer rounded-lg border border-background text-background flex items-center justify-center gap-2 hover:bg-background hover:text-foreground transition"
                    >
                        <FaGoogle />
                        Continue with Google
                    </button> */}
                     <p className="text-xs text-foreground/70 text-center mt-4 ">
                        By clicking, you agree to our<a href="/legal/term" className=" text-yellow-400 cursor-pointer hover:underline"> terms & conditions </a>  and <a className=" text-yellow-400 cursor-pointer hover:underline" href="legal/privacy">privacy policy</a>
                    </p>

                    {/* <p className="text-sm text-background text-center">
                        Create New Account?{" "}
                        <a
                          href="/register"
                            className="text-yellow-400 cursor-pointer hover:underline"
                        >
                            Create Account
                        </a>
                    </p> */}

                </form>

            </div>
        </div>
        </div>
    );
}
