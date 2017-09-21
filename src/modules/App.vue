<template>
  <div id="app">
    <html-header></html-header>
    <router-view class="view" keep-alive translate transition-mode="out-in"></router-view>
    <html-footer></html-footer>
  </div>
</template>

<script>
  import HtmlHeader from 'components/header'
  import HtmlFooter from 'components/footer'
  export default {
    components: {
      HtmlHeader,
      HtmlFooter
    }
  }
</script>

<style>

</style>
