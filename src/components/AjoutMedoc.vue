<script setup>
import { ref } from "vue";
import { defineEmits } from 'vue';

const urlPharma = "https://apipharmacie.pecatte.fr/api/3/medicaments";
const nom = ref("");
const formepharmaceutique = ref("");
const qte = ref(0);
const message = ref("");
const photo = ref(null);
const emit = defineEmits(['medicamentAjoute']);
const fileInput = ref(null); // Référence pour l'input de type fichier

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    photo.value = reader.result;
  };
  reader.readAsDataURL(file);
}

function handlerAdd() {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const medicamentData = {
    denomination: nom.value,
    formepharmaceutique: formepharmaceutique.value,
    qte: qte.value,
  };

  if (photo.value) {
    medicamentData.photo = photo.value;
  }

  fetch(urlPharma, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(medicamentData),
  })
    .then((response) => response.json())
    .then((dataJSON) => {
      if (dataJSON.status === 1) {
        message.value = "Médicament ajouté avec succès !";
        emit('medicamentAjoute'); // événement emis
        resetForm();
      } else {
        message.value = `Erreur : ${dataJSON.message}`;
      }
    })
    .catch((error) => {
      console.error("Erreur lors de l'ajout :", error);
      message.value = "Erreur lors de l'ajout du médicament.";
    });
}

function resetForm() {
  nom.value = "";
  formepharmaceutique.value = "";
  qte.value = 0;
  photo.value = null;
  message.value = "";
  if (fileInput.value) {
    fileInput.value.value = ""; // Réinitialise le champ de type fichier
  }
}
</script>

<template>
    <form @submit.prevent="handlerAdd">
      <fieldset>
        <legend>Nouveau Médicament</legend>
      <label for="nom">Nom du médicament :</label>
      <input id="nom" v-model="nom" required />

      <label for="forme">Forme pharmaceutique :</label>
      <select id="forme" v-model="formepharmaceutique" required>
        <option value="">Sélectionner une forme</option>
        <option value="Comprimé">Comprimé</option>
        <option value="Gélule">Gélule</option>
        <option value="Effervescent">Effervescent</option>
        <option value="Liquide">Liquide</option>
        <option value="Liquide">Liquide</option>
      </select>

      <label for="qte">Quantité :</label>
      <input id="qte" v-model="qte" type="number" min="0" required />

      <label for="photo">Photo :</label>
      <input id="photo" ref="fileInput" @change="handleFileUpload" type="file" accept=".png, .jpg, .jpeg"/>

      <button type="submit">Ajouter</button>
      </fieldset>
    </form>
    <p class="message">{{ message }}</p>

</template>

<style>
form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: #f9f9f9;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

legend {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 10px;
}

label {
  display: block;
  font-weight: bold;
  margin-top: 10px;
}

input, #forme {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  display: block;  
  margin: 15px auto; 
  margin-top: 15px;
  padding: 10px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  width: 35%;
}

button:hover {
  background: #218838;
}

.message {
  margin-top: 10px;
  font-weight: bold;
  color: #155724;
}

</style>