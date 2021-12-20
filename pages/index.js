import Link from "next/link";

function Home() {
    return (
        <>
            <section className="bg-white h-screen">
                <div className="flex flex-col h-screen overflow-hidden bg-gray-900 pattern">
                    <div className="container flex items-center flex-1 px-6 py-8 mx-auto lg:py-0">
                        <div className="max-w-3xl mx-auto text-center text-white">
                            <h1 className="text-2xl font-semibold leading-relaxed text-white lg:text-5xl">
                                Hexaa!!!
                            </h1>
                            <p className="mt-4 text-gray-300 lg:mt-6 lg:text-xl">
                                This is Hexa.
                            </p>
                            <div className="grid grid-cols-1 gap-3 mt-8 text-center sm:flex sm:justify-center sm:gap-0 sm:space-x-4">
                                <Link href="/app">
                                    <a className="px-4 py-3 text-sm font-semibold text-gray-300 bg-gray-800 capitalize rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-gray-600">
                                        Use Hexa 🤘🏾
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
