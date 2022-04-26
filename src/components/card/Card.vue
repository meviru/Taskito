<template>
  <ion-card mode="ios" class="card ion-no-margin">
    <ion-text :color="getCardColor(cardHeader)" class="d-block card-header">{{
      getCardHeader(cardHeader)
    }}</ion-text>
    <div class="card-content">
      <div class="card-title" :class="`card-title-${getCardColor(cardHeader)}`">
        <div
          class="
            card-title__text
            d-flex
            align-items-center
            justify-content-between
          "
        >
          <span>{{ cardTitle }}</span>
          <ion-icon
            class="text-muted"
            @click="presentActionSheet"
            slot="end"
            :icon="ellipsisVertical"
          />
        </div>
        <span class="text-muted">{{ cardDescription }}</span>
      </div>
      <div class="d-flex align-items-center">
        <div class="card-info d-flex align-items-center">
          <ion-icon class="text-muted" :icon="timeOutline" />
          <span>{{ cardTimings }}</span>
        </div>
        <div class="card-info d-flex align-items-center">
          <ion-icon class="text-muted" :icon="peopleOutline" />
          <span>{{ cardPersons }} Persons</span>
        </div>
      </div>
    </div>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Constants } from "@/constants/index";
import { timeOutline, peopleOutline, ellipsisVertical } from "ionicons/icons";
export default defineComponent({
  name: Constants.COMPONENT.CARD,
  props: [
    "id",
    "cardHeader",
    "cardTitle",
    "cardDescription",
    "cardTimings",
    "cardPersons",
  ],
  setup() {
    return { timeOutline, peopleOutline, ellipsisVertical };
  },
  methods: {
    getCardColor(value: number) {
      switch (value) {
        case 1:
          return "secondary";
        case 2:
          return "primary";
        case 3:
          return "accent";
        case 4:
          return "warning";
        default:
          return;
      }
    },
    getCardHeader(value: number) {
      switch (value) {
        case 1:
          return "Urgent";
        case 2:
          return "Ongoing";
        case 3:
          return "Running";
        case 4:
          return "Onhold";
        default:
          return;
      }
    },
    presentActionSheet() {
      this.$emit("present-action-sheet");
    },
  },
});
</script>
