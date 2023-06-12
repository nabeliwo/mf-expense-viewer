import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

export const app = initializeApp(firebaseConfig)
export const database = getDatabase(app)

export const auth = getAuth(app)
export const signIn = () =>
  new Promise<{ id: string; name: string }>((resolve, reject) => {
    const authProvider = new GoogleAuthProvider()

    signInWithPopup(auth, authProvider)
      .then(async (result) => {
        resolve({
          id: result.user.uid,
          name: result.user.displayName || result.user.email || '',
        })
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        const email = error.customData.email
        const credential = GoogleAuthProvider.credentialFromError(error)

        console.error(`errorCode: ${errorCode}`)
        console.error(`errorMessage: ${errorMessage}`)
        console.error(`email: ${email}`)
        console.error(`credential: ${credential}`)

        reject(error)
      })
  })
