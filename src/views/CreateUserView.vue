<script setup lang="ts">
import UserForm from '@/components/UserForm.vue'
import router2 from '@/router/index'
import { create } from '@/services/users'
import type { APIError, User } from '@/services/users.types'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

console.log('routers', router === router2)
const errorMessage = ref<null | string>(null)

async function addUser(user: Partial<User>) {
  errorMessage.value = null
  try {
    // 1. Appeler la méthode du
    //    UserService qui va créer un
    //    utilisateur
    await create(user)

    // 2. Rediriger vers la page de
    //    listing
    router.push({ name: 'list' })
  } catch (error) {
    errorMessage.value = (error as APIError).message
  }
}
</script>

<template>
  <h1 class="text-h3 my-4">Création d'un collaborateur</h1>

  <v-divider class="mb-8" />

  <!-- Formulaire-->
  <UserForm @validate="addUser" />
  <v-alert v-if="errorMessage" type="error" :text="errorMessage" />
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
