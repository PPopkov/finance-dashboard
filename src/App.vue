<template>
  <div id="app">
    <nav>
      <router-link to="/incomes">Incomes</router-link> |
      <router-link to="/orders">Orders</router-link> |
      <router-link to="/sales">Sales</router-link> |
      <router-link to="/stocks">Stocks</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 20px;
}

nav {
  padding: 20px 0;
  margin-bottom: 30px;
  text-align: center;
  border-bottom: 1px solid #eee;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 0 10px;
  padding: 5px 10px;
  border-radius: 4px;
}

nav a.router-link-active {
  color: #42b883;
  background-color: #f5f5f5;
}
</style>
