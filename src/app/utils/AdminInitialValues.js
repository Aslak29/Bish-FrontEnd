// PRODUITS
// Valeurs initiales du formulaire create admin produit
export const productCreateInitialValues = stock => {
    return {
        name: '',
        price: '',
        description: '',
        stock,
        categorie: 1,
        promotion: '-',
        trend: false,
        available: false,
    }
}

// Valeurs initiales du formulaire create admin produit
export const productUpdateInitialValues = (produit, stock) => {
    return {
        name: produit.name,
        price: produit.price,
        description: produit.description,
        stock,
        categorie: produit.id_categorie,
        promotion: produit.promotion.id ? produit.promotion.id : '-',
        trend: produit.is_trend,
        available: produit.is_available,
        infoFile: {
            name: produit.pathImage
        }
    }
}

// CATEGORIES
// Valeurs initiales du formulaire create admin categorie
export const categoryCreateInitialValues = {
        name: '',
        trend: false,
}
// Valeurs initiales du formulaire update admin categorie
export const categoryUpdateInitialValues = (categories) => {
    return {
        name: categories.name,
        trend: categories.isTrend,
        infoFile : {
            name: categories.pathImage
        }
    }
}

export const promotionUpdateInitialValues = (promotion) => {
    return {
        remise : promotion.remise,
    }
}

export const promotionCreateInitialValues = () => {
    return {
        remise : '',
        startDate : '',
        endDate : '',
    }
}

// Valeur Initiale du formulaire Create Users
export const userCreateInitialValues = {
    name: '',
    surname: '',
    email: '',
    password:'',
    passwordConfirm:'',
    roles: 'ROLE_ADMIN',
    phone: '',
}

// Valeur Initiale du formulaire Update  Users
export const userUpdateInitialValues = (user) => {
    return{
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: '',
        passwordConfirm: '',
        roles: user.roles,
        phone: user.phone,
    }
}

// BLOG
// Valeurs initiales du formulaire create blog
export const blogCreateInitialValues = {
    title: '',
    description: '',
    date: '',
    pathImage: ''
}

// Valeurs initiales du formulaire update blog
export const blogUpdateInitialValues = (blog) => {
    return{
        title: blog.title,
        description: blog.description,
        date: blog.date,
        infoFile: {
            name: blog.pathImage
        }    
    }
}

// COMMANDES
// Valeurs initiales du formulaire COMMANDE modal DETAILS
export const orderDetailProductInitialValues = product => {
    return {
        taille: product.taille,
        quantite: product.quantite,
        prix: product.price
    }    
}

// Valeurs initiales du formulaire update COMMANDE
export const orderUpdateInitialValues = product => {
    return {
        ville: product.adresse.ville,
        cp: product.adresse.code_postal,
        num: product.adresse.num_rue,
        rue: product.adresse.rue,
        compAdress: product.adresse.complement_adresse ? product.adresse.complement_adresse : '',
        etat: product.etatCommande
    }    
}

