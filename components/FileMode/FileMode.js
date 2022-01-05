import React from "react";

export default function FileMode({ scanImage }) {
    const [imageSrc, setImageSrc] = React.useState(null);

    const defaultImage =
        "data:image/jpeg;base64,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";

    return (
        <>
            <div className="max-w-xs w-full mx-auto overflow-hidden rounded-lg shadow-lg bg-gray-800">
                <div className="image-upload">
                    <label htmlFor="file-input">
                        <img
                            className="object-contain min-w-full h-80 cursor-pointer"
                            src={imageSrc || defaultImage}
                        />
                    </label>
                    <input
                        id="file-input"
                        type="file"
                        className="hidden"
                        accept="image/*;capture=camera"
                        onChange={async (e) => {
                            // Set the Preview Image
                            const file = e.target.files[0];
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                setImageSrc(e.target.result);
                            };
                            reader.readAsDataURL(file);
                        }}
                    />
                </div>

                <div className="py-5 text-center">
                    <span className="text-sm text-gray-200">
                        Select an Image
                    </span>

                    {imageSrc && (
                        <div className="flex items-center justify-center text-center py-5">
                            <div className="mx-3">
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    onClick={() => setImageSrc(null)}
                                >
                                    Reset
                                </button>
                            </div>
                            <div className="mx-3">
                                <button
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    onClick={() => {
                                        scanImage(imageSrc);
                                    }}
                                >
                                    Scan
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
