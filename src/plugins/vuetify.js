import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#000',
        secondary: '#CBCCC6',
        accent: '#FFCC66',
        error: '#FF3333',
        info: '#191E2A',
        success: '#BAE67E',
        warning: '#FFA759'
      },
    },
  },
});
