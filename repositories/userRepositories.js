const login = async ({ email, password }) => {};
const register = async ({ email, password, name, phoneNumber, gender, address }) => {
    console.log(111, `${email} ${password}`)
};
export default { login, register };
