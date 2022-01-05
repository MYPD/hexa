import React from "react";
import { WebcamMode, FileMode } from "../components";

function App() {
    const [detectMethod, setDetectMethod] = React.useState("webcam");

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

                {detectMethod === "webcam" && <WebcamMode />}

                {detectMethod === "file" && <FileMode />}
            </main>
        </>
    );
}

export default App;
