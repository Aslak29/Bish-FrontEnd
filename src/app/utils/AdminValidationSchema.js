import * as Yup from 'yup';

// PRODUITS
// Schéma de validation du formulaire create admin produit
export const productCreateSchema = Yup.object().shape({
        name: Yup.string().min(2, 'Minimum 2 caractères').required('Champ obligatoire'),
        price: Yup.number('Indiquer que des chiffres').required('Champ obligatoire').positive('Le prix doit être supérieur à 0'),
        description: Yup.string().min(15, 'Minimum 15 caractères').required('Champ obligatoire'),
        trend: Yup.boolean().required(),
        available: Yup.boolean().required(),
        infoFile:
            Yup.mixed().required("Champ obligatoire").test('fileFormat', "Seuls les formats .jpg et .png sont acceptés",
            value => value && (value.type === "image/jpeg" || value.type === "image/png"))
    })

// Schéma de validation du formulaire update admin produit
export const productUpdateSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Minimum 2 caractères').required('Champ obligatoire'),
    price: Yup.number('Indiquer que des chiffres').required('Champ obligatoire').positive('Le prix doit être supérieur à 0'),
    description: Yup.string().min(15, 'Minimum 15 caractères').required('Champ obligatoire'),
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
        .min(2, 'Minimum 2 caractères')
        .max(50, 'Maximum 50 caractères')
        .required('Champ obligatoire'),
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
        .min(2, 'Minimum 2 caractères')
        .max(50, 'Maximum 50 caractères')
        .required('Champ obligatoire'),
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
        .required("Champ obligatoire"),
    startDate: Yup.date()
        .required("Champ obligatoire"),
    endDate: Yup.date()
        .required("Champ obligatoire")
})

// Schéma de Validation Formulaire Create Update Users

export const userSchema =  Yup.object().shape({
    name: Yup.string().min(2,'Minimum 2 caractères').required('Champ obligatoire'),
    surname:Yup.string().min(2,'Minimum 2 caractères').required('Champ obligatoire'),
    email: Yup.string().email('Email invalide').required('Champ obligatoire'),
    password: Yup.string().min(8,'Minimum 8 caractères').matches(/[A-Z]/,'Votre mot de passe doit contenir une majuscule').matches(/[a-z]/,'Votre mot de passe doit contenir une minuscule').matches(/[0-9]/,'Votre mot de passe doit contenir un chiffre').required('Champ obligatoire'),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password'),null],'Les 2 mots de passes doivent être identique'),
    phone: Yup.string().matches(/^[0-9]*$/,'Que des chiffres').min(10,'Minimum 10 chiffres').max(10,'Maximum 10 chiffres').required('Champ obligatoire')
  })
    
// BLOG
// Schéma de validation du formulaire create admin produit
export const blogCreateSchema = Yup.object().shape({
    title: Yup.string().min(2, 'Minimum 2 caractères').required('Champ obligatoire'),
    description: Yup.string().min(15, 'Minimum 15 caractères').required('Champ obligatoire'),
    infoFile:
        Yup.mixed().required("Champ obligatoire").test('fileFormat', "Seuls les formats .jpg et .png sont acceptés",
        value => value && (value.type === "image/jpeg" || value.type === "image/png"))
})

// Schéma de validation du formulaire update admin produit
export const blogUpdateSchema = Yup.object().shape({
title: Yup.string().min(10, 'Minimum 10 caractères').required('Champ obligatoire'),
description: Yup.string().min(20, 'Minimum 20 caractères').required('Champ obligatoire'),
infoFile:
    Yup.mixed().test('fileFormat', "Seuls les formats .jpg et .png sont acceptés",
    value => value ? value.type ? (value.type === "image/jpeg" || value.type === "image/png") : true : true)
})

// Schéma de validation du formulaire update commande details produit
export const orderDetailProductSchema = Yup.object().shape({
    taille: Yup.string().required('Champ obligatoire'),
    quantite: Yup.number('Indiquer que des chiffres').required('Champ obligatoire').positive('Indiquer un chiffre positif'),
    prix: Yup.number('Indiquer que des chiffres').required('Champ obligatoire').positive('Indiquer un chiffre positif'),
})

// Schéma de validation du formulaire update commande
export const orderProductSchema = Yup.object().shape({
    ville: Yup.string().min(2, 'Minimum 2 caractères').required('Champ obligatoire'),
    cp: Yup.string().matches(/^[0-9]*$/,'Que des chiffres').min(5,'Minimum 5 chiffres').max(5,'Maximum 5 chiffres').required('Champ obligatoire'),
    num: Yup.string().min(2, 'Minimum 2 caractères').required('Champ obligatoire'),
    rue: Yup.string().min(2, 'Minimum 2 caractères').required('Champ obligatoire'),
    etat: Yup.string().required('Champ obligatoire')
})