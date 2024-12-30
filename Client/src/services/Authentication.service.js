export const getAuthHeader = () => {
    const localStore = JSON.parse(localStorage.getItem("persistantState"))
    let token = localStore?.authToken;
    if (!token)
        token = null
    return {
        headers: { token }
    }
}