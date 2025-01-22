import React from 'react'

const HomePoster = () => {
    const skeletonCount = 6; // Adjust the number of skeletons to display

    return (
        <div className="z-10 relative w-full h-full flex justify-center items-center ">
            <div className="flex flex-col justify-center items-center">
                <div className="grid grid-cols-3 auto-rows-custom w-11/12 pt-10 pb-24 gap-y-24 gap-x-14 h-auto">
                    {/* Skeleton for the posts: Empty space with color and pulse animation */}
                    {Array(skeletonCount).fill().map((_, index) => (
                        <div key={index} className="flex justify-center items-center hover:scale-110 transition-all duration-300">
                            {/* Empty space with background color and adjusted width and height */}
                            <div className="w-[300px] h-[350px] bg-gray-200 rounded-lg shadow-lg animate-pulse" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomePoster;
