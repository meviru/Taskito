<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <modal-topbar
        :toolbar-title="modalTopbarTitle"
        @closeModal="closeModal()"
      />
      <ion-content>
        <div class="c-form">
          <div class="c-form__control">
            <ion-item mode="md">
              <ion-label position="stacked">Task Name</ion-label>
              <ion-input mode="md"></ion-input>
            </ion-item>
            <ion-item mode="md">
              <ion-label position="stacked">Date</ion-label>
              <div class="d-flex align-items-center w-100">
                <ion-input mode="md" id="datePicker"></ion-input>
                <ion-icon slot="end" :icon="calendarClearOutline" />
                <ion-popover trigger="datePicker" mode="md" size="cover">
                  <ng-template>
                    <ion-datetime presentation="date" mode="md"></ion-datetime>
                  </ng-template>
                </ion-popover>
              </div>
            </ion-item>
            <ion-grid class="ion-no-padding">
              <ion-row>
                <ion-col>
                  <ion-item mode="md">
                    <ion-label position="stacked">Start Time</ion-label>
                    <div class="d-flex align-items-center">
                      <ion-input mode="md" id="startTimePicker"></ion-input>
                      <ion-icon slot="end" :icon="chevronDownOutline" />
                      <ion-popover
                        trigger="startTimePicker"
                        mode="md"
                        size="cover"
                      >
                        <ng-template>
                          <ion-datetime
                            presentation="time"
                            mode="md"
                          ></ion-datetime>
                        </ng-template>
                      </ion-popover>
                    </div>
                  </ion-item>
                </ion-col>
                <ion-col>
                  <ion-item mode="md">
                    <ion-label position="stacked">End Time</ion-label>
                    <div class="d-flex align-items-center">
                      <ion-input mode="md" id="endTimePicker"></ion-input>
                      <ion-icon slot="end" :icon="chevronDownOutline" />
                      <ion-popover
                        trigger="endTimePicker"
                        mode="md"
                        size="cover"
                      >
                        <ng-template>
                          <ion-datetime
                            presentation="time"
                            mode="md"
                          ></ion-datetime>
                        </ng-template>
                      </ion-popover>
                    </div>
                  </ion-item>
                </ion-col>
              </ion-row>
            </ion-grid>
            <ion-item mode="md">
              <ion-label position="stacked">Description</ion-label>
              <ion-input mode="md"></ion-input>
            </ion-item>
          </div>
          <div class="c-form__action">
            <ion-button color="primary" expand="block">Done</ion-button>
          </div>
        </div>
      </ion-content>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import { Constants } from "@/constants/index";
import {
  addOutline,
  chevronDownOutline,
  calendarClearOutline,
} from "ionicons/icons";
import ModalTopbar from "@/components/modal-topbar/ModalTopbar.vue";
export default defineComponent({
  name: Constants.NAME.ADD_NEW_TASK,
  components: { IonContent, IonPage, ModalTopbar },
  setup() {
    return {
      addOutline,
      chevronDownOutline,
      calendarClearOutline,
    };
  },
  data() {
    return {
      modalTopbarTitle: "Add Task",
    };
  },
  methods: {
    closeModal() {
      this.$router.go(-1);
    },
  },
});
</script>
