import {useState} from 'react';

export function useForm(inputValues) {
    const [values, setValues] = useState(inputValues);
    const [errors, setErrors] = useState({});
  
    const handleChange = (event) => {
      // get the name and value of the input because event.target is the input
      const {value, name} = event.target;
      // set the value into the object using the name
      setValues({...values, [name]: value});

      if (values.trim() === '') {
        setErrors({...errors, [name]: 'This field is required'});
      } else {
        const newErrors = {...errors};
        delete newErrors[name];
        setErrors(newErrors);
      }
    };

    const resetForm = () => {
      setValues(inputValues);
      setErrors({});
    };
    return {values, handleChange, setValues, resetForm, setErrors};
  }