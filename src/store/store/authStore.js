//import axios for api handle in frontend
import axios from "axios";
import { apiService } from "services/authService";
//import zustand
import create from "zustand";


const authStore = create((set)=>
({
    //login state
    isLogin: null,
    token: "",
    //define initial login form
    loginForm: {
        email: "",
        Password: "",
    },
    //update login info from frontend
    updateLoginForm:(e)=>
    {
        //take input name and value from input field where user type
        const {name,value} = e.target;
        set((state)=>
    {
        return{
            loginForm: {
                ...state.loginForm,[name]:value
            }
        }
    })
    },
    login: async()=>
    {
        console.log("hi")
       
        const{loginForm} = authStore.getState();
            const response = await axios.post("/login",loginForm);
            
            set(()=> ({ token: response?.data?.token})
            )
            apiService.setAccessToken( response?.data?.token);
            
            set({isLogin:true});

            if(response.data.error)
            {
                const errorMessage = response.data.error
                throw new Error(errorMessage)
            }
        
        set({
            loginForm:{
                email:"",
                Password:""
            }
        })
    }
}));

export default authStore;
