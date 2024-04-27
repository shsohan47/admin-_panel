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
    registrationForm:
    {
        email: "",
        Password: "",
        ConfirmPassword:"",
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
                ...state.loginForm,
                [name]:value
            }
        }
    })
    },
    updateRegistrationForm: (e)=>
    {
        const{name,value} = e.target;
        set((state)=>
    {
        return {
            registrationForm:{
                ...state.registrationForm,[name]:value
            }
        }
    })
    },
    login: async()=>
    {
       
       
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
    },

    registration: async () => {
        
            const { registrationForm } = authStore.getState();
           const response =  await axios.post("/signup", registrationForm);
        
            if(response.data.error)
            {
                const errorMessage = response.data.error;
                throw new Error(errorMessage)
            }
            set({
                registrationForm:{
                    email: authStore.registrationForm.getState().email,
                    Password: "",
                    ConfirnPassword:"",
                }
            })
        
    }


}));

export default authStore;
