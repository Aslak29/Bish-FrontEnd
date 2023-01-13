// Valeurs initiales du formulaire LOGIN
export const loginInitialValues = {
    username: "",
    password: ""
}

// Valeurs initiales du formulaire REGISTER
export const registerInitialValues = {
    email: "",
    password: "",
    confirmation: "",
    name: "",
    surname: "",
    recaptcha: ''
}

// Valeurs initiales du formulaire FORGOT PASSWORD
export const forgotPasswordInitialValues = {
    email: ""
}

// Valeurs initiales du formulaire NEW PASSWORD
export const newPasswordInitialValues = {
    password: "",
    confirmation: ""
}

// Valeurs initiales du formulaire CONTACT
export const contactInitialValues = user => {
    return {
        name: user ? user.name : '',
        surname: user ? user.surname : '',
        email: user ? user.username : '',
        message: "",
        phone:""
    }
}

// Valeurs initiales du formulaire CREATE ADDRESS
export const addressInitialValues = {
    name: "",
    city: "",
    cp: "",
    num: "",
    rue: "",
    complement: ""
}