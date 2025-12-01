import { useState } from "react";

export default function useForm(callback, initialValues) {
    const [values, setValues] = useState(initialValues);

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: [e.target.values]
        }));
    };

    const formAction = async (formData) => {
        await callback(values, formData);
    }

    const register = (fieldName) => {
        return {
            name: fieldName,
            onchange: changeHandler,
            value: values[fieldName]
        }
    }

    return {
        register,
        values,
        changeHandler,
        formAction
    }
}