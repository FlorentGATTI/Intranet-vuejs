<script setup lang="ts">
import { isMajor, isValidEmail, isValidPhone } from '@/lib/helpers'
import type { User } from '@/services/users.types'
import { reactive, ref } from 'vue'

const props = defineProps<{
  user?: User
}>()

const formUser = reactive<Partial<User>>({
  gender: 'male',
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  birthdate: '',
  city: '',
  country: '',
  photo: '',
  ...props?.user
})

const rules = {
  required: (value: string) => !!value || 'Champs obligatoire.',
  email: (value: string) => isValidEmail(value) || 'E-mail invalide',
  phone: (value: string) => isValidPhone(value) || 'Numéro de téléphone invalide',
  birthdate: (value: string) => isMajor(value) || 'Le collaborateur doit être agé de +18 ans',
  url: (value: string) =>
    value.trim().length === 0 || value.startsWith('http') || "L'URL est invalide"
}

// Déclare les événement que le composant est capable d'émettre
const $emit = defineEmits<{
  (eventName: 'validate', payload: Partial<User>): void
}>()

function submitForm() {
  if (formState.value) {
    $emit('validate', formUser)
  }
}

const formState = ref()
</script>

<template>
  <v-form validate-on="blur" class="mb-8" @submit.prevent="submitForm" v-model="formState">
    <v-row no-gutters>
      <v-col cols="12" sm="8" offset-sm="2" md="6" offset-md="3">
        <!-- Civilité -->
        <v-select
          class="mb-2"
          density="comfortable"
          label="Civilité"
          :items="[
            { title: 'Homme', value: 'male' },
            { title: 'Femme', value: 'female' }
          ]"
          v-model="formUser.gender"
          :rules="[rules.required]"
        />

        <!-- Nom -->
        <v-text-field
          class="mb-2"
          density="comfortable"
          label="Nom"
          v-model="formUser.lastname"
          :rules="[rules.required]"
        />

        <!-- Prénom -->
        <v-text-field
          class="mb-2"
          density="comfortable"
          label="Prénom"
          v-model="formUser.firstname"
          :rules="[rules.required]"
        />

        <!-- Email -->
        <v-text-field
          type="email"
          class="mb-2"
          density="comfortable"
          label="Email"
          v-model="formUser.email"
          :rules="[rules.required, rules.email]"
        />

        <!-- Téléphone -->
        <v-text-field
          type="tel"
          class="mb-2"
          density="comfortable"
          label="Téléphone"
          v-model="formUser.phone"
          :rules="[rules.required, rules.phone]"
        />

        <!-- Date de naissance -->
        <v-text-field
          type="date"
          class="mb-2"
          density="comfortable"
          label="Date de naissance"
          v-model="formUser.birthdate"
          :rules="[rules.required, rules.birthdate]"
        />

        <!-- Ville -->
        <v-text-field
          class="mb-2"
          density="comfortable"
          label="Ville"
          v-model="formUser.city"
          :rules="[rules.required]"
        />

        <!-- Pays -->
        <v-text-field
          class="mb-2"
          density="comfortable"
          label="Pays"
          v-model="formUser.country"
          :rules="[rules.required]"
        />

        <!-- Photo (facultatif) -->
        <v-text-field
          type="url"
          class="mb-2"
          density="comfortable"
          label="URL de la photo"
          v-model="formUser.photo"
          :rules="[rules.url]"
        />

        <!-- VALIDATION -->
        <v-btn type="submit" block color="teal" variant="flat"> Envoyer </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
