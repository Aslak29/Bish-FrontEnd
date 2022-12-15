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


