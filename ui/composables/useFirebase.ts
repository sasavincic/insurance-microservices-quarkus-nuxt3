import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export const createUser = async (email, password) => {
    const auth = getAuth();
    const credentials = await createUserWithEmailAndPassword(auth, email, password)
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
    return credentials;

}

export const signInUser = async (email, password) => {
    const auth = getAuth();
    const credentials = await signInWithEmailAndPassword(auth, email, password).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
    return credentials;
    
}

export const initUser = async () => {
    const auth = getAuth();
    const firebaseUser: any = useFirebaseUser();
    firebaseUser.value = auth.currentUser;

    const userCookie = useCookie('useCookie');
    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log("Auth Changed:", user);
        } else {
            console.log("Auth Changed:", user);
        }

        firebaseUser.value = user;
      });

}

export const signOutUser = async () => {
    const auth = getAuth();
    const result = await auth.signOut();
    return result;
}

