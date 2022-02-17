<template>
  <div  id="app">
    <Navbar/>
    <div class="container-fluid">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
@import '~bootstrap/dist/css/bootstrap.min.css';
@import "src/assets/variables.scss";

</style>
<style scoped>

.container-fluid {
    padding: 1rem;
}

</style>

<script>
import Navbar from '@/components/Navbar'

export default{
  components:{Navbar}
}
  
</script>
