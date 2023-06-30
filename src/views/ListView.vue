<script setup lang="ts">
import UserCard from '@/components/UserCard.vue'
import { useCollaborators } from '@/composables/collaborators'
import { removeAccents } from '@/lib/helpers'
import router from '@/router'
import { remove } from '@/services/users'
import type { User } from '@/services/users.types'
import { useTitle } from '@vueuse/core'
import type { Ref } from 'vue'
import { computed, ref } from 'vue'

useTitle('Liste des collaborateurs - Vue Intranet')

const { users, isLoading, error } = useCollaborators()

const searchText = ref('')
const filterBy: Ref<'name' | 'localisation'> = ref('name')

function compare(a: string, b: string) {
  return removeAccents(a).toLowerCase().includes(removeAccents(b).toLowerCase())
}

const filteredUsers = computed(() => {
  return users.value?.filter((user) => {
    switch (filterBy.value) {
      case 'name':
        return compare(`${user.firstname} ${user.lastname}`, searchText.value)
      case 'localisation':
        return compare(`${user.city} ${user.country}`, searchText.value)
    }
  })
})

const errorMessage = ref<null | string>(null)
async function deleteUser(userToDelete: User) {
  try {
    await remove(userToDelete)
    users.value = users.value!.filter((user) => user.id !== userToDelete.id)
  } catch (err: unknown) {
    errorMessage.value = (err as Error).message
  }
}

function updateUser(user: User) {
  router.push({ name: 'update-user', params: { userId: user.id } })
}
</script>

<template>
  <h1 class="text-h3 my-4">Liste des collaborateurs</h1>

  <!-- Filtres de recherche -->
  <v-row justify="center" align="center">
    <v-col cols="12" sm="5" md="4">
      <v-text-field class="mb-2" density="comfortable" label="Rechercher" v-model="searchText" />
    </v-col>
    <v-col cols="12" sm="5" md="4">
      <v-select
        class="mb-2"
        density="comfortable"
        label="Filtrer par :"
        v-model="filterBy"
        :items="[
          { title: 'Nom', value: 'name' },
          { title: 'Localisation', value: 'localisation' }
        ]"
      />
    </v-col>
  </v-row>

  <!-- Séparateur -->
  <v-divider class="mb-8" />

  <!-- Liste des collaborateurs -->
  <v-row justify="center" v-if="users">
    <v-col cols="12" md="6" lg="4" v-for="user in filteredUsers" :key="user.id">
      <UserCard :user="user" @delete="deleteUser" @update="updateUser" />
    </v-col>
  </v-row>
  <v-row justify="center" v-else-if="isLoading">
    <v-col cols="12" md="6" lg="4" v-for="n in 12" :key="n">
      <v-skeleton-loader type="card" class="ma-auto" :style="{ maxWidth: '30rem' }" />
    </v-col>
  </v-row>
  <v-alert type="error" v-else-if="error" :text="error" />
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
