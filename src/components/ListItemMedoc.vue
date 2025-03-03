<script setup>
defineProps(["medicament", "index"]);

function getPhotoUrl(photo) {
  if (!photo) {
    return null
  }
  return `https://apipharmacie.pecatte.fr/images/${photo}`;
}

</script>

<template>
  <tr>
    <td>{{ medicament.denomination }}</td>
    <td>{{ medicament.formepharmaceutique }}</td>
    <td>{{ medicament.qte }}</td>
    <td class="actionBtn">
      <img :src="getPhotoUrl(medicament.photo)" alt="Photo" class="photo" />
    </td>
    <td>
      <img @click="$emit('eventDelete', medicament.id)" src="@/assets/delete.jpeg" alt="delete" class="imgBtn" />
      <img @click="$emit('eventUpdate', medicament)" src="@/assets/update.png" alt="update" class="imgBtn" />
      
      <div class="buttons-container">
        <button @click="$emit('eventPlusOne', index)" class="btn">+1</button>
        <button @click="$emit('eventMinusOne', index)" class="btn">-1</button>
      </div>
      
    </td>
  </tr>
</template>

<style scoped>
td{
  padding: 10px;
  text-align: left;
}
tr{
  background: #f9f9f9;
}
.photo {
  width: 6em;
  height: 6em;
  border-radius: 5px;
}

.buttons-container {
  display: flex;
  gap: 10px; /* Espace entre les boutons */
  align-items: center;
}
.imgBtn {
  width: 25px;
  height: 25px;
  margin-right: 30px;
  cursor: pointer;
}
.imgBtn:hover {
  transform: scale(1.2); /* zoom au survol */
}
button.btn {
  padding: 5px 10px;
  margin: 0 5px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
 
}
button.btn:hover {
  background-color: #218838;
  transform: scale(1.1);
}
</style>