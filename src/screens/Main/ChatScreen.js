import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {Container} from '../../atomComponents';
import {useKeyboard} from '../../hooks/useKeyboard';
import {MessageReceive, MessageSend} from './_partials/ChatMessags';
import {Header} from '../../components';

import ChatInput from './_partials/ChatInput';
import {COLORS, GLOBALSTYLE} from '../../globalStyle/Theme';
import {getChatMessages, sendMessageToHr} from '../../services/ChatServices';
import ListEmpty from '../../atomComponents/ListEmpty';

const ChatScreen = ({route}) => {
  const {other_user} = route?.params || {};
  const {user} = useSelector(state => state.app);

  const navigation = useNavigation();
  const {keyboardOpen} = useKeyboard();

  const flatRef = useRef();

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    const unsubscribe = getChatMessages(
      setMessages,
      setIsLoading,
      other_user?.id,
    );
    return () => unsubscribe();
  }, []);

  const handleSendMessage = () => {
    if (text.trim()) {
      sendMessageToHr(text, other_user?.id);
      setText('');
      scrollToEnd();
    }
  };

  const scrollToEnd = () => {
    flatRef?.current.scrollToEnd();
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
      <Container>
        <Header
          primaryBack
          title={other_user?.firstName + ' - ' + other_user?.lastName}
          backPress={() => navigation.goBack()}
          backgroundColor={COLORS.primary}
        />
        <View
          style={[
            GLOBALSTYLE.verticalSpace,
            styles.chatMessageWrapper,
            {paddingBottom: Platform.OS === 'ios' && !keyboardOpen ? 20 : 0},
          ]}>
          <FlatList
            data={messages || [1, 2]}
            inverted={messages?.length ? true : false}
            renderItem={({item}) => {
              return item?.senderId == user?.uid ? (
                <MessageSend item={item} />
              ) : (
                <MessageReceive item={item} />
              );
            }}
            ref={flatRef}
            ListEmptyComponent={({}) => (
              <ListEmpty isLoading={isLoading} type="Message Found!" />
            )}
          />

          <ChatInput
            handleSend={handleSendMessage}
            setInputValue={setText}
            inputValue={text}
            isLoading={isLoading}
          />
        </View>
      </Container>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  chatMessageWrapper: {
    flex: 1,
  },
});

export default ChatScreen;
