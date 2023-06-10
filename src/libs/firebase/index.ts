import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'

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
export const auth = getAuth(app)
export const authProvider = new GoogleAuthProvider()

export const signIn = () =>
  new Promise<{ idToken: string; displayName: string; email: string }>(
    (resolve, reject) => {
      signInWithPopup(auth, authProvider)
        .then(async (result) => {
          const idToken = await result.user.getIdToken()

          resolve({
            idToken,
            displayName: result.user.displayName || '',
            email: result.user.email || '',
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
    },
  )
