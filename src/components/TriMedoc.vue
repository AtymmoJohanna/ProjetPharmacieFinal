<script setup>
import { ref } from 'vue'

const tri = ref('')

const emit = defineEmits(['eventTri'])

function onTriChange() {
  emit('eventTri', tri.value)
}
</script>

<template>
  <div class="tri-container">
    <label for="tri">Trier par :</label>
    <select id="tri" v-model="tri" @change="onTriChange">
      <option value="">-- Sélectionner --</option>
      <option value="nom_asc">Nom (A-Z)</option>
      <option value="nom_desc">Nom (Z-A)</option>
      <option value="qte_asc">Quantité (croissante)</option>
      <option value="qte_desc">Quantité (décroissante)</option>
      <option value="comprime">Forme : Comprimé</option>
      <option value="effervescent">Forme : Effervescent</option>
      <option value="liquide">Forme : Liquide</option>
      <option value="gellule">Forme : Gélule</option>
    </select>
  </div>
</template>

<style scoped>
.tri-container {
  display: flex;
  padding: 10px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  margin-right: 5px;
  
}

select {
  width: 20%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background: white;
  font-size: 15px;
}

select:focus {
  border-color: #28a745;
  outline: none;
  box-shadow: 0 0 5px rgba(40, 167, 69, 0.5);
}
</style>