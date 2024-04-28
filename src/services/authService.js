//get and set token in local storage
const token_key = "token";
class ApiService{
setAccessToken = (token)=>
{
    localStorage.setItem(token_key,token);
}
}

export const apiService = new ApiService()