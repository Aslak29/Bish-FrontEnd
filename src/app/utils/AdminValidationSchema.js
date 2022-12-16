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

export const promotionCreateSchema = Yup.object().shape({
    remise: Yup.number()
        .required("Champs Requis !"),
    startDate: Yup.date()
        .required("Champs Requis"),
    endDate: Yup.date()
        .required("Champs Requis")
})

// Schéma de Validation Formulaire Create Update Users

export const userSchema =  Yup.object().shape({
    name: Yup.string().min(2,'Minimum 2 Caractère').required('Required'),
    surname:Yup.string().min(2,'Minimum 2 Caractère').required('Required'),
    email: Yup.string().email('Email Invalide').required('Required'),
    password: Yup.string().min(8,'Minimum 8 Caractère').matches(/[A-Z]/,'Votre Mot de passe doit contenir une Majuscule').matches(/[a-z]/,'Votre Mot de passe doit contenir une Minuscule').matches(/[0-9]/,'Votre Mot de passe doit contenir un Chiffre').required('Required'),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password'),null],'Les 2 mots de passes doivent être identique'),
    phone: Yup.string().matches(/^[0-9]*$/,'Que des Chiffres').min(10,'minimum 10 chiffre').max(10,'maximum 10 chiffre').required('Required')
  })

