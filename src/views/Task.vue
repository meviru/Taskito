<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <topbar :toolbar-title="toolbarTitle" />
      <div class="screen-wrapper">
        <div
          class="
            c-topbar-bottom
            d-flex
            align-items-center
            justify-content-between
          "
        >
          <div class="c-topbar-bottom__left">
            <div class="text-muted c-topbar-bottom__date">
              {{ todayDate() }}
            </div>
            <strong>Today</strong>
          </div>
          <div class="topbar-bottom__right">
            <ion-button mode="md" @click="toggleModal(true)" color="secondary">
              <ion-icon slot="start" :icon="addOutline" />
              <span>Add Task</span>
            </ion-button>
          </div>
        </div>
        <ul
          class="
            c-current-week
            d-flex
            align-items-center
            justify-content-between
          "
        >
          <li
            v-for="(week, index) in daysOfTheWeek()"
            :key="index"
            class="d-flex flex-column align-items-center c-current-week__item"
            :class="{ active: isToday(week.day) }"
          >
            <span class="text-muted">{{ shortWeekday(week.weekday) }}</span>
            <strong :class="{ 'text-primary': isToday(week.day) }">{{
              week.day
            }}</strong>
          </li>
        </ul>
        <div class="card-listing">
          <card
            :card-header="2"
            card-title="New Web UI Design Project"
            card-description="Website UI Design for $500"
            card-timings="10-11 AM"
            :card-persons="2"
          />
        </div>
      </div>
      <ion-modal mode="ios" css-class="c-modal" :is-open="isModalOpenRef">
        <modal-topbar
          toolbar-title="Add Task"
          @closeModal="toggleModal(false)"
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
                      <ion-datetime
                        presentation="date"
                        mode="md"
                      ></ion-datetime>
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
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { IonPage, IonContent, IonModal } from "@ionic/vue";
import { Constants } from "@/constants/index";
import {
  addOutline,
  chevronDownOutline,
  calendarClearOutline,
} from "ionicons/icons";
import Topbar from "@/components/topbar/Topbar.vue";
import Card from "@/components/card/Card.vue";
import ModalTopbar from "@/components/modal-topbar/ModalTopbar.vue";
import CommonMixin from "@/mixins/common";

export default defineComponent({
  name: Constants.NAME.TASK_TAB,
  components: { IonContent, IonPage, IonModal, Topbar, Card, ModalTopbar },
  mixins: [CommonMixin],
  setup() {
    let isModalOpenRef = ref(false);
    const toggleModal = (state: boolean) => (isModalOpenRef.value = state);
    return {
      toolbarTitle: "Task",
      addOutline,
      calendarClearOutline,
      chevronDownOutline,
      isModalOpenRef,
      toggleModal,
    };
  },
  methods: {
    isToday(day: any) {
      const date = new Date();
      return day == date.getDate() ? true : false;
    },
  },
});
</script>
