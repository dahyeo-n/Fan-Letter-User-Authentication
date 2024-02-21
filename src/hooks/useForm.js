import { useState } from 'react';

const useForm = (initialState = {}) => {
    const [formState, setFormState] = useState(initialState);
    const onChangeInputHandler = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };
    const resetForm = () => {
        setFormState(initialState);
    };
    return { formState, onChangeInputHandler, resetForm };
};

export default useForm;
