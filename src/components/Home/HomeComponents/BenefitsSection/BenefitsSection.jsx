"use client";

import { motion } from "framer-motion";

export default function BenefitsSection() {
    // Framer Motion variants for staggered animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    const benefits = [
        {
            title: "Global Reach",
            description: "Expand your business worldwide. Sell to customers anywhere, at any time without borders.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
            ),
        },
        {
            title: "Zero Hidden Fees",
            description: "Keep more of your hard-earned money. We believe in 100% transparent pricing from day one.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
            ),
        },
        {
            title: "Lightning Fast Payouts",
            description: "No more waiting weeks for your funds. Get paid instantly when a customer completes an order.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                </svg>
            ),
        },
        {
            title: "24/7 Expert Support",
            description: "Run into an issue? Our dedicated team of experts is available around the clock to help you succeed.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                </svg>
            ),
        },
    ];

    return (
        <section className="relative w-full overflow-hidden bg-background py-20 lg:py-32">
            
            {/* --- Beautiful SVG Background Elements --- */}
            <div className="absolute inset-0 z-0 opacity-[0.05]">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid-pattern-benefits" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-pattern-benefits)" />
                </svg>
            </div>

            {/* Glowing Blobs */}
            <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
                className="absolute top-[10%] right-[-10%] w-[25rem] h-[25rem] bg-yellow-400/20 rounded-full blur-3xl z-0 pointer-events-none"
            />
            <motion.div 
                animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
                transition={{ repeat: Infinity, duration: 11, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-[-10%] left-[-5%] w-[30rem] h-[30rem] bg-yellow-500/10 rounded-full blur-3xl z-0 pointer-events-none"
            />
            {/* ----------------------------------------------- */}

            <motion.div 
                className="relative z-10 max-w-7xl mx-auto px-5 md:px-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }} // Triggers animation when scrolled into view
            >
                {/* Section Header */}
                <div className="flex flex-col items-center justify-center text-center mb-16 gap-4">
                    <motion.h2 
                        variants={itemVariants}
                        className="lg:text-5xl md:text-4xl text-3xl font-bold"
                    >
                        Why Sell on Our{" "}
                        <span className="text-yellow-300 relative inline-block">
                            Platform?
                            {/* Decorative underline SVG */}
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-yellow-500" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 15 100 5" fill="none" stroke="currentColor" strokeWidth="3" />
                            </svg>
                        </span>
                    </motion.h2>
                    <motion.p 
                        variants={itemVariants}
                        className="text-lg text-gray-500 max-w-2xl"
                    >
                        Everything you need to manage your business, reach new customers, and scale your revenue effortlessly.
                    </motion.p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            className="flex flex-col items-start p-8 rounded-2xl border border-foreground/10 bg-background/50 backdrop-blur-md shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 cursor-default group"
                        >
                            {/* Icon Wrapper */}
                            <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-500 mb-6 group-hover:scale-110 group-hover:bg-yellow-500 group-hover:text-background transition-all duration-300">
                                {benefit.icon}
                            </div>
                            
                            <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}