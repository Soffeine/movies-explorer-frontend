import { useState } from 'react';
import { omit } from 'lodash';
import validator from 'validator';

const useForm = () => {

    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    // изменения в полях ввода на регистрации
    const handleChangeOnRegister = (e) => {
        e.persist();
        let name = e.target.name;
        let value = e.target.value;
        validateOnRegister(e, name, value);
        setValues({
            ...values,
            [name]: value,
        });
    }

    // изменения в полях ввода на авторизации
    const handleChangeOnLogin = (e) => {
        e.persist();
        let name = e.target.name;
        let value = e.target.value;
        validateOnLogin(e, name, value);
        setValues({
            ...values,
            [name]: value,
        });
    }

    // // изменения в полях ввода на изменении профиля
    // const handleChangeProfile = (e) => {
    //     e.persist();
    //     let name = e.target.name;
    //     let value = e.target.value;
    //     validateOnProfileChange(e, name, value);
    //     setProfileValues({
    //         ...values,
    //         [name]: value,
    //     });
    // }

    const validateOnRegister = (e, name, value) => {
        switch (name) {
            case 'name':
                if(
                new RegExp
                (/[^a-zа-яё\-\s]/gi)
                .test(value)
                ) {
                    setErrors({
                        ...errors,
                        name: 'Имя может содержать латиницу, кириллицу, дефисы и пробелы'
                    })
                } else {
                    let newObj = omit(errors, "name");
                    setErrors(newObj);
                }
                break;
            case 'email':
                if (!validator.isEmail(value)) {
                    setErrors({
                        ...errors,
                        email: 'Некорректный адрес'
                    })
                } else {
                    let newObj = omit(errors, "email");
                    setErrors(newObj);
                }
                break;
            case 'password':
                if (value.length <= 6) {
                    setErrors({
                        ...errors,
                        password: 'Слишком короткий пароль'
                    })
                } else {
                    let newObj = omit(errors, "password");
                    setErrors(newObj);
                }
                break;
            default:
                break;
        }
        Object.keys(errors).length === 0 
        && Object.keys(values).length !==0
        && e.target.closest("form").checkValidity() ? setIsValid(true) : setIsValid(false);
    }

    const validateOnLogin = (e, name, value) => {
        switch (name) {
            case 'email':
                if (!validator.isEmail(value)) {
                    setErrors({
                        ...errors,
                        email: 'Некорректный адрес, обязательное поле',
                    })
                } else {
                    let newObj = omit(errors, "email");
                    setErrors(newObj);
                }
                break;
            case 'password':
                if (value.length <= 0) {
                    setErrors({
                        ...errors,
                        password: 'Обязательное поле',
                    })
                } else if (value.length <= 6) {
                    setErrors({
                        ...errors,
                        password: 'Пароль не может быть таким коротким',
                    })
                } else {
                    let newObj = omit(errors, "password");
                    setErrors(newObj);
                }
                break;
            default:
                break;
        }
        Object.keys(errors).length === 0 
        && Object.keys(values).length !==0
        && e.target.closest("form").checkValidity() ? setIsValid(true) : setIsValid(false);
    }

    const validateOnProfileChange = (e, name, value) => {
        switch(name) {
            case 'name':
                if(
                    new RegExp
                    (/[^a-zа-яё\-\s]/gi)
                    .test(value)
                    ) {
                        setErrors({
                            ...errors,
                            name: 'Имя может содержать латиницу, кириллицу, дефисы и пробелы'
                        })
                    } else {
                        let newObj = omit(errors, "name");
                        setErrors(newObj);
                    }
                    break;
            case 'email':
                if(!validator.isEmail(value)) {
                    setErrors({
                        ...errors,
                        email: 'Некорректный адрес'
                    })
                } else {
                    let newObj = omit(errors, "email");
                    setErrors(newObj);
                }
                break;
            default: 
                break;
        }
        Object.keys(errors).length === 0
        && e.target.closest("form").checkValidity() ? setIsValid(true) : setIsValid(false);
    }

    const setSubmitError = (errorText) => {
        setErrors({
            submit: errorText,
        });
    }


    return {
        values,
        // profileValues,
        errors,
        isValid,
        handleChangeOnRegister,
        handleChangeOnLogin,
        // handleChangeProfile,
        setSubmitError,
    }
}

export default useForm;