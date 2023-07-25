import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyCOPGKgu99OYJJr9zXq30RDbuVsFnCro_8',
	authDomain: 'react-b5e52.firebaseapp.com',
	projectId: 'react-b5e52',
	storageBucket: 'react-b5e52.appspot.com',
	messagingSenderId: '172154968693',
	appId: '1:172154968693:web:1af25e69759388510f363c',
	measurementId: 'G-FEYYPMK429',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
