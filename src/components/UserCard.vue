<template>
  <article class="user-card">
    <figure>
      <img :src="user.photo" :alt="fullname">
    </figure>
    <div>
      <h1>{{fullname}}</h1>
      <p>
        <i class="fa fa-envelope" /> <a :href="'mailto:' + user.email" :title="'Envoyer un email à ' + fullname + '(' + user.email + ')'">{{user.email}}</a><br>
        <i class="fa fa-phone" /> <a :href="'tel:' + user.phone" :title="'Téléphoner à ' + fullname + ' ('+ user.phone +')'">{{user.phone}}</a><br>
        <i class="fa fa-calendar" /> {{user.birthdate}} (XX ans)<br>
        <i class="fa fa-map-marker" /> {{user.country}}, {{user.city}}
      </p>
      <a href="#" class="btn btn-small" @click.prevent="remove">Supprimer</a>
    </div>
  </article>
</template>

<script>
export default {
    name: 'UserCard',
    props: ['user'],
    computed: {
        fullname() {
            return this.user.firstname + ' ' + this.user.lastname.toUpperCase()
        }
    },
    methods: {
        remove() {
            // Emet une information vers le composant parent
            this.$emit('removeEvent', this.user)
        }
    }
}
</script>

<style scoped lang="scss">
.user-card {
    display: inline-flex;
    align-items: stretch;
    box-shadow: 0 0 15px #c0c0c0;
    border-radius: 2px;
    background-color: #fafafa;
    overflow: auto;
    text-align: left;
    padding: 0.25em 1.25em 0.25em 0;
}

.user-card > figure {
    margin: 0.25em;
    text-align: center;
    display: flex;
    align-items: center;
}

.user-card > figure > img {
    display: block;
    border-radius: 300px;
    max-width: 128px;
}

.user-card > div {
    margin: 0.25em;
    font-size: 0.8em;
    line-height: 1.6em;
}
</style>
