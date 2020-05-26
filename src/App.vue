<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h3>0x77strip</h3>
      </div>

      <v-spacer></v-spacer>

      <!-- <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>-->
    </v-app-bar>

    <v-content>
      <router-view />
      <v-bottom-sheet v-model="isNotEverythingGoodWithConnecton">
        <v-sheet class="text-center" height="125px">
          <br />
          <h1>😞</h1>
          <div class="py-3">Something is not ok with connection please try again later.</div>
        </v-sheet>
      </v-bottom-sheet>
    </v-content>
  </v-app>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "App",
  computed: {
    isNotEverythingGoodWithConnecton: {
      get() {
        return this.alive !== true;
      },
      set(value) {
        if (!value) location.reload();
      }
    }
  },
  apollo: {
    alive: gql`
      query {
        alive
      }
    `
  }
};
</script>
