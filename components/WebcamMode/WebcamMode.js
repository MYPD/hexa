import React from "react";
import Webcam from "react-webcam";

export default function WebcamMode() {
    const videoRef = React.useRef();
    const [videoError, setVideoError] = React.useState(false);
    const [imageFromVideoSrc, setImageFromVideoSrc] = React.useState(null);

    React.useEffect(async () => {
        setVideoError(false);

        return () => {
            // A video's MediaStream object is available through its srcObject attribute
            const mediaStream = videoRef.current.srcObject;
            const tracks = mediaStream.getTracks();
            console.log(tracks);
            tracks.forEach((track) => track.stop());
        };
    }, []);

    return (
        <>
            <div className="max-w-xs w-full mx-auto overflow-hidden rounded-lg shadow-lg bg-gray-800">
                {!videoError ? (
                    <div>
                        {imageFromVideoSrc ? (
                            <img
                                className="object-cover min-w-full h-80 cursor-pointer"
                                src={imageFromVideoSrc}
                            />
                        ) : (
                            <Webcam
                                audio={false}
                                ref={videoRef}
                                className="object-cover h-80 cursor-pointer"
                                onUserMediaError={(error) => {
                                    setVideoError(true);
                                }}
                                imageSmoothing={true}
                                autoPlay
                            />
                        )}
                        <div className="flex items-center justify-center py-5 text-center">
                            {!imageFromVideoSrc ? (
                                <div className="mx-3">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        onClick={() =>
                                            setImageFromVideoSrc(
                                                videoRef.current.getScreenshot()
                                            )
                                        }
                                    >
                                        Take Picture
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="mx-3">
                                        <button
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            onClick={() =>
                                                setImageFromVideoSrc(null)
                                            }
                                        >
                                            Reset
                                        </button>
                                    </div>
                                    <div className="mx-3">
                                        <button
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            onClick={() =>
                                                setImageFromVideoSrc(null)
                                            }
                                        >
                                            Scan
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ) : (
                    <>
                        <img
                            className="object-cover h-80 cursor-pointer"
                            src="https://i2.wp.com/www.alphr.com/wp-content/uploads/2018/08/How-to-fix-the-Lenovo-webcam-not-working-issue1.jpg?fit=900%2C572&ssl=1"
                        />

                        <div className="py-5 text-center">
                            <span className="text-sm text-red-500">
                                Error while accessing webcam :(
                            </span>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
