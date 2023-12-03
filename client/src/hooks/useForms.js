import { useState } from "react";

export function useForm(initialValues, submitHandler){
    const [values, setValues] = useState(initialValues);
    
    const onChange = (event) => {
        const { name, value } = event.currentTarget;
        setValues({...values, [name]: value});
    };

    const onSubmit = (event) => {
        event.preventDefault();
        submitHandler(values);
    };

    return {values, onChange, onSubmit};
}