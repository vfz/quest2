<template>
  <div class="row">
    <div class="col">
      <!-- <h1>Задачи {{lim}}</h1> -->
      <form class="row g-3">
        <div class="col-md-2">
          <div class="input-group">
            <span class="input-group-text">🔎</span>
            <input type="text" v-model="SearchNum"  class="form-control" placeholder="Номер заявки" >
          </div>
        </div>

        <div class="col-md-2">
          <div class="input-group">
            <span class="input-group-text">🔎</span>
            <input type="text" v-model="SearchOrg"  class="form-control" placeholder="Наименование клиента" >
            </div>
        </div>

        <div class="col-sm-2">
          <select v-model="lim" v-on:change="getTasks(lim)" class="form-select form-select" >
            <option value='1'>Показать 1 запись</option>
            <option value='2'>Показать 2 записи</option>
            <option value='3'>Показать 3 записи</option>
            <option v-for="optlim in 5" :key="optlim"  :value='optlim*10'>Показать {{optlim*10}} записей</option>
            <option value='all'>Показать Все</option>
            </select>
        </div>
      </form>  

      <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-6 g-3 mt-4">
        <!--Генерация карточки с заявкой (итерацией массива с заявками)-->
        <!-- Фильтрация по номеру требует строго равенства -->
        <div class="col" v-for="task in allTasks" :key="task.id"  v-show="(SearchNum===task.id || !SearchNum) && (SearchOrg && searchOrg(task.NameOrg,SearchOrg) || !SearchOrg)">
          <div class="card task-card"  v-on:click="task.info=!task.info">
            <div class="card-body">
              <div class="card-check">
                <input class="form-check-input task-check" type="checkbox" 
                  v-on:click="task.Statuscheck=!task.Statuscheck"
                  v-show="task.info"
                  :checked="task.Statuscheck==1"
                  >
                <h5 class="card-task-name">{{task.Task}}</h5>
              </div>
              <span class="">{{task.summ}} руб.</span>

              <div class="card-client-name">{{task.NameOrg}}</div>
              <span class="card-client-inn">{{task.innOrg}}</span>
            </div>
            <div class=""  v-show="task.info">
              <div class="task-status">
                <span class="badge rounded-pill bg-secondary" v-for="status in task.status" :key="status" >{{status}}</span> 
                </div>
              <div class="card-employee-name">{{task.employee}}</div>
              <div class="task-tegs">
                <span class="badge rounded-pill bg-secondary" v-for="tag in task.tags" :key="tag">{{tag}}</span>
              </div>
            </div>
            <div class="task-id-date">
              <span class="task-id">{{task.id}}</span>
              <span class="task-date">от {{new Date(task.DateTask).toLocaleDateString()}}</span>
            </div>
          </div>
        </div>
        <!-- /Генерация карточки с заявкой (итерацией массива с заявками)-->
      </div>
    </div>
  </div>
</template>
<style lang="sass" scoped>
.task-card
  border-radius: .45rem;
  box-shadow: .1rem .1rem #f4f5f7;
  position: relative;
  cursor: pointer;

.task-card:hover 
  background-color: #f2f7ff

.task-check
  position: absolute;
  margin-right: 20px;
  right: 0;

.card-client-inn
  color: grey;
  font-size: .8em;

.card-client-name
   font-size: .9em;
   margin-top: .4em;

.card-task-name
  font-size: 1em;
  padding-right: 20px;

.card-employee-name
  font-size: .9em;
  background-color: rgba(226, 226, 226, 0.644);
  padding: 1em;
  padding-left: 2em;
  margin: 0;

.task-id-date
  color: grey;
  font-size: .8em;
  padding: .5rem .5rem;

.task-id
  padding-right: 2em;
  padding-left: 1em;

.task-tegs
  margin: .9em;

.task-status
  padding: 0.5em;

.badge
  margin: .35em;
  padding: .7em 1em;

</style>
<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  name: 'List',
  data(){
    return {
      SearchOrg:'',
      SearchNum:'',
      lim:2
    }
  },
  computed: mapGetters(['allTasks']),
  methods: {
    ...mapActions(['getTasks']),
    searchOrg(str,target){
      //Вариант поиска по наименованию клиента ЗАВИСИМЫЙ от регистра
      //return str.indexOf(target)+1

      //Вариант поиска по наименованию клиента НЕзависимый от регистра
      return str.toLowerCase().indexOf(target.toLowerCase())+1
    },

  },
  async mounted(){
    this.getTasks(this.lim);
  },


  



  components: {
    
  }
}
</script>
