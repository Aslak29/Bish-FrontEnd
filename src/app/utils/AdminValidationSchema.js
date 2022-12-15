import * as Yup from 'yup';

// PRODUITS
// Schéma de validation du formulaire create admin produit
export const productCreateSchema = Yup.object().shape({
        name: Yup.string().min(2, 'Minimum 2 caractères').required('Requis'),
        price: Yup.number('Le prix doit comporter que des chiffres').required('Requis').positive('Le prix doit être supérieur à 0'),
        description: Yup.string().min(15, 'Minimum 15 caractères').required('Requis'),
        trend: Yup.boolean().required(),
        available: Yup.boolean().required(),
        infoFile:
            Yup.mixed().required("Requis").test('fileFormat', "Seuls les formats .jpg et .png sont acceptés",
            value => value && (value.type === "image/jpeg" || value.type === "image/png"))
    })

// Schéma de validation du formulaire update admin produit
export const productUpdateSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Minimum 2 caractères').required('Requis'),
    price: Yup.number('Le prix doit comporter que des chiffres').required('Requis').positive('Le prix doit être supérieur à 0'),
    description: Yup.string().min(15, 'Minimum 15 caractères').required('Requis'),
    trend: Yup.boolean().required(),
    available: Yup.boolean().required(),
    infoFile:
        Yup.mixed().test('fileFormat', "Seuls les formats .jpg et .png sont acceptés",
        value => value ? value.type ? (value.type === "image/jpeg" || value.type === "image/png") : true : true)
})

// CATEGORIES
// Schéma de validation du formulaire create admin catégorie
export const categoryCreateSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'le nom de la catégorie est trop court !')
        .max(50, 'le nom de la catégorie est trop long !')
        .required('Champs Requis !'),
    trend: Yup.boolean(),
    infoFile: Yup.mixed()
        .test(
            "fileFormat",
            "Seuls les formats .jpg et .png sont acceptés",
            value => value && (value.type === "image/jpeg" || value.type === "image/png")
        )
})

// Schéma de validation du formulaire create update catégorie
export const categoryUpdateSchema =  Yup.object().shape({
    name: Yup.string()
        .min(2, 'le nom de la catégorie est trop court !')
        .max(50, 'le nom de la catégorie est trop long !')
        .required('Champs Requis !'),
    trend: Yup.boolean(),
    infoFile: Yup.mixed()
        .test(
            "fileFormat",
            "Seuls les formats .jpg et .png sont acceptés",
            value => value ?
                value.type ?
                    (value.type === "image/jpeg" || value.type === "image/png") : true
                : true
        )
})
    
