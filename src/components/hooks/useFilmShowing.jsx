import { useEffect, useState } from "react";

const ScreenType = {
    DESKTOP: 'DESkTOP',
    TABLET: 'TABLET',
    MOBILE: 'MOBILE',
}

export const useFilmShowing = ({ containerRef, arr, isShortFilm, }) => {
    const [screenWidth, setScreenWidth] = useState(0);
    const [screenType, setScreenType] = useState(ScreenType.DESKTOP);
    const [currentMoviesArr, setCurrentMoviesArr] = useState(arr);
    const [maxFilmCounter, setMaxFilmCounter] = useState();
    const maxFilmsNumber = arr.length;

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

    const filterFilmArr = (arrSize, arr) => {
        return arr.slice(0, arrSize).filter((movie) => isShortFilm ? movie.duration >= 40 : movie)
    }

    
    const onShowMoreClick = () => {
        switch(screenType) {
            case ScreenType.DESKTOP: {
                setMaxFilmCounter((counter) => counter + 4)
                return;
            }
            case ScreenType.TABLET: {
                setMaxFilmCounter((counter) => counter + 2)
                return;
            }
            case ScreenType.MOBILE: {
                setMaxFilmCounter((counter) => counter + 1)
                return;
            }
            default : {
                setMaxFilmCounter((counter) => counter + 4) 
                return;
            }
        } 
    }

    useEffect(() => {
        switch (screenType) {
            case ScreenType.DESKTOP: {
                setMaxFilmCounter(16)
                return;
            }
            case ScreenType.TABLET: {
                setMaxFilmCounter(8)
                return;
            }
            case ScreenType.MOBILE: {
                setMaxFilmCounter(4)
                return;
            }
            default: {
                setMaxFilmCounter(16)
            }
        }
        // подписать на измение переменной

    }, [])


    useEffect(() => {
        switch (screenType) {
            case ScreenType.DESKTOP: {
                setCurrentMoviesArr(filterFilmArr(maxFilmCounter, arr)); // переменная вместо числа
                return;
            }
            case ScreenType.TABLET: {
                setCurrentMoviesArr(filterFilmArr(maxFilmCounter, arr));
                return;
            }
            case ScreenType.MOBILE: {
                setCurrentMoviesArr(filterFilmArr(maxFilmCounter, arr));
                return;
            }
            default: {
                setCurrentMoviesArr(filterFilmArr(maxFilmCounter, arr));
            }
        }
    }, [screenType, arr, isShortFilm, maxFilmCounter])

    return { currentMoviesArr, onShowMoreClick, maxFilmCounter, maxFilmsNumber }
}
