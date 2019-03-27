export const CREATE_USER = 'CREATE_USER';

export const createUser = (username, password, email, phoneNumber) => {
    return {  type: CREATE_USER, username, password, email, phoneNumber }
}