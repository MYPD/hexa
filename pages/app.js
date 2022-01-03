import React from "react";

let ml5, classifier;
if (typeof window !== "undefined") ml5 = require("ml5");

function App() {
    const videoRef = React.useRef();
    const [start, setStart] = React.useState(false);
    const [result, setResult] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        classifier = ml5.imageClassifier("/model/model.json", () => {
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: false })
                .then((stream) => {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                    setLoaded(true);
                });
        });
    }, []);

    if (classifier && start) {
        classifier.classify(videoRef.current, (error, results) => {
            if (error) {
                console.error(error);
                return;
            }
            setResult(results);
            console.log(results);
        });
    }

    const toggle = () => {
        setStart(!start);
        setResult([]);
    };

    return (
        <>
            <section className="bg-white min-h-screen">
                <div className="flex flex-col min-h-screen overflow-hidden bg-gray-900 p-5">
                    <div className="container flex items-center flex-1 px-6 py-8 mx-auto lg:py-0">
                        <div className="max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                            <div className="image-upload">
                                <video
                                    ref={videoRef}
                                    style={{ transform: "scale(-1, 1)" }}
                                    className="object-cover min-w-full h-80 cursor-pointer"
                                />
                            </div>
                            <div className="py-5 text-center">
                                <div className="mt-3">
                                    {loaded && (
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            onClick={() => toggle()}
                                        >
                                            {start ? "Stop" : "Start"}
                                        </button>
                                    )}
                                </div>
                            </div>

                            {result.length > 0 && (
                                <div className="py-5 px-3 m-auto">
                                    {result.slice(0, 5).map((item) => {
                                        const confidence = Math.floor(
                                            item.confidence * 100
                                        );
                                        return (
                                            <>
                                                <h3 className="py-2 font-semibold text-gray-300">
                                                    Classification Confidence:{" "}
                                                    {item.label}
                                                </h3>
                                                <div className="grid grid-cols-3 gap-4 ">
                                                    <div
                                                        className={[
                                                            "bg-red-500 h-5",
                                                            confidence > 10
                                                                ? "opacity-100"
                                                                : "opacity-50"
                                                        ].join(" ")}
                                                    />
                                                    <div
                                                        className={[
                                                            "bg-yellow-500 h-5",
                                                            confidence > 40
                                                                ? "opacity-100"
                                                                : "opacity-50"
                                                        ].join(" ")}
                                                    />
                                                    <div
                                                        className={[
                                                            "bg-green-500 h-5",
                                                            confidence > 75
                                                                ? "opacity-100"
                                                                : "opacity-50"
                                                        ].join(" ")}
                                                    />
                                                </div>
                                            </>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default App;
