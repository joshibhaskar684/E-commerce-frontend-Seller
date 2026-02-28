export default function HeroSection() {
    return (
        <>

            <div className=" grid grid-cols-1  p-5 gap-10 ">
                <div className=" grid grid-cols-1  place-items-center gap-10 md:p-5 lg:p-20">
                    <h1 className="lg:text-6xl md:text-5xl text-4xl font-bold ">
                        Sell Your Products Online in{" "}
                        <span className="text-yellow-300">Minutes</span>
                    </h1>
                    <p className="text-lg text-gray-600 text-justify">
                        Launch your own online store with our powerful and easy-to-use platform.
                        No technical skills required. Start selling, manage orders, and grow your business — all in one place.
                    </p>

                    <div className="grid grid-cols-1  md:grid-cols-2 gap-2  w-full md:w-1/3">
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
                <div className=" grid grid-cols-1 place-items-center md:p-5 ">
                    <img src="/HomeheroSection.png" alt="Hero Image" className="w-full h-auto md:h-screen border rounded border-2 " />

                </div>
            </div>


        </>
    )
}