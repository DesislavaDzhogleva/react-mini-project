import { useState } from "react";

export function useForm(initialValues, submitHandler){
    const [values, setValues] = useState(initialValues);
    
    const onChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value);
        console.log(name)
        setValues({...values, [name]: value});
        console.log(values)
    };

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(values);

      
        submitHandler(values);
    };

    return {values, onChange, onSubmit};
}