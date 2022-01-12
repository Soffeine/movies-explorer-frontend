import { useEffect, useState } from "react";

const ScreenType = {
    DESKTOP: 'DESkTOP',
    TABLET: 'TABLET',
    MOBILE: 'MOBILE',
}

export const useScreenWidth = ({ containerRef, arr, isShortFilm }) => {
    const [screenWidth, setScreenWidth] = useState(0);
    const [screenType, setScreenType] = useState(ScreenType.DESKTOP);
    const [currentMoviesArr, setCurrentMoviesArr] = useState(arr);
    // функция увелисения счетчика
    // добавить параметр хука onClick
    // либо из хука возвращать текущее количесво прибавления фильмов
    // либо менять переменную внутри хука(лучше)
    // если переменная меньше длинны массива, кнопка отоборажается

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
        return arr.slice(0, arrSize).filter((movie) => isShortFilm ? movie : movie.duration >= 40)
    }
    useEffect(() => {
        switch (screenType) {
            case ScreenType.DESKTOP: {
                setCurrentMoviesArr(filterFilmArr(16, arr)); // переменная вместо числа
                return;
            }
            case ScreenType.TABLET: {
                setCurrentMoviesArr(filterFilmArr(8, arr));
                return;
            }
            case ScreenType.MOBILE: {
                setCurrentMoviesArr(filterFilmArr(4, arr));
                return;
            }
            default: {
                setCurrentMoviesArr(filterFilmArr(16, arr));
            }
        }
        // подписать на измение переменной

    }, [arr, screenType, isShortFilm])

    return { currentMoviesArr }
}

