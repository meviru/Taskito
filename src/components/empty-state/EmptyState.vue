<template>
  <div class="c-empty-states text-center">
    <img
      class="c-empty-states__img"
      :src="require(`@/assets/images/${emptyStateImg}`)"
      :alt="emptyStateDesc"
    />
    <strong class="c-empty-states__info">{{ emptyStateDesc }}</strong>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Constants } from "@/constants/index";
export default defineComponent({
  name: Constants.COMPONENT.EMPTY_STATE,
  props: ["emptyStateImg", "emptyStateDesc"],
});
</script>