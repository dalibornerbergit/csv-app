<template>
  <div id="app">
    <Navbar />

    <div class="content">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style>
body {
  background: #444;
}

.content {
  min-height: calc(100vh - 100px);
}
</style>
