const ID_NAME = 'id';
const NAME_NAME = 'name';
const USERNAME_NAME = 'surname';

/**
 *
 * @param {string} name: to save
 * @param {string} surname: to save
 * @author Peter Mollet
 */
 export function setUser(id, name, surname) {
    localStorage.setItem(ID_NAME, id);
    localStorage.setItem(NAME_NAME, name);
    localStorage.setItem(USERNAME_NAME, surname);
}

/**
 *
 * @return {string} user
 * @author Peter Mollet
 */
export function getUser() {
    return {
        id: localStorage.getItem(ID_NAME),
        name: localStorage.getItem(NAME_NAME),
        surname: localStorage.getItem(USERNAME_NAME)
    }
}