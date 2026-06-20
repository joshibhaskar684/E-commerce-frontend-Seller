"use client";

import { motion } from "framer-motion";

export default function FeaturesSection() {
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

    const features = [
        {
            title: "Drag & Drop Builder",
            description: "Design your dream store visually. No coding required. Just drag, drop, and publish in minutes.",
            colSpan: "md:col-span-2", // Spans two columns in the bento grid
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z" />
                </svg>
            ),
        },
        {
            title: "Real-Time Analytics",
            description: "Track sales, monitor visitor behavior, and optimize your conversion rates with live data dashboards.",
            colSpan: "md:col-span-1",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>
            ),
        },
        {
            title: "Smart Inventory",
            description: "Automatically sync stock levels across all your sales channels to prevent overselling.",
            colSpan: "md:col-span-1",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
            ),
        },
        {
            title: "Built-in Marketing Tools",
            description: "Launch email campaigns, offer discount codes, and optimize for SEO straight from your admin panel.",
            colSpan: "md:col-span-2",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
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
                        <pattern id="grid-pattern-features" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-pattern-features)" />
                </svg>
            </div>

            {/* Glowing Blobs (Positioned differently for variety) */}
            <motion.div 
                animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
                transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                className="absolute top-[20%] left-[-5%] w-[35rem] h-[35rem] bg-yellow-400/20 rounded-full blur-[100px] z-0 pointer-events-none"
            />
            <motion.div 
                animate={{ scale: [1, 1.25, 1], opacity: [0.1, 0.25, 0.1] }}
                transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[5%] right-[-10%] w-[25rem] h-[25rem] bg-yellow-600/10 rounded-full blur-[80px] z-0 pointer-events-none"
            />
            {/* ----------------------------------------------- */}

            <motion.div 
                className="relative z-10 max-w-7xl mx-auto px-5 md:px-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* Section Header */}
                <div className="flex flex-col items-center justify-center text-center mb-16 gap-4">
                    <motion.h2 
                        variants={itemVariants}
                        className="lg:text-5xl md:text-4xl text-3xl font-bold"
                    >
                        Powerful{" "}
                        <span className="text-yellow-300 relative inline-block">
                            Features
                            {/* Decorative underline SVG */}
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-yellow-500" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 15 100 5" fill="none" stroke="currentColor" strokeWidth="3" />
                            </svg>
                        </span>
                        {" "}to Scale Fast
                    </motion.h2>
                    <motion.p 
                        variants={itemVariants}
                        className="text-lg text-gray-500 max-w-2xl"
                    >
                        We’ve built all the technical heavy lifting into a seamless interface, so you can focus entirely on growing your brand.
                    </motion.p>
                </div>

                {/* Bento Box Grid for Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -5, scale: 1.01 }}
                            className={`flex flex-col items-start p-8 rounded-3xl border border-foreground/10 bg-background/60 backdrop-blur-xl shadow-lg hover:shadow-yellow-500/10 transition-all duration-300 cursor-default group relative overflow-hidden ${feature.colSpan}`}
                        >
                            {/* Subtle Hover Gradient Background inside the card */}
                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                            
                            {/* Content */}
                            <div className="relative z-10 w-full h-full flex flex-col">
                                {/* Icon Wrapper */}
                                <div className="p-4 rounded-2xl bg-foreground/5 text-foreground mb-6 group-hover:bg-yellow-500 group-hover:text-background transition-colors duration-300 w-fit">
                                    {feature.icon}
                                </div>
                                
                                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-gray-500 text-base leading-relaxed max-w-md">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}