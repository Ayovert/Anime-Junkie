import * as yup from 'yup';

export const validationSchema = [
    yup.object({
    fullName: yup.string().required('Full name is required'),
    address1: yup.string().required('Address line 1 is required'),
   // address2: yup.string().required(),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    country: yup.string().required(),
    postalCode: yup.string().required(),
    telephone: yup.string().required()
}),
yup.object(),
yup.object({
    nameOnCard: yup.string().required('Name on Card is required')
})
]


//required("Telephone Number is Required")