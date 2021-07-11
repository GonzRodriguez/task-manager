<template>
  <div class="notebooks">
    <h1>This is an notebooks page</h1>
  </div>
</template>

<script>

export default {
  name: "notebooks",
  data: () => ({
    cards: [],
  }),
  created() {
    console.log(this.$store);
  },
  methods: {
      navigateTo(route) {
      if (this.$route.name !== route) {
        this.$router.push({ name: route }).catch((error) => {
          console.log(error);
        })
      }
    },
  }
}
</script>