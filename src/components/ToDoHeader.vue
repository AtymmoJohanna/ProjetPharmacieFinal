<script setup>
import { ref } from 'vue'
import listMedoc from './ListMedoc.vue'
import triMedoc from './TriMedoc.vue'
import searchMedoc from './searchMedoc.vue'

const motcle =ref('');
const triCritere = ref('');

function handlerRecherche(texte) {
    motcle.value = texte;
}
function handlerTri(critere) {
    triCritere.value = critere;
}

</script>
<template>
    <div class="container">
      <img src="@/assets/logoPharm.png" alt="Johanna'Pharm logo" class="header-image">
      <div class="search-tri-container">
        <searchMedoc @eventSubmit="handlerRecherche"></searchMedoc>
        <triMedoc @eventTri="handlerTri"></triMedoc>
      </div>
      <listMedoc :critere="motcle" :tri="triCritere"></listMedoc>
    </div>
</template>
<style scoped>
.header-image {
  width: 70%;
  max-height: 100px; 
  display: block;
  margin-left: auto; 
  margin-right: auto; 
}
.container {
  display: flex;
  flex-direction: column; 
  gap: 20px; 
}
</style>