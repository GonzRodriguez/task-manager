<template>
  <div>
    <v-text-field
      label="Journal"
      single-line
      solo
    ></v-text-field>
      <v-textarea
      v-model="value"
      color="teal"
    >
      <template v-slot:label>
        <div>
          Bio <small>(optional)</small>
        </div>
      </template>
    </v-textarea>
  </div>

</template>
<script>
export default {
  data (){
    value: ""
  }
}
</script>
<style>
  
</style>