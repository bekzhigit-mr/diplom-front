<template>
  <div class="main">
    <div class="sidebar">
      <div class="logo">
        Қалдық қойма мониторингі
      </div>
      <ul>
        <li @click="activeTab = tab.name" v-for="(tab, key) in tabs" :key="key" :class="tab.name === activeTab ? 'active' : ''">{{ tab.title }}</li>
      </ul>
    </div>
    <div class="content">
        <div style="padding: 10px 50px; font-weight: 700; font-size: 18px; color: #000" class="header">
            Негізгі бет / Есептеу
        </div>
        <main-page :arrRoK="arrRoK" :data="data" v-if="activeTab === 'main'"></main-page>
        <div v-else-if="activeTab === 'models'"></div>
        <div style="width: 100%; height: 100%; display: flex; justify-content: center; padding-top: 50px; padding-bottom: 50px" class="calculate_page" v-else-if="activeTab === 'calculate'">
            <div style="width: 600px; padding: 20px 40px; border-radius: 10px; border: 1px solid #c7c7c7; background-color: #d3d7dc">
                <h2 style="padding-bottom: 50px; color: #000">
                    Есептеу параметрлерін енгізіңіз
                </h2>
                <div style="margin-bottom: 20px">
                    <span style="color: #7a7a7a; font-size: 16px; padding-left: 5px; padding-bottom: 5px">Зарядтың таралу бұрышы</span>
                    <el-input v-model="params.par1" size="medium" placeholder="Параметр-1"></el-input>
                </div>
                <div style="margin-bottom: 20px">
                    <span style="color: #7a7a7a; font-size: 16px; padding-left: 5px; padding-bottom: 5px">Модель</span>
                    <el-input v-model="params.par2" size="medium" placeholder="Параметр-2"></el-input>
                </div>
                <div style="margin-bottom: 20px">
                    <span style="color: #7a7a7a; font-size: 16px; padding-left: 5px; padding-bottom: 5px">А нүктесінің (қоректендіруші электрод) орналасу қашықтығы</span>
                    <el-input v-model="params.par3" size="medium" placeholder="Параметр-3"></el-input>
                </div>
                <div style="margin-bottom: 20px">
                    <span style="color: #7a7a7a; font-size: 16px; padding-left: 3px; padding-bottom: 5px">roK</span>
                    <el-input v-model="params.par4" size="medium" placeholder="Параметр-4"></el-input>
                </div>
                <div style="margin-bottom: 20px">
                    <span style="color: #7a7a7a; font-size: 16px; padding-left: 3px; padding-bottom: 5px">Екі заряд арасындағы бөлім</span>
                    <el-input v-model="params.par5" size="medium" placeholder="Параметр-4"></el-input>
                </div>
                <div style="display: flex; justify-content: end ">
                    <el-button @click="calculateParams" round type="primary" size="medium">Есептеу</el-button>
                </div>
            </div>
            <div  id="chart"></div>
        </div>
    </div>
  </div>
</template>

<script>
import MainPage from "@/pages/MainPage.vue"
// import Plotly from 'plotly.js-dist'
import axios from "axios";

export default {
  name: 'App',
  components: {
    MainPage,
  },
  data() {
    return {
        activeTab: "calculate",
        tabs: [
            {
                title: "Негізгі бет",
                id: "1",
                name: "main",
            },
            {
                title: "Есептеу",
                id: "3",
                name: "calculate",
            }
        ],
        params: {
            par1: "",
            par2: "",
            par3: "",
            par4: "",
            par5: "",
        },
        data: null,
        arrRoK: null,
    }
  },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
          axios.get('http://185.116.194.87/calculated_data').then((res) => {
              console.log("res", res)
              this.data = res.data[0].data;
              let arrRoK = []
              res.data.forEach(d => {
                  arrRoK.push(d.data[2]);
              })
              this.arrRoK = arrRoK;
          })
      },
      calculateParams() {
          console.log("params", this.params)
          axios.post('http://185.116.194.87/calculate', {
              params: this.params
          }).then((res) => {
              console.log("res", res)
              this.data = res.data.data;
              this.activeTab = "main";
          })
      },
    }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;

  box-sizing: border-box;
}
.main {
  display: flex;
  height: 100vh;
    color: #fff;
}

.sidebar {
  width: 400px;
  height: 100%;
  background-color: #313a41;
  padding: 40px 20px;
}

.logo {
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 1em;
  padding-bottom: 1em;
  border-bottom: 1px solid rgb(224, 224, 224);
}

ul {
    margin-top: 50px;
  list-style: none;
  padding-bottom: 1em;
  margin-bottom: 1em;

}

li {
  margin-bottom: 1em;
  padding: 7px 20px;
  border-radius: 5px;

  transition: all .3s ease;
}

li:hover {
  background-color: rgb(33, 142, 231);
  
  cursor: pointer;
}

.active {
  background-color: rgb(33, 142, 231);
  color: #fff;
}

.content {
  width: 100%;
  height: 100%;
  overflow: auto;
    display: flex;
    flex-direction: column;
}

.header {
    border-bottom: 1px solid #d0d0d0;
    flex-shrink: 0;
    background-color: #f8f8f8;
}

/*.calculate_page {*/
/*  background-color: #e3d6d6;*/
/*}*/
</style>
