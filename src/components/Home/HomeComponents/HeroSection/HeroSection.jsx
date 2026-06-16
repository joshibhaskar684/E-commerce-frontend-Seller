"use client"; // Required if you are using Next.js App Router

import { motion } from "framer-motion";

export default function HeroSection() {
    // Framer Motion variants for staggered animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        // Added relative positioning and overflow-hidden for the background elements
        <section className="relative w-full overflow-hidden bg-background">
            
            {/* --- Beautiful SVG & UX Background Elements --- */}
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-10">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                </svg>
            </div>

            {/* Glowing Blobs (Animated) */}
            <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-yellow-300/40 rounded-full blur-3xl z-0 pointer-events-none"
            />
            <motion.div 
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[-10%] right-[-5%] w-[30rem] h-[30rem] bg-yellow-500/20 rounded-full blur-3xl z-0 pointer-events-none"
            />
            {/* ----------------------------------------------- */}

            {/* Main Content (Wrapped in motion.div for staggering) */}
            <motion.div 
                className="relative z-10 grid grid-cols-1 p-5 gap-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="grid grid-cols-1 place-items-center gap-10 md:p-5 lg:p-20">
                    <motion.h1 
                        variants={itemVariants}
                        className="lg:text-6xl md:text-5xl text-4xl font-bold text-center"
                    >
                        Sell Your Products Online in{" "}
                        <span className="text-yellow-300 relative inline-block">
                            Minutes
                            {/* Decorative underline SVG */}
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-yellow-500" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 15 100 5" fill="none" stroke="currentColor" strokeWidth="3" />
                            </svg>
                        </span>
                    </motion.h1>
                    
                    <motion.p 
                        variants={itemVariants}
                        className="text-lg text-gray-600 w-full text-center max-w-2xl"
                    >
                        Launch your own online store with our powerful and easy-to-use platform.
                        No technical skills required. Start selling, manage orders, and grow your business — all in one place.
                    </motion.p>

                    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:w-1/3">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center gap-2 border border-foreground cursor-pointer p-4 rounded bg-yellow-500 text-background font-bold shadow-lg hover:shadow-yellow-500/50 transition-shadow"
                        >
                            Get Started
                            {/* Arrow Right SVG UX Element */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </motion.button>
                        
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center gap-2 border border-foreground cursor-pointer font-bold rounded hover:text-background hover:bg-foreground p-4 transition-colors"
                        >
                            Learn More
                        </motion.button>
                    </motion.div>

                    <motion.div 
                        variants={itemVariants}
                        className="hidden md:flex md:items-center flex-col md:flex-row gap-6 pt-4 text-sm text-gray-500"
                    >
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            No coding required
                        </span>
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            Free setup
                        </span>
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            Secure payments
                        </span>
                    </motion.div>
                </div>
                
                <motion.div 
                    variants={itemVariants}
                    className="grid grid-cols-1 place-items-center md:p-5"
                >
                    {/* Added a floating animation to the hero image */}
                    <motion.img 
                        animate={{ y: [0, -15, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        src="/HomeheroSection.png" 
                        alt="Hero Image" 
                        className="w-full h-auto lg:h-screen border rounded-xl border-2 shadow-2xl z-10 relative bg-background/50 backdrop-blur-sm" 
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}