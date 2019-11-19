<template>
  <div >
    <app-navigation></app-navigation>
    <router-view/>
  </div>
</template>

<script>
import Navigation from "./components/Navigation"
export default {
  name: 'App',
  components:{
    appNavigation: Navigation
  }
}
</script>

<style>

</style>
