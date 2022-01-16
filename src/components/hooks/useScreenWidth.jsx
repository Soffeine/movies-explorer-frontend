import { useEffect, useState, useRef } from "react";

const ScreenType = {
    DESKTOP: 'DESkTOP',
    TABLET: 'TABLET',
    MOBILE: 'MOBILE',
}

export const useScreenWidth = ({ containerRef, arr, isShortFilm, onClick }) => {
    const [screenWidth, setScreenWidth] = useState(0);
    const [screenType, setScreenType] = useState(ScreenType.DESKTOP);
    const [currentMoviesArr, setCurrentMoviesArr] = useState(arr);
    const [maxFilmCounter, setMaxFilmCounter] = useState()
    // кнопка показать еще
    // ------ в хуке useWitdh let MAX_FILM_COUNTER = цифра, равная изначально максимальному количеству фильмов в зависимотси от размера экрана
    // если будут срабатывать сайд-эффекты, можно попробовать через стейт-переменную
    // ++++++++++++а потом попробовать юзРеф
    // функция, работающая на клик, прибавлять к переменной нужное количество отображаемых фильмов
    function onShowMoreClick(num) {
        return maxFilmCounter + num
    }

    // функция увеличения счетчика
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
                setMaxFilmCounter(16)
                setCurrentMoviesArr(filterFilmArr(maxFilmCounter, arr)); // переменная вместо числа
                return;
            }
            case ScreenType.TABLET: {
                setMaxFilmCounter(8)
                setCurrentMoviesArr(filterFilmArr(maxFilmCounter, arr));
                return;
            }
            case ScreenType.MOBILE: {
                setMaxFilmCounter(4)
                setCurrentMoviesArr(filterFilmArr(maxFilmCounter, arr));
                return;
            }
            default: {
                setCurrentMoviesArr(filterFilmArr(16, arr));
            }
        }
        // подписать на измение переменной

    }, [arr, maxFilmCounter, screenType, isShortFilm])


    return { currentMoviesArr }
}

