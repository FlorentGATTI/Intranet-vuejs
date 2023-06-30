<script lang="ts">
import { calculateAge, formatBirthday } from '@/lib/helpers'
import type { User } from '@/services/users.types'
import type { PropType } from 'vue'

export default {
  props: {
    user: {
      type: Object as PropType<User>,
      required: true
    },
    onDelete: {
      type: Function as PropType<(user: User) => void>
    },
    onUpdate: {
      type: Function as PropType<(user: User) => void>
    }
  },
  computed: {
    age() {
      return calculateAge(this.user.birthdate)
    },
    birthday() {
      return formatBirthday(this.user.birthdate)
    }
  }
}
</script>

<template>
  <v-card elevation="1" rounded class="user-card ma-auto">
    <v-row no-gutters align="center">
      <v-col cols="12" sm="4">
        <v-avatar v-if="user.photo" :image="user.photo" size="auto" class="user-avatar" />
      </v-col>
      <v-col cols="12" sm="8">
        <v-card-title>{{ user.firstname }} {{ user.lastname }}</v-card-title>
        <v-card-subtitle>
          <v-icon color="grey-darken-1" icon="mdi-map-marker" size="small" />
          {{ user.city }}, {{ user.country }}
        </v-card-subtitle>
        <v-card-text>
          <div class="no-wrap">
            <v-icon color="grey-darken-1" icon="mdi-email-outline" size="small" />
            {{ user.email }}
          </div>
          <div class="no-wrap">
            <v-icon color="grey-darken-1" icon="mdi-phone" size="small" />
            {{ user.phone }}
          </div>
          <div class="no-wrap">
            <v-icon color="grey-darken-1" icon="mdi-cake" size="small" />
            {{ birthday }} ({{ age }} ans)
          </div>
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-btn
            v-if="$props.onUpdate"
            @click="$emit('update', user)"
            variant="outlined"
            size="x-small"
            color="teal"
          >
            Modifier
          </v-btn>
          <v-btn
            v-if="$props.onDelete"
            @click="$emit('delete', user)"
            variant="outlined"
            size="x-small"
            color="teal"
          >
            Supprimer
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
.user-card {
  max-width: 30rem;
}

@media screen and (max-width: 599px) {
  .user-card {
    text-align: center;
  }
}

.no-wrap {
  white-space: nowrap;
}

.user-avatar {
  margin-left: 0.5rem;
}
</style>
