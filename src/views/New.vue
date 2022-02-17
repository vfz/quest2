<template>
<div class="row">
 
  <div class="col-md-6 offset-md-3 bg-info">
    <h2>Новая задача</h2>
       
    <div class="alert alert-danger alert-dismissible" role="alert" v-show="errorStatus">
      Произошла ошибка: {{errorMessage}}
    </div>
     <div class="alert alert-success alert-dismissible" role="alert" v-show="successStatus">
      Сообщение от сервера: {{successMessage}}
    </div>

    <form @submit.prevent="saveNewTask" class="was-validated">
      <div class="col">
        <div class="input-group" >
          <span class="input-group-text">Задача</span>
          <input type="text" class="form-control" v-model="Task" required="required">
          <div class="invalid-feedback">Опишите задачу</div>
        </div>
      </div>

      <div class="col">
        <div class="input-group">
          <span class="input-group-text">Сумма</span>
          <input type="text" class="form-control" v-model="summ" required="required">
          <div class="invalid-feedback">Укажите сумму</div>
        </div>
      </div>

      <div class="col">
        <div class="input-group">
          <span class="input-group-text">Клиент</span>
          <input type="text" class="form-control" v-model="NameOrg" required="required">
          <div class="invalid-feedback">Заполните наименование клиента</div>
          
        </div>
      </div>
      <div class="col">
        <div class="input-group">
          <span class="input-group-text">ИНН клиента</span>
          <input type="text" class="form-control" v-model="innOrg" required="required">
          <div class="invalid-feedback">Заполните ИНН клиента</div>
        </div>
      </div>
      <div class="col">
        <div class="input-group">
          <span class="input-group-text">Исполнитель</span>
          <select class="form-select" v-model="employer" required="required">
            <option v-for="employer in employers" :key="employer.id">{{employer.fio}}</option>
          </select>
          <div class="invalid-feedback">Назначте исполнителя</div>
        </div>
      </div>
      <div class="col offset-md-10">
        <button class="btn btn-primary" type="submit">Записать задачу</button>
      </div>
    </form>
  </div>
</div>
</template>

<style lang="sass" scoped>
.col
  .input-group
  margin-top: 0.5rem
  margin-bottom: 0.5rem

</style>

<script>
import axios from 'axios'
export default {
  name: 'New',
  data(){
    return{
      Task:'',
      summ:'',
      NameOrg:'',
      innOrg:'',
      status:'Новая',
      tags:'',
      employers:[{id:1,fio:"Иванов.С.Е."},{id:2,fio:"Тарасов.К.И."},{id:3,fio:"Костерюков.И.С."},{id:4,fio:"Солодова.Е.П."}],
      employer:'Тарасов.К.И.',
      errorMessage:'',
      successMessage:'',
      errorStatus:false,
      successStatus:false,
      Message:''
      
    }
  },
  methods:{
    cleanForm(){
      this.Task='';
      this.summ='';
      this.NameOrg='';
      this.innOrg='';
      this.employer='Тарасов.К.И.';
    },
   async saveNewTask(){
      const task = {
        "Task":this.Task,
        "Statuscheck":"0",
        "summ":this.summ,
        "NameOrg":this.NameOrg,
        "innOrg":this.innOrg,
        "status":this.status,
        "employee":this.employer,
        "tags":this.tags,
        "DateTask":new Date().toLocaleDateString()
        };
      
      
      await axios({
          method: 'post',
          url: 'https://test.evrotrans.net/API/quest2_save_task.php',
          
          data: task,
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
        .then((response) =>{
          console.log('Ответ сервера успешно получен!');
          console.log(response.data);
          //this.Message=response.data;
          
          this.successMessage=(response.data[1]===null) ? "Данные внесены успешно": '';
          this.errorMessage=(response.data[1]===null) ? '': 'Произошла ошибка при записи в базу '+response.data;

          this.successStatus=(response.data[1]===null) ? true: false;
          this.errorStatus=(response.data[1]===null) ? false: true;

          if(response.data[1]===null){
            this.cleanForm();
          }
          
        })
        .catch((error) =>{
          console.log(error);
          this.errorMessage=error;
          this.errorStatus=true;
        });
    }
  },
  
}
</script>
