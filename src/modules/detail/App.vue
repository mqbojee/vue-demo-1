<template>
  <div id="app">
    <html-header></html-header>
    <img src="./images/logo.png">
    <h2>详情内容</h2>
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
