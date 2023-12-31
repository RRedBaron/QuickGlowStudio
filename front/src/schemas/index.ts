import * as yup from 'yup';

export const signUpSchema = yup.object().shape({
    fullname: yup.string().required('Fullname is required'),
    phone: yup.string().required('Phone is required'),
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    acceptTerms: yup.bool().oneOf([true], 'You must accept the terms'),
});

export const signInSchema = yup.object().shape({
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

export const createBookingSchema = yup.object().shape({
    selectedDate: yup
        .date()
        .min(new Date(), 'Selected date cannot be before today')
        .required('Date is required'),
    selectedTime: yup.string().required('Time is required'),
    selectedType: yup
        .string()
        .required('Type is required')
        .notOneOf([''], 'Please select a type'),
    duration: yup
        .number()
        .typeError('Duration must be a number')
        .required('Duration is required')
        .positive('Duration must be a positive number')
        .min(1, 'Duration must be at least 1 hour')
        .max(4, 'Duration must be at most 4 hours'),
    amount: yup
        .number()
        .typeError('Amount must be a number')
        .required('Amount is required')
        .positive('Amount must be a positive number')
        .min(1, 'Amount of people must be at least 1')
        .max(12, 'Amount of people must be maximum 12'),
    details: yup.string(),
});
