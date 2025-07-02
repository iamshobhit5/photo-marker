import { KeyboardEvent, useEffect, useRef, useState } from 'react';

interface PhotoViewerProps {
    imageFiles: File[]
}

const SCROLL_AMOUNT = 120;

const PhotoViewer: React.FC<PhotoViewerProps> = ({ imageFiles }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [iamgeUrls, setImageUrls] = useState<string[]>([]);
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const urls = imageFiles.map((file) => URL.createObjectURL(file));
        setImageUrls(urls);

        return () => {
            urls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [imageFiles]);

    // Keyboard event handler

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") {
                setSelectedIndex((prev) => (prev < iamgeUrls.length - 1 ? prev + 1 : prev));

                if(carouselRef.current) {
                    carouselRef.current.scrollBy({left: SCROLL_AMOUNT, behavior: "smooth"});
                }
            } else if (e.key === "ArrowLeft") {
                setSelectedIndex((prev) => (prev > 0 ? prev -1 : prev));

                if(carouselRef.current) {
                    carouselRef.current.scrollBy({left: -1, behavior: "smooth"});
                }
            }
        };


        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [iamgeUrls.length])


    const scrollCarousel = (direction: "left" | "right") => {
        if (carouselRef.current) {
            const scrollBy = direction === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT;
            carouselRef.current.scrollBy({ left: scrollBy, behavior: "smooth" });
        }
    };

    if (imageFiles.length == 0) return null;

    return (
        <div className='flex flex-col items-center w-full'>
            <div className='w-[60vw] h-[60vh] -mt-15 mb-20 shadow-lg rounded-lg overflow-hidden flex justify-center items-center bg-gray-100'>
                <img
                    src={iamgeUrls[selectedIndex]}
                    alt={imageFiles[selectedIndex].name}
                    className="max-w-full max-h-full object-contain"
                />
            </div>


            <div className="flex items-center w-[80vw]">

                {/* Left arrow */}
                <button
                    onClick={() => scrollCarousel("left")}
                    className="bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow transition disabled:opacity-50 mx-2"
                    aria-label="Scroll Left"
                    type="button"
                >
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Carasoul */}
                <div ref={carouselRef} className="flex overflow-x-auto w-[80vw] py-2 gap-2 scroll-snap-x scroll-snap-mandatory">
                    {iamgeUrls.map((url, idx) => (
                        <button
                            key={url}
                            onClick={() => setSelectedIndex(idx)}
                            className={`flex-shrink-0 w-24 h-16 rounded-md overflow-hidden bg-white flex justify-center items-center
              ${idx === selectedIndex ? "border-4 border-blue-500" : "border-2 border-gray-300"}
              scroll-snap-center transition-all duration-150`}
                            title={imageFiles[idx].name}
                            type="button"
                        >
                            <img
                                src={url}
                                alt={imageFiles[idx].name}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>

                {/* Right Arrow */}
                <button
                    onClick={() => scrollCarousel("right")}
                    className="bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow transition disabled:opacity-50 mx-2"
                    aria-label="Scroll Right"
                    type="button"
                >
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default PhotoViewer;