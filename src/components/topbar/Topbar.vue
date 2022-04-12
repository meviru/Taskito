<template>
  <ion-toolbar
    class="c-topbar"
    :class="{ 'c-topbar__bg-white': isBgWhite }"
    mode="md"
  >
    <ion-title>{{ toolbarTitle }}</ion-title>
    <ion-avatar slot="end">
      <img src="@/assets/images/user.jpg" alt="User" />
    </ion-avatar>
  </ion-toolbar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Constants } from "@/constants/index";
export default defineComponent({
  name: Constants.COMPONENT.TOPBAR,
  props: ["toolbarTitle", "isBgWhite"],
});
</script>