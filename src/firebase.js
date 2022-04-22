import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { ref, onUnmounted } from "vue";

const config = {
    apiKey: "AIzaSyAQckbnBJi_0lOv_7XVifrFUBjPrLjjt40",
    authDomain: "taskito-cadd0.firebaseapp.com",
    projectId: "taskito-cadd0",
    storageBucket: "taskito-cadd0.appspot.com",
    messagingSenderId: "219502112816",
    appId: "1:219502112816:web:5001a01031096fc5667df5",
    measurementId: "G-TDFMYFMFKK"
};

const firebaseapp = firebase.initializeApp(config);
const db = firebaseapp.firestore();
const tasksCollection = db.collection("tasks");

export const createTask = task => {
    return tasksCollection.add(task);
}
export const getTasks = async () => {
    const tasks = await tasksCollection.get();
    return tasks.exists ? tasks.data() : null
}

export const useLoadTasks = () => {
    let tasks = ref([]);
    const close = tasksCollection.onSnapshot(snapshot => {
        tasks.value = snapshot.docs.map(task => ({ ...task.data() }))
    })
    onUnmounted(close);
    return tasks;
}