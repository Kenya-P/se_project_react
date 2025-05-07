import {useState, useCallback} from 'react';

const validationConfig = {
    required: {
        isValid: (value) => !!value,
        errorMessage: 'This field is required',
    },
    email: {
        isValid: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        errorMessage: 'Invalid email address',
    },
    password: {
        isValid: (value) => value.length >= 6,
        errorMessage: 'Password must be at least 6 characters long',
    },
    url: {
        isValid: (value) => /^(https?:\/\/[^\s$.?#].[^\s]*)$/.test(value),
        errorMessage: 'Invalid URL',
    },
    avatar: {
        isValid: (value) => /^(https?:\/\/[^\s$.?#].[^\s]*)$/.test(value),
        errorMessage: 'Invalid avatar URL',
    },
};

export function useFormAndValidation() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const validateField = useCallback((name, value) => {
        if (validationPatterns[name]) {
          const { pattern, errorMessage } = validationPatterns[name];
          if (!pattern.test(value)) {
            return errorMessage;
          }
        } else if (!value) {
          return "This field is required";
        }
        return "";
      }, []);

    const handleChange = useCallback((e) => {
        const {name, value} = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
        setIsValid(e.target.closest("form").checkValidity());
  
        const error = validateField(name, value);
        if (error) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
          }));
        } else {
          setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[name];
            return newErrors;
          });
        }
      },
      [validateField]
    );


    const resetForm = useCallback(() => {
        setValues({});
        setErrors({});
        setIsValid(false);
    }
    , []);


    return {values, handleChange, errors, isValid, resetForm, setValues, setErrors};
}