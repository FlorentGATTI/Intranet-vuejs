<script setup lang="ts">
import UserCard from '@/components/UserCard.vue'
import { useCollaborators } from '@/composables/collaborators'
import type { User } from '@/services/users.types'
import { useTitle } from '@vueuse/core'
import type { Ref } from 'vue'
import { ref, watch } from 'vue'

useTitle('Accueil - Vue Intranet')

const { users, isLoading, error } = useCollaborators()

const randomUser: Ref<null | User> = ref(null)

watch(users, (newVal) => {
  if (newVal) {
    pickRandomUser()
  }
})

function pickRandomUser() {
  randomUser.value = users.value![Math.floor(Math.random() * users.value!.length)]
}
</script>

<template>
  <h1 class="text-h3 my-4">Bienvenue sur l'intranet</h1>
  <p class="mt-4 mb-8">
    La plate-forme de l'entreprise qui vous permet de retrouver tous vos collaborateurs
  </p>

  <div class="text-center">
    <template v-if="randomUser">
      <UserCard :user="randomUser" />
      <v-btn color="teal" variant="flat" class="mt-4" @click="pickRandomUser">
        Dire bonjour à quelqu'un d'autre
      </v-btn>
    </template>
    <v-skeleton-loader
      type="card"
      v-else-if="isLoading"
      :style="{ maxWidth: '30rem' }"
      class="ma-auto"
    />
    <v-alert type="error" v-else-if="error" :text="error" />
  </div>
</template>

<style scoped>
* {
  text-align: center;
}
</style>
