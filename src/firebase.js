import firebase from 'firebase';
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
    const tasks = ref([]);
    const close = tasksCollection.onSnapshot(snapshot => {
        tasks.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    })
    onUnmounted(close);
    return tasks;
}