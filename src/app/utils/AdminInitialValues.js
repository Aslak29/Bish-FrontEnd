
// Valeurs initials du formulaire de création de admin catégorie
export const categoryCreateInitialValues = {
        name: '',
        trend: false,
}
// Valeurs initials du formulaire de update de admin catégorie
export const categoryUpdateInitialValues = (categories) => {
    return {
        name: categories.name,
        trend: categories.isTrend,
        infoFile : {
            name: categories.pathImage
        }
    }
}



