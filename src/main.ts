import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labsComponents from 'vuetify/labs/components' // Contains <v-skeleton loader/>

import App from './App.vue'
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import router from './router'

const app = createApp(App)

app.use(
  createVuetify({
    components: { ...components, ...labsComponents },
    directives,
    icons: { defaultSet: 'mdi' }
  })
)

app.use(router)

app.mount('#app')
