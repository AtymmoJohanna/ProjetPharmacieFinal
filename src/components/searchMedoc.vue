<script setup>
import { ref } from 'vue';

const texte = ref('');
const emit = defineEmits(['eventSubmit']);

</script>

<template>
  <form @submit.prevent="$emit('eventSubmit', texte)">
    <input v-model="texte" type="text" placeholder="critere de recherche" />
    <button type="submit">Rechercher</button>
  </form>
</template>
<style scoped>
form {
  display: flex;
  gap: 10px;
  padding: 10px;
  background: none;
  border: none;
  align-items: center;
}

input {
  width: 300px; 
  height: 30px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 15px;
}

button {
  padding: 8px 15px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  transition: background-color 0.3s;
}

button:hover {
  background: #218838;
}

input:focus, button:focus {
  outline: 2px solid #5b9bd5;
}
</style>