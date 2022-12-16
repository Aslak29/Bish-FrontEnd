// Valeurs initiales du formulaire contact
export const contactInitialValues = user => {
    return {
        name: user ? user.name : '',
        surname: user ? user.surname : '',
        email: user ? user.username : '',
        message: "",
        phone:""
    }
}