<template>
  <ion-toolbar
    class="c-topbar"
    :class="{ 'c-topbar__bg-white': isBgWhite }"
    mode="md"
  >
    <ion-title>{{ toolbarTitle }}</ion-title>
    <router-link slot="end" to="/profile">
      <ion-avatar>
        <img :src="userInfo?.photoURL" alt="User" />
      </ion-avatar>
    </router-link>
  </ion-toolbar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Constants } from "@/constants/index";
import store from "@/store/index";
export default defineComponent({
  name: Constants.COMPONENT.TOPBAR,
  props: ["toolbarTitle", "isBgWhite"],
  computed: {
    userInfo() {
      return store.getters.getUserDetail;
    },
  },
});
</script>