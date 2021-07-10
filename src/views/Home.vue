<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
        <v-hover v-slot:default="{ hover }">
          <v-card :elevation="hover ? 16 : 2" :style="hover? 'cursor: pointer': '' ">
            <v-card-text @click="navigateTo(card.title.toLowerCase())">
              <h2 style="color:black" class="text-center">{{card.title}}</h2>
              <h2
                style="color:black; margin-top:20px; height: 50px"
                class="text-center"
              >{{card.quantity}}</h2>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: "Home",
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
