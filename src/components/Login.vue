<script setup>

import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '../stores/auth'

  const authStore = useAuthStore()

  const submitHandler = (data) => {
    authStore.login(data)
  }


</script>

<template>
 <div class="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="card-group d-block d-md-flex row">
              <div class="card col-md-7 p-4 mb-0">
                <div class="card-body">
                  <h1>Login Into CRM</h1>
                  <p class="text-body-secondary">Sign In to your account</p>
                  <FormKit 
                    type="form"
                    form-class="form-group mx-auto p-3 border rounded"
                    @submit="submitHandler"
                    submit-label="Login"
                    :submit-attrs="{
                      inputClass: 'btn btn-block btn-primary px-4 text-white'
                    }"
                  >
                
                  
                    <div class="input-group mb-3">
                      <div class="col-md-12">
                        <FormKit type="email"
                          name="email"
                          placeholder="Email"
                          input-class="form-control"
                          label="Email"
                          label-class="form-label"
                          validation="required|email"
                        >
                        </FormKit>
                      </div>
                    </div>
                    <div class="input-group mb-4">
                      <div class="col-md-12">
                        <FormKit type="password"
                            name="password"
                            placeholder="Password"
                            label="Password"
                            validation="required"
                            input-class="form-control"
                            label-class="form-label"
                        />
                      </div>
                    </div>
                
                  </FormKit>
                  
                </div>
              </div>
              <div class="card col-md-5 text-white bg-primary py-5">
                <div class="card-body text-center">
                  <div>
                    <h2>Sign up</h2>
                    
                    <RouterLink to="/register"> 
                      <button class="btn btn-lg btn-outline-light mt-3" type="button">Register Now!</button>
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
