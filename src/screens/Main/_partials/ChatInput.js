import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import Sizer from '../../../helpers/Sizer';
import Icon from '../../../helpers/Icon';

import {COLORS, GLOBALSTYLE} from '../../../globalStyle/Theme';
import {Flex} from '../../../atomComponents';

const ChatInput = ({
  handleSend = () => {},
  inputValue = '',
  setInputValue = () => {},
  isLoading = false,
}) => {
  return (
    <Flex
      algItems={'center'}
      extraStyle={{
        ...styles.contStyle,
        borderColor: COLORS.grey100,
        backgroundColor: COLORS.whiteV1,
      }}>
      {/* <Icon
        name={'plus-square'}
        iconFamily={'Feather'}
        color={COLORS.primary}
        size={18}
      /> */}
      <View style={styles.flex1}>
        <TextInput
          placeholder={'Send your message'}
          placeholderTextColor={COLORS.dark100}
          onChangeText={setInputValue}
          style={{...styles.textInput, color: COLORS.dark100}}
          value={inputValue}
        />
      </View>

      <TouchableOpacity
        activeOpacity={1}
        style={[
          styles.sendBtn,
          {
            // backgroundColor: isLoading
            //   ? COLORS.transparent
            //   : inputValue
            //   ? COLORS.primary
            //   : '#00000060',
          },
        ]}
        disabled={!inputValue}
        onPress={handleSend}>
        {isLoading ? (
          <ActivityIndicator size={20} color={COLORS.primary} />
        ) : (
          <Icon
            name={'paper-plane'}
            iconFamily={'Entypo'}
            size={24}
            color={inputValue ? COLORS.primary : COLORS.grey100}
          />
        )}
      </TouchableOpacity>
    </Flex>
  );
};

const styles = StyleSheet.create({
  contStyle: {
    borderWidth: 0.5,
    borderRadius: 12,
    paddingLeft: 12,
    paddingRight: 12,
    height: Sizer.hSize(45),
    marginBottom: 12,
    marginTop: 12,
  },
  flex1: {
    flex: 1,
  },
  btnStyle: {
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 6,
  },
  textInput: {
    height: '100%',
    paddingHorizontal: 6,
  },
});

export default ChatInput;
