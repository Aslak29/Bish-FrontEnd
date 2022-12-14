import * as Yup from 'yup'

// Schéma de validation des formulaire admin produits
export const productCreateSchema = Yup.object().shape({
        name: Yup.string().min(2, 'Minimum 2 caractères').required('Requis'),
        price: Yup.number('Le prix doit comporter que des chiffres').required('Requis').positive('Le prix doit être supérieur à 0'),
        description: Yup.string().min(15, 'Minimum 15 caractères').required('Requis'),
        trend: Yup.boolean().required(),
        available: Yup.boolean().required(),
        infoFile: Yup.mixed().required("Requis").test('fileFormat', "Unsupported Format", value => value && value.type === "image/jpeg")
    })

// Schéma de validation des formulaire admin produits
export const productUpdateSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Minimum 2 caractères').required('Requis'),
    price: Yup.number('Le prix doit comporter que des chiffres').required('Requis').positive('Le prix doit être supérieur à 0'),
    description: Yup.string().min(15, 'Minimum 15 caractères').required('Requis'),
    trend: Yup.boolean().required(),
    available: Yup.boolean().required(),
    infoFile: Yup.mixed().test('fileFormat', "Unsupported Format", value => value ? value.type ? (value.type === "image/jpeg" || value.type === "image/png") : true : true)
})
    
