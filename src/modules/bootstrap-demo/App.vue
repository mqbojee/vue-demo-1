<template>
  <div id="app">
    <html-header></html-header>
    <hello></hello>
    <html-footer></html-footer>
  </div>
</template>

<script>
  import Hello from 'components/Hello'
  import HtmlHeader from 'components/header'
  import HtmlFooter from 'components/footer'

  export default {
    name: 'app',
    components: {
      Hello,
      HtmlHeader,
      HtmlFooter
    }
  }
</script>

<style>

</style>
