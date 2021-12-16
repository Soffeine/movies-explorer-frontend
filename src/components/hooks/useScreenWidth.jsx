import { useEffect, useState } from "react";

const ScreenType = {
    DESKTOP: 'DESkTOP',
    TABLET: 'TABLET',
    MOBILE: 'MOBILE',
}

export const useScreenWidth = ({ containerRef, arr }) => {
    const [screenWidth, setScreenWidth] = useState(0);
    const [screenType, setScreenType] = useState(ScreenType.DESKTOP);
    const [currentMoviesArr, setCurrentMoviesArr] = useState(arr);


    useEffect(() => {
        const onWindowResize = () => setScreenWidth(containerRef.current?.offsetWidth || 0);        

        setScreenWidth(containerRef.current?.offsetWidth)

        window.addEventListener(`resize`, onWindowResize)

        return () => {
            window.removeEventListener("resize", onWindowResize)
        }
    }, [containerRef]);

    useEffect(() => {
        if (screenWidth > 768) {
            setScreenType(ScreenType.DESKTOP)
        }
        if (screenWidth <= 768) {
            setScreenType(ScreenType.TABLET)
        }
        if (screenWidth <= 320) {
            setScreenType(ScreenType.MOBILE)
        }
    }, [screenWidth])

    useEffect(() => {
        switch (screenType) {
            case ScreenType.DESKTOP: {
                setCurrentMoviesArr(arr.slice(0, 16));
                return;
            }
            case ScreenType.TABLET: {
                setCurrentMoviesArr(arr.slice(0, 8));
                return;
            }
            case ScreenType.MOBILE: {
                setCurrentMoviesArr(arr.slice(0, 4));
                return;
            }
            default: {
                setCurrentMoviesArr(arr.slice(0, 16));
            }
        }
    }, [arr, screenType])

    return { currentMoviesArr }
}