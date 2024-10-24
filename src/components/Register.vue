<script setup>
import { RouterLink } from 'vue-router'

import { useAuthStore } from '../stores/auth'
const authStore = useAuthStore()


const submitHandler = (data) => {
  authStore.sing(data)
}

</script>

<template>

    <div class="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="card mb-4 mx-4">
              <div class="card-body p-4">
                <h1>Register</h1>
                <p class="text-body-secondary">Create your account</p>             
                <FormKit 
                  type="form"
                  form-class="form-group mx-auto p-3 border rounded"
                  @submit="submitHandler"
                  submit-label="Create Account"
                  :submit-attrs="{
                    inputClass: 'btn btn-block btn-primary px-4 text-white'
                  }"
                >
                  <div class="input-group mb-3">
                    <div class="col-md-12">
                      <FormKit type="text"
                        name="name"
                        placeholder="Name"
                        input-class="form-control"
                        label="Name"
                        label-class="form-label"
                        validation="required"
                      >
                      </FormKit>
                    </div>
                  </div>
                  <div class="input-group mb-3 ">
                    <div class="col-md-12">
                      <FormKit type="tel"
                        name="phone"
                        placeholder="xxx-xxx-xxxx"
                        input-class="form-control"
                        label="Phone Number"
                        label-class="form-label"
                        validation="required|matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
                      >
                      </FormKit>
                    </div>
                  </div>
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
                          label="Password"
                          validation="required"
                          input-class="form-control"
                          label-class="form-label"
                      />
                    </div>
                  </div>
                  <div class="input-group mb-4">
                    <div class="col-md-12">
                      <FormKit
                        type="password"
                        label="Confirm password"
                        name="password_confirm"
                        validation="required|confirm"
                        input-class="form-control"
                          label-class="form-label"
                      />
                    </div>
                  </div>
                  <div class="input-group mb-4">
                    <div class="col-md-12">
                        <FormKit type="text"
                          name="rfc"
                          placeholder="RFC"
                          input-class="form-control"
                          label="RFC"
                          label-class="form-label"
                          validation="required"
                        >
                        </FormKit>
                    </div>
                  </div>
                  <div class="input-group mb-4">
                    <div class="col-md-12">
                      <FormKit type="text"
                        name="notes"
                        placeholder="Notes"
                        input-class="form-control"
                        label="Notes"
                        label-class="form-label"
                        validation="required"
                      >
                      </FormKit>
                    </div>
                  </div>
                  
                      <div class="col-6 text-end">
                          <RouterLink to="/login">
                              <button class="btn btn-link px-0" type="button">Go Back</button>
                          </RouterLink>
                      </div>
                  
                </Formkit>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

</template>
