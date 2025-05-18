import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {showMessage} from '../utils';

const userId = () => auth().currentUser?.uid;

export const getUser = async () => {
  try {
    const userSnapShot = await firestore()
      .collection('users')
      .doc(userId())
      .get();

    if (userSnapShot?.exists()) {
      return userSnapShot?.data();
    }

    return null;
  } catch (error) {
    showMessage({
      type: 'danger',
      message: 'Something went wrong!',
    });
    console.log('🚀 ~ getUser ~ error:', error);
  }
};

export const userLogout = async navigation => {
  try {
    await auth().signOut();
    navigation.replace('LoginScreen'); // replace ensures user can't go back
  } catch (error) {
    // showMessage({
    //   type: 'danger',
    //   message: 'Something wrong in the code buddy!',
    // });
    console.error('Error signing out: ', error);
  }
};

export const getAllUsersExceptCurrent = async (setData, setLoading) => {
  setLoading(true);
  try {
    const snapshot = await firestore().collection('users').get();

    const users = snapshot.docs
      .filter(doc => doc.id !== userId()) // exclude current user
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

    setData(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  } finally {
    setLoading(false);
  }
};
