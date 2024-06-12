import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyByKgWVkcczbhHgEK4KoVz664cqGZgZznQ",
  authDomain: "bantay-real-time-data.firebaseapp.com",
  databaseURL: "https://bantay-real-time-data-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "bantay-real-time-data",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;