export default obj => {
    return Object.keys(obj).map(key => obj[key]);
};