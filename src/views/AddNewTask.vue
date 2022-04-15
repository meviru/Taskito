<template>
  <ion-page>
    <modal-topbar
      :toolbar-title="modalTopbarTitle"
      @closeModal="closeModal()"
    />
    <ion-content :fullscreen="true">
      <Form @submit="onSubmit" v-slot="{ meta, errors }" class="c-form h-100">
        <div class="c-form__control">
          <ion-item mode="md">
            <ion-label position="stacked">Task Name</ion-label>
            <Field
              v-model="taskName"
              type="text"
              name="task.name"
              v-slot="{ field }"
              :rules="isRequired"
            >
              <ion-input
                name="task.name"
                inputmode="text"
                mode="md"
                v-bind="field"
                :class="{
                  'is-invalid': errors['task.name'],
                }"
              ></ion-input>
            </Field>
            <div class="invalid-error">
              <ErrorMessage name="task.name" />
            </div>
          </ion-item>
          <ion-item mode="md">
            <ion-label position="stacked">Description</ion-label>
            <Field
              v-model="taskDescription"
              type="text"
              name="task.description"
              v-slot="{ field }"
              :rules="isRequired"
            >
              <ion-input
                name="task.description"
                type="text"
                mode="md"
                v-bind="field"
                :class="{
                  'is-invalid': errors['task.description'],
                }"
              ></ion-input>
            </Field>
            <div class="invalid-error">
              <ErrorMessage name="task.description" />
            </div>
          </ion-item>

          <ion-item mode="md">
            <ion-label position="stacked">Date</ion-label>
            <div class="d-flex align-items-center w-100">
              <ion-input
                name="taskDate"
                :value="taskDate"
                mode="md"
                id="datePicker"
              ></ion-input>
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
                    <ion-popover trigger="endTimePicker" mode="md" size="cover">
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
        </div>
        <div class="c-form__action">
          <ion-button
            :disabled="!meta.valid"
            type="submit"
            color="primary"
            expand="block"
          >
            Done
          </ion-button>
        </div>
      </Form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import { Constants } from "@/constants/index";
import {
  addOutline,
  chevronDownOutline,
  calendarClearOutline,
} from "ionicons/icons";
import { Form, Field, ErrorMessage } from "vee-validate";
import { string } from "yup";
import ModalTopbar from "@/components/modal-topbar/ModalTopbar.vue";
import { useIonRouter } from "@ionic/vue";
export default defineComponent({
  name: Constants.NAME.ADD_NEW_TASK,
  components: { IonContent, IonPage, ModalTopbar, Form, Field, ErrorMessage },
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
      ionRouter: useIonRouter(),
      isRequired: string()
        .required(Constants.VALIDATION.REQUIRED)
        .nullable(true),
    };
  },
  methods: {
    closeModal() {
      this.ionRouter.back();
    },
    onSubmit(values: any) {
      console.log(values);
    },
  },
});
</script>
