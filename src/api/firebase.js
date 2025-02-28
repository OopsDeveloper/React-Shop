import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, get, remove } from "firebase/database";
import {v4 as uuid} from 'uuid';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASEURL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const database = getDatabase(app);

provider.setCustomParameters({ prompt: 'select_account' });

export function login(callback) {
     signInWithPopup(auth, provider)
        .then((result) => {
            callback(result.user);
        })
        .catch(console.error);
}

export async function logout(callback) {
    signOut(auth)
        .then(() => {
            callback();
        })
        .catch(console.error);
}

export function onUserStateChange(callback) {
    onAuthStateChanged(auth, async (user) => {
        const updatedUser = user ? await adminUser(user) : null;
        callback(updatedUser);
    });
}

async function adminUser(user) {
    return get(ref(database, 'admins'))
        .then((snapshot) => {
            if(snapshot.exists()) {
                const admins = snapshot.val();
                const isAdmin = admins.includes(user.uid);
                return {...user, isAdmin};
            }
            return {...user, isAdmin: false};
        });
}

export async function addNewProduct(product, image) {
    const id = uuid();
    return set(ref(database, `products/${id}`), {
        ...product,
        id,
        price: parseInt(product.price),
        image,
        options: product.options.split(','),
    })
}

export async function getProducts() {
    return get(ref(database, 'products'))
        .then((snapshot) => {
            return snapshot.exists 
                ? Object.values(snapshot.val()) 
                : [];
        });
}

export async function getCart(userId) {
    return get(ref(database , `carts/${userId}`))
        .then(snapshot => {
            const items = snapshot.val() || {};
            return Object.values(items);
        });
}

export async function addOrUpdateToCart(userId, product) {
    const productKey = `${product.id}_${product.option}`;
    const cartRef = ref(database, `carts/${userId}/${productKey}`);

    return get(cartRef).then((snapshot) => {
        const existingProduct = snapshot.val();

        if (existingProduct) {
            return set(cartRef, {
                ...existingProduct,
                quantity: existingProduct.quantity + 1
            });
        } else {
            return set(cartRef, {...product, productKey});
        }
    });
}

export async function updateCartQuantity(userId, product) {
    const productKey = `${product.id}_${product.option}`;
    const cartRef = ref(database, `carts/${userId}/${productKey}`);
    
    return set(cartRef, {...product});
}

export async function removeFromCart(userId, productKey) {
    return remove(ref(database, `carts/${userId}/${productKey}`));
}