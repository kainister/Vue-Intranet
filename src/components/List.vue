<template>
    <div class="container centered">

    <h1>Liste des utilisateurs</h1>
    <hr>

    <form class="filterform">
      <input type="search" placeholder="Tapez un nom ou un lieu ..." v-model="search">

      <label for="filter">Filtrer par :</label>
      <select name="filterBy" v-model="searchBy">
        <option value="name">Nom</option>
        <option value="localisation">Localisation</option>
      </select>
    </form>

    <div class="userlist" v-if="collaborateurs !== null">
      <!-- Liste de tous les utilisateurs ici -->
      <UserCard
        v-for="collaborateur in filteredCollaborateurs"
        :user="collaborateur"
        :key="collaborateur.id"
        @removeEvent="deleteUser"
        />
    </div>

  </div>
</template>

<script>
import UserService from '@/services/UserService.js'
import UserCard from '@/components/UserCard.vue'

export default {
    name: 'List',
    components: {
      UserCard
    },
    data() {
      return {
        collaborateurs : null,
        search: "",
        searchBy: "name"
      }
    },
    methods: {
      deleteUser(userToDelete) {
        UserService.remove(userToDelete).then(() => {
          this.collaborateurs = this.collaborateurs.filter(
            c => c.id !== userToDelete.id
          )
        })
      }
    },
    computed: {
      filteredCollaborateurs() {
        return this.collaborateurs.filter(collaborateur => {
          if (this.searchBy === 'name') {
            return (collaborateur.firstname.toLowerCase().includes(this.search.toLowerCase()) ||
              collaborateur.lastname.toLowerCase().includes(this.search.toLowerCase()))
          } else if (this.searchBy === 'localisation') {
            return (collaborateur.country.toLowerCase().includes(this.search.toLowerCase()) ||
              collaborateur.city.toLowerCase().includes(this.search.toLowerCase()))
          } else {
            return this.collaborateurs
          }
        })
      }
    },
    created() {
      UserService.fetchAll().then(collaborateurs => {
        this.collaborateurs = collaborateurs
      })
    }
}
</script>

<style scoped lang="scss">
.userlist {
  display: flex;
  flex-wrap: wrap;
}
  .userlist > * {
    box-sizing: border-box;
    width: calc(94%/3);
    margin: 1%;
  }

.filterform {
  margin: 2em 0
}
</style>
