<template>
  <div class="note">
    <h1>This is an about page</h1>
  </div>
</template>

<script>

export default {
  name: "notes",
  data: () => ({
    cards: [],
  }),
  created() {
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