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
            @click="presentActionSheet(cardTitle, id)"
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
import {
  useIonRouter,
  actionSheetController,
  alertController,
  toastController,
} from "@ionic/vue";
import { timeOutline, peopleOutline, ellipsisVertical } from "ionicons/icons";
import { deleteTask } from "@/firebase";
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
  data() {
    return {
      ionRouter: useIonRouter(),
    };
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
    async presentActionSheet(cardTitle, id) {
      const actionSheet = await actionSheetController.create({
        header: cardTitle,
        cssClass: "c-action-sheet",
        buttons: [
          {
            text: "Delete",
            cssClass: "action-sheet-button__delete",
            handler: () => {
              this.presentAlertConfirm(id);
            },
          },
          {
            text: "Edit",
            cssClass: "action-sheet-button__edit",
            handler: () => {
              // console.log("Edit clicked");
              this.ionRouter.push(`/tabs/task/edit/${id}`);
            },
          },
          {
            text: "Cancel",
            cssClass: "action-sheet-button__cancel",
            handler: () => {
              console.log("Cancel clicked");
            },
          },
        ],
      });
      await actionSheet.present();
    },
    async presentAlertConfirm(id) {
      const alert = await alertController.create({
        cssClass: "c-alert-box",
        header: "Are you sure?",
        message:
          "Do you really want to delete this task? This process cannot be undone.",
        buttons: [
          {
            text: "Cancel",
            cssClass: "alert-button__cancel",
          },
          {
            text: "Delete",
            cssClass: "alert-button__delete",
            handler: () => {
              deleteTask(id);
              this.openToast();
            },
          },
        ],
      });
      return alert.present();
    },
    async openToast() {
      const toast = await toastController.create({
        mode: "ios",
        cssClass: "c-toaster",
        position: "bottom",
        message: "Task has been deleted successfully.",
        duration: 2000,
      });
      return toast.present();
    },
  },
});
</script>