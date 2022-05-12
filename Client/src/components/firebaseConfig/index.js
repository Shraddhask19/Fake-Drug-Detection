import {initializeApp} from "firebase/app"
import { getDatabase } from "firebase/database";

function StartFirebase(){

    const firebaseConfig = {
        apiKey: "AIzaSyAiDTVU0FaPmyfPriJLjfCxd0qREggLsK0",
        authDomain: "fake-drug-detection.firebaseapp.com",
        projectId: "fake-drug-detection",
        storageBucket: "fake-drug-detection.appspot.com",
        messagingSenderId: "530874238760",
        appId: "1:530874238760:web:ec974e4d80dc161995321d"
      };
      
    const app = initializeApp(firebaseConfig);

// Get a reference to the database service
    const database = getDatabase(app);
}