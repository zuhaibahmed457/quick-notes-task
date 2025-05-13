import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const userId = () => auth().currentUser?.uid;
console.log(' NotesServices.js:5 ~ userId:', userId());

export const addNote = async note => {
  try {
    return await firestore()
      .collection('users')
      .doc(userId())
      .collection('notes')
      .add({...note, createdAt: firestore.FieldValue.serverTimestamp()});
  } catch (error) {
    console.log(' NotesServices.js:15 ~ error:', error);
  }
};

export const updateNote = async (noteId, updatedNote) => {
  return await firestore()
    .collection('users')
    .doc(userId())
    .collection('notes')
    .doc(noteId)
    .update(updatedNote);
};

export const deleteNote = async noteId => {
  return await firestore()
    .collection('users')
    .doc(userId())
    .collection('notes')
    .doc(noteId)
    .delete();
};

export const getNotes = async (setNotes, setLoading) => {
  try {
    const snapshot = await firestore()
      .collection('users')
      .doc(userId())
      .collection('notes')
      .orderBy('createdAt', 'desc')
      .get();

    setNotes(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})));
    setLoading(false);
    // return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
  } catch (error) {
    console.log(' NotesServices.js:48 ~ getNotes ~ error:', error);
  }
  // console.log(
  //   'snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))',
  //   snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})),
  // );
};
