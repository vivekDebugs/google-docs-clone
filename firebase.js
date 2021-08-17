import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAVNtX7gaBuZdJsigBKtI5GBn7HCsnh9jI',
	authDomain: 'ggl-dcs-cln.firebaseapp.com',
	projectId: 'ggl-dcs-cln',
	storageBucket: 'ggl-dcs-cln.appspot.com',
	messagingSenderId: '850787717099',
	appId: '1:850787717099:web:348c8553f968c2e30413ae',
	measurementId: 'G-TYBWH30HCC',
}

const app = !firebase.apps.length
	? firebase.initializeApp(firebaseConfig)
	: firebase.app()

const db = app.firestore()

export { db }
