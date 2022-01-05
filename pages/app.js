import axios from "axios";
import React from "react";
import { WebcamMode, FileMode } from "../components";

function App() {
    const [detectMethod, setDetectMethod] = React.useState("webcam");
    const [predictions, setPredictions] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const scanImage = async (imageSrc) => {
        setError(null);
        setLoading(true);
        setPredictions([]);
        try {
            // Send image to backend for detection
            const response = await axios.post("/api/classify", {
                image: imageSrc
            });
            setPredictions(response.data.predictions);
        } catch (error) {
            setError(error);
            setTimeout(() => setError(null), 4000);
        }
        setLoading(false);
    };

    React.useEffect(() => {
        setError(null);
        setPredictions([]);
    }, [detectMethod]);

    return (
        <>
            <main className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
                <div className="relative max-w-xs w-full py-5">
                    <div>
                        <select
                            className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
                            onChange={(e) => setDetectMethod(e.target.value)}
                        >
                            <option value="webcam">From WebCam</option>
                            <option value="file">From File</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg className="w-4 h-4" viewBox="0 0 20 20">
                                <path
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {detectMethod === "webcam" && (
                    <WebcamMode scanImage={scanImage} />
                )}

                {detectMethod === "file" && <FileMode scanImage={scanImage} />}

                {loading && (
                    <div className="fixed inset-0 z-10 flex items-center justify-center">
                        <div className="max-w-xs w-full p-4 text-center text-white bg-gray-900">
                            <div className="text-3xl">Loading...</div>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="fixed inset-0 z-10 flex items-center justify-center">
                        <div className="max-w-xs p-4 text-center text-white bg-red-600">
                            <div className="text-3xl">Error!</div>
                            <div className="text-lg">{error.message}</div>
                        </div>
                    </div>
                )}

                {predictions.length > 0 && (
                    <div className="max-w-xs w-full py-5 px-3 m-auto">
                        {predictions.slice(0, 5).map((item) => {
                            const score = Math.floor(item.score * 100);
                            return (
                                <div key={item.class}>
                                    <h3 className="py-2 font-semibold text-gray-300">
                                        Classification Confidence: {item.class}
                                    </h3>
                                    <div className="grid grid-cols-3 gap-4 ">
                                        <div
                                            className={[
                                                "bg-red-500 h-5",
                                                score > 10
                                                    ? "opacity-100"
                                                    : "opacity-10"
                                            ].join(" ")}
                                        />
                                        <div
                                            className={[
                                                "bg-yellow-500 h-5",
                                                score > 40
                                                    ? "opacity-100"
                                                    : "opacity-10"
                                            ].join(" ")}
                                        />
                                        <div
                                            className={[
                                                "bg-green-500 h-5",
                                                score > 75
                                                    ? "opacity-100"
                                                    : "opacity-10"
                                            ].join(" ")}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </>
    );
}

export default App;
