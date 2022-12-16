import * as Yup from 'yup';

// Schéma de validation du formulaire CONTACT
export const contactSchema = Yup.object().shape({
        surname: Yup.string().min(2, 'Minimum 2 caractères').matches(/^([^0-9]*)$/, "Indiquer que des lettres").required('Requis'),
        name: Yup.string().min(2, 'Minimum 2 caractères').matches(/^([^0-9]*)$/, "Indiquer que des lettres").required('Requis'),
        email: Yup.string().email('Email invalide').required('Requis'),
        phone: Yup.string().matches(/^[0-9]*$/,'Indiquer que des chiffres').min(10,'Minimum 10 chiffre').max(10,'Maximum 10 chiffre').required('Requis'),
        message: Yup.string().min(20, 'Minimum 20 caractères').required('Requis'),
    })