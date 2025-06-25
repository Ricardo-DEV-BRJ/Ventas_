/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { lightTheme, darkTheme } from '@/themes/theme'
import { es } from 'vuetify/locale'


// Composables
import { createVuetify, useTheme } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  locale: {
    locale: 'es',
    messages: { es },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      dark: 
        darkTheme
      ,
      light: 
        lightTheme
      ,
    }
  },
})
