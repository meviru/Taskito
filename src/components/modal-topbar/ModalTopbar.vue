<template>
  <ion-toolbar class="c-modal__topbar" mode="md">
    <div class="d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center" @click="closeModal">
        <ion-icon :icon="chevronBackOutline" />
        <ion-title>{{ toolbarTitle }}</ion-title>
      </div>
    </div>
  </ion-toolbar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Constants } from "@/constants/index";
import { chevronBackOutline } from "ionicons/icons";
export default defineComponent({
  name: Constants.COMPONENT.MODAL_TOPBAR,
  props: ["toolbarTitle", "isRightIcon"],
  setup() {
    return {
      chevronBackOutline,
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
  },
});
</script>