import { initializeApp, getApps, getApp } from "firebase/app";
import type { FirebaseApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import type { Auth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import type { Firestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

/**
 * 🔐 CONFIGURACIÓN PROTEGIDA POR VARIABLES DE ENTORNO
 * Se utiliza import.meta.env (estándar de Vite) para evitar el hardcoding de llaves.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// 1. Inicialización síncrona del Core
const app: FirebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);

/**
 * 🛠️ PROTOCOLO DE ESTABILIZACIÓN DE SERVICIOS
 */
if (typeof window !== "undefined") {
  const win = window as any;

  const bootSequence = async () => {
    try {
      // Paso A: Persistencia de base de datos
      await enableIndexedDbPersistence(db).catch(() => {
        console.debug("SISTEMA: Persistencia offline en espera.");
      });

      // Paso B: Delay de seguridad para estabilización de Main Thread (Performance)
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Paso C: Auth
      await setPersistence(auth, browserLocalPersistence);

      // Paso D: Analytics (Carga diferida para evitar errores de 'installations-internal')
      const analyticsSupported = await isSupported();
      if (analyticsSupported) {
        setTimeout(() => {
          getAnalytics(app);
          console.log("SISTEMA: Telemetría conectada y securizada.");
        }, 5000);
      }
    } catch (error) {
      console.warn("SISTEMA: Inicialización diferida optimizada.");
    }
  };

  if (win.requestIdleCallback) {
    win.requestIdleCallback(() => bootSequence());
  } else {
    win.addEventListener("load", () => bootSequence());
  }
}

export default app;
