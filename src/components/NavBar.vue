<script setup lang="ts">
import { computed, unref } from 'vue'
import { useDisplay } from 'vuetify'

// Récupération d'informations sur le current-device,
// fournies par le Composable "useDisplay" de vuetify
const display = useDisplay()

// Fabrication d'une propriété calculée renvoyant la valeur de la ref "display.xs"
const isSmartPhone = computed(() => {
  return unref(display.xs)
})

type RouteMenuItem = {
  to: string
  text: string
}

// Liste des éléments de menu de l'application
const routes: RouteMenuItem[] = [
  { to: '/', text: 'Accueil' },
  { to: '/list', text: 'Liste' },
  { to: '/create-user', text: 'Ajouter un collaborateur' }
]
</script>

<template>
  <v-app-bar color="teal" scroll-behavior="elevate">
    <v-app-bar-title>Vue Intranet</v-app-bar-title>

    <!-- Menu Mobile -->
    <v-menu v-if="isSmartPhone">
      <template v-slot:activator="{ props }">
        <v-app-bar-nav-icon v-bind="props" />
      </template>

      <v-list>
        <v-list-item v-for="{ to, text } in routes" :to="to" :key="to">
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Menu Desktop -->
    <v-toolbar-items v-else>
      <template v-for="{ to, text } in routes" :key="to">
        <v-btn :to="to" variant="text">{{ text }}</v-btn>
        <v-divider vertical></v-divider>
      </template>
    </v-toolbar-items>
  </v-app-bar>
</template>
