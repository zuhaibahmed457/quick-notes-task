import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import {generateChatId, showMessage} from '../utils';

const userId = () => auth().currentUser?.uid;

//  Get All Messages
export const getChatMessages = (callback, setLoading, otherUserId) => {
  const chatId = generateChatId(userId(), otherUserId);
  setLoading(true);
  return firestore()
    .collection('messages')
    .doc(chatId)
    .collection('messages')
    .orderBy('timestamp')
    .onSnapshot(snapshot => {
      const msgs = snapshot?.docs?.map(doc => doc.data());
      callback(msgs.reverse());
      setLoading(false);
    });
};

//  Send Message to Hr
export const sendMessageToHr = async (text, otherUserId) => {
  const senderId = userId();
  const chatId = generateChatId(userId(), otherUserId);

  const msgData = {
    text,
    senderId,
    timestamp: firestore.FieldValue.serverTimestamp(),
  };

  try {
    await firestore()
      .collection('messages')
      .doc(chatId)
      .collection('messages')
      .add(msgData);
  } catch (error) {
    console.error('Error sending message:', error);
    showMessage({type: 'danger', message: 'Message not sent!'});
  }
};
