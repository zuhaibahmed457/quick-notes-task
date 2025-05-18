import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {showMessage} from '../utils';

const userId = () => auth().currentUser?.uid;
console.log('🚀 ~ userId:', userId());

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
