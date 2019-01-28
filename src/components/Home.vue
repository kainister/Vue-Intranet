<template>
  <div class="container centered">

    <h1>Bienvenue sur l'intranet</h1>
    <p>La plate-forme de l'entreprise</p>
    <hr>
    <h3>Avez-vous dit bonjour aujourd'hui à ...</h3>

    <UserCard :user="collaborateur" v-if="collaborateur" @removeEvent="deleteUser" />

    <div class="actions">
      <a href="#" class="btn" @click="changeUser">
        <i class="fa fa-random" /> Dire bonjour à quelqu'un d'autre
      </a>
    </div>

  </div>
</template>

<script>
import UserCard from '@/components/UserCard.vue'
import UserService from '@/services/UserService.js'

export default {
  name: 'Home',
  components: {
    UserCard
  },
  data() {
    return {
      collaborateurs: null,
      collaborateur: null
    }
  },
  methods: {
    changeUser() {
      this.collaborateur = this.collaborateurs[Math.floor(Math.random() * this.collaborateurs.length)]
    },
    deleteUser(userToDelete) {
      UserService.remove(userToDelete).then(() => {
        this.collaborateurs = this.collaborateurs.filter(
          c => c.id !== userToDelete.id
        )
        this.changeUser()
      })
    }
  },
  created() {
    UserService.fetchAll().then(collaborateurs => {
      this.collaborateurs = collaborateurs
      this.changeUser()
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
