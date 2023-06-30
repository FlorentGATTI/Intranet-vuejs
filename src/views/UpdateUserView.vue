<script setup lang="ts">
import UserCard from '@/components/UserCard.vue'
import UserForm from '@/components/UserForm.vue'
import { useCollaborator } from '@/composables/collaborators'
import router from '@/router'
import { update } from '@/services/users'
import type { User } from '@/services/users.types'
import { ref, toRefs } from 'vue'

const props = defineProps<{
  userId: string
}>()

const { userId } = toRefs(props) // Permet d'éviter de perdre la réactivité sur les props décomposées avec spread...

const { user, isLoading, error } = useCollaborator(userId.value)

const errorMessage = ref<null | string>(null)
async function updateUser(userToUpdate: Partial<User>) {
  try {
    await update(userToUpdate)
    router.push({ name: 'list' })
  } catch (error: unknown) {
    errorMessage.value = (error as Error).message
  }
}
</script>

<template>
  <h1 class="text-h3 my-4">Modification d'un collaborateur</h1>

  <v-divider class="mb-8" />

  <!-- User Card -->
  <UserCard v-if="user" :user="user" class="mb-8" />
  <v-skeleton-loader
    v-else-if="isLoading"
    type="card"
    :style="{ maxWidth: '30rem' }"
    class="ma-auto"
  />

  <!-- Formulaire -->
  <UserForm v-if="user" :user="user" @validate="updateUser" />
  <v-row v-else-if="isLoading">
    <v-col cols="12" md="6" offset-md="3">
      <v-skeleton-loader v-for="n in 9" :key="n" type="heading" class="mb-6" />
      <v-skeleton-loader type="button" />
    </v-col>
  </v-row>

  <!-- En cas d'erreur -->
  <v-alert type="error" v-if="error" :text="error" />
  <v-alert type="error" v-if="errorMessage" :text="errorMessage" />
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
