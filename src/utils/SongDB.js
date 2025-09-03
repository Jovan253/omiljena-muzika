import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

export async function addSong(song, listType) {
  const songsRef = collection(db, "songs");

  const q = query(songsRef, where("list", "==", listType));
  const snapshot = await getDocs(q);
  if (snapshot.size >= 5) {
    throw new Error(`${listType} is full (max 5). Delete one first.`);
  }

  return await addDoc(songsRef, { ...song, list: listType });
}

// Get all songs (both K & M)
export async function getSongs() {
  const songsRef = collection(db, "songs");
  const snapshot = await getDocs(songsRef);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
}

// Delete song
export async function deleteSong(id) {
  const docRef = doc(db, "songs", id);
  await deleteDoc(docRef);
}
