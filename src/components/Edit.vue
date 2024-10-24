<script setup>
    import { ref, onMounted, reactive } from 'vue'
    import axios from 'axios';
    import { useAuthStore } from '../stores/auth'

    const authStore = useAuthStore()

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.token

    onMounted( () => {
        get_single_user()
    })

    const props = defineProps({
        id: Number
    })
    
    const user = ref({
        name: '',
        phone: '',
        password: '',
        rfc: ''
    })

    const get_single_user = async () => {
        axios.get(`api/user/${props.id}`)
        .then( reponse => user.value = reponse.data.data )
        .catch( error => console.log(error) )
    }

    const update_user = (data) => {
        
        const user_update = {
            name: data.name,
            phone: data.phone,
            password: document.getElementById('password').value,
            rfc: data.rfc
        }
        
        
        axios.put(`api/user/${props.id}`, user_update)
        .then( response => console.log(response) )
        .catch( error => console.log(error) )
        
    }
    
</script>

<template>
    <form @submit.prevent="update_user(user)">
        <div>
            <label for="staticEmail" class="col-sm-2 col-form-label">Nombre</label>
            <input type="text" class="form-control" v-model="user.name" name="name">
        </div>
        <div>
            <label for="exampleInputEmail1" class="form-label mt-4">Phone</label>
            <input type="text" class="form-control" placeholder="xxx-xxx-xxxx" v-model="user.phone" name="phone">
        </div>
        <div>
            <label for="exampleInputPassword1" class="form-label mt-4">Password</label>
            <input type="password" class="form-control"  placeholder="Password" id="password" name="password">
        </div>
        <div>
            <label for="exampleInputPassword1" class="form-label mt-4">RFC</label>
            <input type="text" class="form-control"  placeholder="Password" v-model="user.rfc" name="rfc">
        </div>
        <div>
            <button type="submit" class="btn btn-primary mt-3 bt-lg">Update</button>
        </div>
    </form>
</template>