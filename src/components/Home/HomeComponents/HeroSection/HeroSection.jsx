export default function HeroSection() {
    return (
        <>

            <div className="grid grid-cols-1 md:grid-cols-2 p-5 lg:p-40 lg:pt-10 gap-10 bg-background/10 text-foreground  ">
                <div className="grid grid-cols-1 py-5 gap-6 ">
                    <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold ">
                        Sell Your Products Online in Minutes 🚀
                    </h1>
                    <p className="text-lg text-gray-600 text-justify">
                        Launch your own online store with our powerful and easy-to-use platform.
                        No technical skills required. Start selling, manage orders, and grow your business — all in one place.
                    </p>

                    <div className="grid grid-cols-2 gap-2">
                        <button className="border border-foreground cursor-pointer  p-4 rounded bg-yellow-500 text-background font-bold">
                            Get Started
                        </button>
                        <button className="border  border-foreground cursor-pointer font-bold rounded hover:text-background hover:bg-foreground p-4">
                            Learn More
                        </button>
                    </div>

                    <div className="hidden md:flex  md:items-center flex-col md:flex-row gap-6 pt-4 text-sm text-gray-500">
                        <span>✔ No coding required</span>
                        <span>✔ Free setup</span>
                        <span>✔ Secure payments</span>
                    </div>
                </div>
                <div className=" flex items-center justify-center">
                    <img src="/HomeheroSection.png" alt="Hero Image" className="w-full h-auto" />
                </div>

            </div>
        </>
    )
}