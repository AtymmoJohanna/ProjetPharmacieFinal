<script setup>
import { reactive, watch } from "vue";
import { ref } from "vue";
import { Medoc } from "../medoc.js";
import ListItemMedoc from "./ListItemMedoc.vue";
import AjoutMedoc from './AjoutMedoc.vue';
import { onMounted } from "vue";
const props = defineProps(["critere", "tri"])

const listeMedoc = reactive([]);
let message = ref("");
const urlPharma = "https://apipharmacie.pecatte.fr/api/3/medicaments";
const urlSearch = urlPharma+"?search=";
const urlPhoto = "https://apipharmacie.pecatte.fr/images/";

//pour les modifications apportées à un médicament 
const selectedMedoc = reactive({});
//photo du medicament à modifier
let photoSelectedMedoc = reactive({});

function getMedocs() {
  let url = props.critere ? urlSearch+props.critere : urlPharma; // Si critère vide, récupérer tous les médicaments
  let fetchOptions = { method: "GET" };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
        listeMedoc.splice(0, listeMedoc.length);
      dataJSON.forEach((unMedoc) =>
        listeMedoc.push(new Medoc(unMedoc.id, unMedoc.denomination, unMedoc.formepharmaceutique, unMedoc.qte, unMedoc.photo))
      );
      appliquerTri();
    })
    .catch((error) => {
      console.log(error);
      message.value = "Erreur lors du chargement des médicaments.";
    });
}

function appliquerTri() {
  if (props.tri === "nom_asc") {
    listeMedoc.sort((a, b) => a.denomination.localeCompare(b.denomination));
  } else if (props.tri === "nom_desc") {
    listeMedoc.sort((a, b) => b.denomination.localeCompare(a.denomination));
  } else if (props.tri === "qte_asc") {
    listeMedoc.sort((a, b) => a.qte - b.qte);
  } else if (props.tri === "qte_desc") {
    listeMedoc.sort((a, b) => b.qte - a.qte);
  } else if (props.tri === "comprime") {
    listeMedoc.splice(0, listeMedoc.length, ...listeMedoc.filter(m => m.formepharmaceutique.toLowerCase().includes("comprimé")));
  } else if (props.tri === "gellule") {
    listeMedoc.splice(0, listeMedoc.length, ...listeMedoc.filter(m => m.formepharmaceutique.toLowerCase().includes("gélule")));
  } else if (props.tri === "effervescent") {
    listeMedoc.splice(0, listeMedoc.length, ...listeMedoc.filter(m => m.formepharmaceutique.toLowerCase().includes("effervescent")));
  } else if (props.tri === "liquide") {
    listeMedoc.splice(0, listeMedoc.length, ...listeMedoc.filter(m => m.formepharmaceutique.toLowerCase().includes("liquide")));
  }
}

onMounted(() => {
  getMedocs();
});

watch(props, (newcritere) => {
    getMedocs();
});
watch(() => props.tri, () => {
  appliquerTri();
});


function selectMedocToUpdate(medoc){
  photoSelectedMedoc.photo = medoc.photo;
  selectedMedoc.id = medoc.id;
  selectedMedoc.denomination = medoc.denomination;
  selectedMedoc.formepharmaceutique = medoc.formepharmaceutique;
  selectedMedoc.qte = medoc.qte;
  selectedMedoc.photo = medoc.photo;
}
  
function handlerUpdate() {
  const index = listeMedoc.findIndex(medoc => medoc.id === selectedMedoc.id);
  if (index !== -1 && listeMedoc[index].photo === selectedMedoc.photo) {
    selectedMedoc.photo = null;
  }
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({ 
      id: selectedMedoc.id,
      denomination: selectedMedoc.denomination,
      formepharmaceutique: selectedMedoc.formepharmaceutique,
      qte: selectedMedoc.qte,
      photo: selectedMedoc.photo
     }),
  };

  fetch(urlPharma, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      if (dataJSON.status === 1) {
        getMedocs();      
        message.value = "Etes-vous sûr de vouloir modifier ce medicament?";
        alert(message.value);
        selectedMedoc.id = null;
       
      } else {
        message.value = `Erreur : ${dataJSON.message}`;
        alert(message.value);
      }
    })
    .catch((error) => {
      console.log(error);
      message.value = "Erreur lors de la modification du médicament.";
    });
  
}

function cancelUpdate() {
  selectedMedoc.id = null;
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    selectedMedoc.photo = reader.result;
  };
  reader.readAsDataURL(file);
}

function handlerPlusOne(index) {
  console.log(listeMedoc[index]);
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({ 
      id: listeMedoc[index].id, 
      denomination: listeMedoc[index].denomination,
      formepharmaceutique: listeMedoc[index].formepharmaceutique,
      qte: listeMedoc[index].qte+1,
      photo: null
     }),
  };

  fetch(urlPharma, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      if (dataJSON.status === 1) {
        getMedocs();
        message.value = "Etes-vous sûr de vouloir augmenter la quantité de un?";
        alert(message.value);
       
      } else {
        message.value = `Erreur : ${dataJSON.message}`;
        alert(message.value);
      }
    })
    .catch((error) => {
      console.log(error);
      message.value = "Erreur lors de l'ajout'.";
    });
  
}

function handlerMinusOne(index) {
  console.log(listeMedoc[index]);
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({ 
      id: listeMedoc[index].id, 
      denomination: listeMedoc[index].denomination,
      formepharmaceutique: listeMedoc[index].formepharmaceutique,
      qte: listeMedoc[index].qte-1,
      photo: null
     }),
  };

  fetch(urlPharma, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      if (dataJSON.status === 1) {
        getMedocs();
        console.log(listeMedoc[index]);
        message.value = "Etes-vous sûr de vouloir reduire la quantité de un?";
        alert(message.value);
       
      } else {
        message.value = `Erreur : ${dataJSON.message}`;
        alert(message.value);
      }
    })
    .catch((error) => {
      console.log(error);
      message.value = "Erreur lors de l'ajout'.";
    });
  
}


function handlerDelete(idMedoc) {
  let fetchOptions = { method: "DELETE" };
  console.log(idMedoc);
  fetch(urlPharma + "/" + idMedoc, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      getMedocs();
      message.value = "Voulez-vous supprimer ce medicaments?";
      alert(message.value);
    })
    .catch((error) => {
      console.log(error);
      message.value = "Erreur lors de la suppression.";
    });
}


</script>

<template>
  
  <div class="parentContainer">
  <div class="tableContainer">
  <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Forme pharma</th>
          <th>Quantité</th>
          <th>Photo</th>
        </tr>
      </thead>
      <tbody>
        <ListItemMedoc
          v-for="(medic, index) in listeMedoc"
          :key="medic.id"
          :index="index"
          :medicament="medic"
          @eventDelete="handlerDelete"
          @eventUpdate="selectMedocToUpdate"
          @eventPlusOne="handlerPlusOne"
          @eventMinusOne="handlerMinusOne"
        >
        </ListItemMedoc>
      </tbody>
    </table>
  </div>

  <div v-if="selectedMedoc.id" class="formContainer">
    <form @submit.prevent="handlerUpdate">
      <fieldset>
        <legend>Modifier Médicament</legend>
        <label for="nom">Nom du médicament :</label>
        <input id="nom" v-model="selectedMedoc.denomination" required />

        <label for="forme">Forme pharmaceutique :</label>
        <select id="forme" v-model="selectedMedoc.formepharmaceutique" required>
          <option value="">Sélectionner une forme</option>
          <option value="Comprimé">Comprimé</option>
          <option value="Gélule">Gélule</option>
          <option value="Effervescent">Effervescent</option>
          <option value="Liquide">Liquide</option>
        </select>

        <label for="qte">Quantité :</label>
        <input id="qte" v-model="selectedMedoc.qte" type="number" min="0" required />

        <label for="photo">Photo :</label>
        <input id="photo" @change="handleFileUpload" type="file" accept=".png, .jpg, .jpeg"/>
        <div class="buttonContainer"> 
          <button type="submit">Modifier</button>
          <button type="button" @click="cancelUpdate" class="cancel-button">Annuler</button>
        </div>
      </fieldset>
    </form>
  </div>
</div>
<AjoutMedoc @medicament-ajoute="getMedocs"></AjoutMedoc>

</template>

<style scoped>
.parentContainer {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: nowrap; 
  align-items: flex-start; 
  width: 100%; 
  overflow-x: auto;
}

.tableContainer {
  flex: 2; /* Prend plus de place */
  max-width: 40%;
}

.formContainer {
  flex: 1;
  min-width: 300px;
  padding: 20px;
}

.ajoutContainer {
  flex: 1;
  min-width: 300px;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.buttonContainer {
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  margin-top: 15px; 
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ccc;
}

thead {
  background: #28a745;
  color: white;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

button {
  padding: 10px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.cancel-button {
  background: rgb(180, 25, 25);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 10px;
}

.cancel-button:hover {
  background: darkred; /* Couleur plus foncée au survol */
}

button:hover {
  background: #218838;
}

@media (max-width: 768px) {
  .parentContainer {
    flex-direction: column; /* Réorganisation en colonne sur mobile */
  }

  .tableContainer, .formContainer, .ajoutContainer {
    max-width: 100%;
  }
}
</style>