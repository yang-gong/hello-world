<template>
<div id="app">
    <router-view></router-view>

</div>
</template>

<script>
export default {
    name: 'App',
    components: {

    }
}
</script>

<style>
html,
body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    height: 100%;
}

router-link {
    color: blue;
    size: 20px;
}
</style>
