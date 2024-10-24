import { defineStore } from "pinia";
import { show_alert } from "@/functions";
import axios from "axios";


export const useAuthStore = defineStore('auth',{
    state: () => ({ authUser:null, authToken:null }),
    getters: {
        user:(state) => state.authUser,
        token:(state) => state.authToken
    },
    actions:{
        async login(form){
            await axios.post('api/login',form)
            .then( (res) => {
                console.log(res)
            
                this.authToken = res.data.message.token;
                this.authUser  = res.data.message.user;
                this.router.push('/home');
            })
            .catch( (errors) => {
                
                //console.log(errors.response.data.message)

                const message_errors = [
                    errors.response.data.message
                ]
                
                let msj

                message_errors.map( (e) => {
                    if(e.email){
                        msj = e.email[0]
                    }
                    if(e.password){
                        msj = e.password[0]
                    }
                })
                
                show_alert(msj,'error','')
                
                
            })
              
            
        },
        async sing(form){
            await axios.post('api/register',form).then( (res) => {
                show_alert(res.data.message, 'success','');
                setTimeout( () => this.router.push('/login'), 2000 );
            } ).catch( (errors) => {
                console.log(errors)
            })
        },
        async logout(){
            await axios.get('api/logout',this.authToken)
            .then( (response) =>{
                console.log(response)
            }).catch( (error) =>{
                console.log(error)
            });
            this.authToken = null;
            this.authUser  = null;
            this.router.push('/login')
        }
    },
    persist:true
});