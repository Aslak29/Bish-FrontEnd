import * as Yup from 'yup';

// Schéma de validation du formulaire LOGIN
export const loginSchema = Yup.object().shape({
    username: Yup.string().email('Email invalide').required('Champ obligatoire'),
    password: Yup.string().min(8,'Minimum 8 caractères').matches(/[A-Z]/,'Votre mot de passe doit contenir une majuscule').matches(/[a-z]/,'Votre mot de passe doit contenir une minuscule').matches(/[0-9]/,'Votre mot de passe doit contenir un chiffre').required('Champ obligatoire'),
})

// Schéma de validation du formulaire REGISTER
export const registerSchema = Yup.object().shape({
    email: Yup.string().email('Email invalide').required('Champ obligatoire'),
    password: Yup.string().min(8,'Minimum 8 caractères').matches(/[A-Z]/,'Votre mot de passe doit contenir une majuscule').matches(/[a-z]/,'Votre mot de passe doit contenir une minuscule').matches(/[0-9]/,'Votre mot de passe doit contenir un chiffre').required('Champ obligatoire'),
    confirmation: Yup.string().oneOf([Yup.ref('password'),null],'Les 2 mots de passes doivent être identique'),
    name: Yup.string().min(2, 'Minimum 2 caractères').matches(/^([^0-9]*)$/, "Indiquer que des lettres").required('Champ obligatoire'),
    surname: Yup.string().min(2, 'Minimum 2 caractères').matches(/^([^0-9]*)$/, "Indiquer que des lettres").required('Champ obligatoire'),
    recaptcha: Yup.string().required('Champ obligatoire')
})

// Schéma de validation du formulaire FORGOT PASSWORD
export const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Email invalide').required('Champ obligatoire'),
})

// Schéma de validation du formulaire FORGOT PASSWORD
export const newPasswordSchema = Yup.object().shape({
    password: Yup.string().min(8,'Minimum 8 caractères').matches(/[A-Z]/,'Votre mot de passe doit contenir une majuscule').matches(/[a-z]/,'Votre mot de passe doit contenir une minuscule').matches(/[0-9]/,'Votre mot de passe doit contenir un chiffre').required('Champ obligatoire'),
    confirmation: Yup.string().oneOf([Yup.ref('password'),null],'Les 2 mots de passes doivent être identique'),
})

// Schéma de validation du formulaire CONTACT
export const contactSchema = Yup.object().shape({
        surname: Yup.string().min(2, 'Minimum 2 caractères').matches(/^([^0-9]*)$/, "Indiquer que des lettres").required('Champ obligatoire'),
        name: Yup.string().min(2, 'Minimum 2 caractères').matches(/^([^0-9]*)$/, "Indiquer que des lettres").required('Champ obligatoire'),
        email: Yup.string().email('Email invalide').required('Champ obligatoire'),
        phone: Yup.string().matches(/^[0-9]*$/,'Indiquer que des chiffres').min(10,'Minimum 10 chiffres').max(10,'Maximum 10 chiffres').required('Champ obligatoire'),
        message: Yup.string().min(20, 'Minimum 20 caractères').required('Champ obligatoire'),
    })

// Valeurs initiales du formulaire CREATE UPDATE ADDRESS
export const addressSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Minimum 2 caractères').required('Champ obligatoire'),
    city: Yup.string().required('Champ obligatoire'),
    cp: Yup.string().matches(/^[0-9]*$/,'Que des chiffres').min(5,'Minimum 5 chiffres').max(5,'Maximum 5 chiffres').required('Champ obligatoire'),
    num: Yup.string().required('Champ obligatoire'),
    rue: Yup.string().min(2, 'Minimum 2 caractères').required('Champ obligatoire'),
})