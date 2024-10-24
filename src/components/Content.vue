<script setup>
import axios from 'axios'
import { ref, onMounted, reactive } from 'vue'
import { useAuthStore } from '../stores/auth'
import { show_alert, confirmation } from "@/functions";
import { useRouter, useRoute } from "vue-router";
import { BButton, BModal } from 'bootstrap-vue-next'
import Edit from './Edit.vue';
import { RouterLink, RouterView } from 'vue-router'

import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net';
import DataTableLib from 'datatables.net-bs5';
import Buttons from 'datatables.net-bs5';
import ButtonsHtml5 from 'datatables.net-buttons/js/buttons.html5';
import print from 'datatables.net-buttons/js/buttons.print';
import pdfmake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';


import JsZip from 'jszip';

window.JsZip = JsZip;

DataTable.use(DataTableLib);
DataTable.use(pdfmake);
DataTable.use(ButtonsHtml5);

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.token



onMounted( () => {
    gethomeworks()
})

const list_users = ref([])

const show = ref(false)
const load = ref(false)

const columns = [
  {
    data:null,
    render:function(data,type,row,meta){
      return (meta.row + 1)
    }
  },
  { data: 'name' },
  { data: 'phone' },
  { data: 'email' },
  { data: 'rfc' },
  {
    data:null,
    render:function(data,type,row,meta){
      return "<button class='btn btn-warning text-white' @click=' deleteHomework(" + data.id + ")'>Update</button>"
    }
  },
  {
    data:null,
    render:function(data,type,row,meta){
      return '<button class="btn btn-danger text-white" @click=" deleteHomework(' + data.id + ')">Delete</button>'
    }
  },
  
];

const gethomeworks =  async () => {
    axios.get('api/users').then( (response) => {
        console.log(response.data.data)
        list_users.value = response.data.data
        load.value = true
    }).catch( (errors) =>{
        console.log(errors)
    })
}
const deleteHomework = (id,name) => {
    confirmation(name, ('api/user/'+id), '/home')
}
const showModal = () => {
    modalOpen.value = true;
    console.log(modalOpen)
}
</script>

<template>
    <div class="wrapper d-flex flex-column min-vh-100"  v-if="authStore.user">
        <header class="header header-sticky p-0 mb-4">
        <div class="container-fluid border-bottom px-4">
          <button class="header-toggler" type="button"  style="margin-inline-start: -14px;">
            <svg class="icon icon-lg">
              
            </svg>
          </button>
          <ul class="header-nav d-none d-lg-flex">
            <li class="nav-item"><a class="nav-link" href="#">Dashboard</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Users</a></li>
            <form class="d-flex">
                <button class="btn btn-secondary" type="submit" @click="authStore.logout()">Cerrar Sesion</button>
            </form>
          </ul>
          <ul class="header-nav ms-auto">
            <li class="nav-item"><a class="nav-link" href="#">
                <svg class="icon icon-lg">
                  
                </svg></a></li>
            <li class="nav-item"><a class="nav-link" href="#">
                <svg class="icon icon-lg">
                  
                </svg></a></li>
            <li class="nav-item"><a class="nav-link" href="#">
                <svg class="icon icon-lg">
                  
                </svg></a></li>
          </ul>
          <ul class="header-nav">
            <li class="nav-item py-1">
              <div class="vr h-100 mx-2 text-body text-opacity-75"></div>
            </li>
            <li class="nav-item dropdown">
              <button class="btn btn-link nav-link py-2 px-2 d-flex align-items-center" type="button" aria-expanded="false" data-coreui-toggle="dropdown">
                <svg class="icon icon-lg theme-icon-active">
                  
                </svg>
              </button>
              <ul class="dropdown-menu dropdown-menu-end" style="--cui-dropdown-min-width: 8rem;">
                <li>
                  <button class="dropdown-item d-flex align-items-center" type="button" data-coreui-theme-value="light">
                    <svg class="icon icon-lg me-3">
                      
                    </svg>Light
                  </button>
                </li>
                <li>
                  <button class="dropdown-item d-flex align-items-center" type="button" data-coreui-theme-value="dark">
                    <svg class="icon icon-lg me-3">
                      
                    </svg>Dark
                  </button>
                </li>
                <li>
                  <button class="dropdown-item d-flex align-items-center active" type="button" data-coreui-theme-value="auto">
                    <svg class="icon icon-lg me-3">
                      
                    </svg>Auto
                  </button>
                </li>
              </ul>
            </li>
            <li class="nav-item py-1">
              <div class="vr h-100 mx-2 text-body text-opacity-75"></div>
            </li>
            <li class="nav-item dropdown"><a class="nav-link py-0 pe-0" data-coreui-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                <div class="avatar avatar-md"><img class="avatar-img" src="@/assets/img/avatars/8.jpg" alt="user@email.com"></div></a>
              <div class="dropdown-menu dropdown-menu-end pt-0">
                <div class="dropdown-header bg-body-tertiary text-body-secondary fw-semibold rounded-top mb-2">Account</div><a class="dropdown-item" href="#">
                  <svg class="icon me-2">
                    
                  </svg> Updates<span class="badge badge-sm bg-info ms-2">42</span></a><a class="dropdown-item" href="#">
                  <svg class="icon me-2">
                    
                  </svg> Messages<span class="badge badge-sm bg-success ms-2">42</span></a><a class="dropdown-item" href="#">
                  <svg class="icon me-2">
                    
                  </svg> Tasks<span class="badge badge-sm bg-danger ms-2">42</span></a><a class="dropdown-item" href="#">
                  <svg class="icon me-2">
                    
                  </svg> Comments<span class="badge badge-sm bg-warning ms-2">42</span></a>
                <div class="dropdown-header bg-body-tertiary text-body-secondary fw-semibold my-2">
                  <div class="fw-semibold">Settings</div>
                </div><a class="dropdown-item" href="#">
                  42</a>
                <div class="dropdown-divider"></div><a class="dropdown-item" href="#">
                  <svg class="icon me-2">
                    
                  </svg> Lock Account</a><a class="dropdown-item" href="#">
                  <svg class="icon me-2">
                    
                  </svg> Logout</a>
              </div>
            </li>
          </ul>
        </div>
        <div class="container-fluid px-4">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb my-0">
              <li class="breadcrumb-item"><a href="#">Home</a>
              </li>
              <li class="breadcrumb-item active"><span>Dashboard</span>
              </li>
            </ol>
          </nav>
        </div>
      </header>
      <div class="body flex-grow-1">
        <div class="container-lg px-4">
            <div class="row g-4 mb-4">
                <div class="col-sm-6 col-xl-3">
                    <div class="card text-white bg-primary">
                        <div class="card-body pb-0 d-flex justify-content-between align-items-start">
                            <div>
                                <div class="fs-4 fw-semibold">26K <span class="fs-6 fw-normal">(-12.4%)</span></div>
                                <div>Users</div>
                            </div>
                            <div class="dropdown">
                                <button class="btn btn-transparent text-white p-0" type="button" data-coreui-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <svg class="icon">
                                    
                                </svg>
                                </button>
                                <div class="dropdown-menu dropdown-menu-end"><a class="dropdown-item" href="#">Action</a><a class="dropdown-item" href="#">Another action</a><a class="dropdown-item" href="#">Something else here</a></div>
                            </div>
                            </div>
                            <div class="c-chart-wrapper mt-3 mx-3" style="height:70px;">
                            <canvas class="chart" id="card-chart1" height="70"></canvas>
                            </div>
                    </div>
                </div>
                <!-- /.col-->
                <div class="col-sm-6 col-xl-3">
                    <div class="card text-white bg-info">
                        <div class="card-body pb-0 d-flex justify-content-between align-items-start">
                        <div>
                            <div class="fs-4 fw-semibold">$6.200 <span class="fs-6 fw-normal">(40.9%)</span></div>
                            <div>Income</div>
                        </div>
                        <div class="dropdown">
                            <button class="btn btn-transparent text-white p-0" type="button" data-coreui-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <svg class="icon">
                                
                            </svg>
                            </button>
                            <div class="dropdown-menu dropdown-menu-end"><a class="dropdown-item" href="#">Action</a><a class="dropdown-item" href="#">Another action</a><a class="dropdown-item" href="#">Something else here</a></div>
                        </div>
                        </div>
                        <div class="c-chart-wrapper mt-3 mx-3" style="height:70px;">
                        <canvas class="chart" id="card-chart2" height="70"></canvas>
                        </div>
                    </div>
                </div>
                <!-- /.col-->
                <div class="col-sm-6 col-xl-3">
                    <div class="card text-white bg-warning">
                        <div class="card-body pb-0 d-flex justify-content-between align-items-start">
                        <div>
                            <div class="fs-4 fw-semibold">2.49% <span class="fs-6 fw-normal">(84.7%)</span></div>
                            <div>Conversion Rate</div>
                        </div>
                        <div class="dropdown">
                            <button class="btn btn-transparent text-white p-0" type="button" data-coreui-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <svg class="icon">
                                
                            </svg>
                            </button>
                            <div class="dropdown-menu dropdown-menu-end"><a class="dropdown-item" href="#">Action</a><a class="dropdown-item" href="#">Another action</a><a class="dropdown-item" href="#">Something else here</a></div>
                        </div>
                        </div>
                        <div class="c-chart-wrapper mt-3" style="height:70px;">
                        <canvas class="chart" id="card-chart3" height="70"></canvas>
                        </div>
                    </div>
                </div>
            <!-- /.col-->
                <div class="col-sm-6 col-xl-3">
                    <div class="card text-white bg-danger">
                        <div class="card-body pb-0 d-flex justify-content-between align-items-start">
                        <div>
                            <div class="fs-4 fw-semibold">44K <span class="fs-6 fw-normal">(-23.6%)</span></div>
                            <div>Sessions</div>
                        </div>
                        <div class="dropdown">
                            <button class="btn btn-transparent text-white p-0" type="button" data-coreui-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <svg class="icon">
                                
                            </svg>
                            </button>
                            <div class="dropdown-menu dropdown-menu-end"><a class="dropdown-item" href="#">Action</a><a class="dropdown-item" href="#">Another action</a><a class="dropdown-item" href="#">Something else here</a></div>
                        </div>
                        </div>
                        <div class="c-chart-wrapper mt-3 mx-3" style="height:70px;">
                        <canvas class="chart" id="card-chart4" height="70"></canvas>
                        </div>
                    </div>
                </div>
            <!-- /.col-->
            </div>
          <!-- /.row-->
          <div class="card mb-4">
            <div class="card-header">
                <h4>List of Users</h4>
            </div>
            <div class="card-body">
              <DataTable  :data="list_users" :columns="columns"  class="table table-hover" :options="{responsive:true, dom:'Bfrtip'}" >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>RFC</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
              </DataTable>
            </div>

          </div>
          <!-- /.card-->
            
          
        </div>
      </div>
      <footer class="footer px-4">
        <div class="ms-auto">Created by&nbsp;<a href="#">Bollillo Tech</a></div>
      </footer>
    </div>

</template>