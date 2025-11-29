import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAtEypDvzF-hBljbpE3vT_qK6iSjIxjtVk',
	authDomain: 'echodiary-14dd0.firebaseapp.com',
	projectId: 'echodiary-14dd0',
	storageBucket: 'echodiary-14dd0.firebasestorage.app',
	messagingSenderId: '388001256490',
	appId: '1:388001256490:web:75170fc7b8fbdf396a9f53',
	measurementId: 'G-MKLXXW8JQE'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
