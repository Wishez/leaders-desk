<template>
  <div id="app">
    <router-view/>

    <footer>
      Да прибудет с вами сила ваших лидеров!
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  line-height: 1.5;
}

footer {
  text-align: right;
  padding-bottom: 2em;
}

  .button {
    transition-duration: 250ms;
    transition-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
    transition-property: transform, opacity;
    will-change: transform, opacity;
    position: relative;
    padding: 1em 2em;
    margin-bottom: 2em;
    border: 0;
    border-radius: 67px 24px 30px 30px / 43px 127px 34px 52px;
    background-image: linear-gradient(to bottom, deeppink 0%, darkblue 50%, deeppink 100%);
    background-image: conic-gradient(deeppink 0%, darkblue 50%, deeppink 100%);
    color: #f7f7f7;
    font-size: 18px;
    font-weight: bold;
  }

  .button:hover {
    transform: scale(1.05);
  }

  .button:active {
    transform: scale(1.05) translateY(4px);
  }

</style>
