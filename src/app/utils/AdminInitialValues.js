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

export const promotionCreateInitialValues = () => {
    return {
        remise : '',
        startDate : '',
        endDate : '',
    }
}



