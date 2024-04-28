//import axios for api handle in frontend
import axios from "axios";
import { apiService } from "services/authService";
//import zustand
import create from "zustand";


const authStore = create((set)=>
({
    //login state
    isLogin: null,
    isRegister: null,
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
       
       try{
        const{loginForm} = authStore.getState();
        console.log("loginForm:",loginForm)
            const response = await axios.post("/login",loginForm);
            
            set(()=> ({ token: response?.data?.token})
            )
            apiService.setAccessToken( response?.data?.token);
            
            set({isLogin:true});
            set({
                loginForm:{
                    email:"",
                    Password:""
                }
            })
        }catch(error)
        {
            set({
                loginForm:{
                    email:"",
                    Password:""
                }
            })
            set({isLogin:false});
            if(error)
            {
                throw error
            }
            //console.log("hi")
            
        }
    },

    registration: async () => {
            try{
            const { registrationForm } = authStore.getState();
            await axios.post("/signup", registrationForm);
            set({isRegister:true})

            }catch(error)
            {
                
                set({
                    registrationForm:{
                        email: authStore.getState().registrationForm.email,
                        Password: "",
                        ConfirmPassword:"",
                    }
                })
                
                set({isRegister:false});
                if(error)
            {
                throw error
               
            }
            
            }
        
    }


}));

export default authStore;
