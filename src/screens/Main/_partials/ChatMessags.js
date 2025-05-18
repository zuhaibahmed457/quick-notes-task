import React from 'react';
import {View, StyleSheet} from 'react-native';

import {COLORS} from '../../../globalStyle/Theme';
import {Flex, Typography} from '../../../atomComponents';
import {formatFirebaseTimestamp} from '../../../utils';

const MessageReceive = ({item = null}) => {
  return (
    <Flex algItems={'flex-start'} gap={12} mT={22}>
      <View style={styles.messageView}>
        <Typography color={COLORS.dark100} size={12} mT={4}>
          {item?.text}
        </Typography>
        <Typography size={8} color={COLORS.grey100} textAlign="right">
          Today 11:52
        </Typography>
      </View>
    </Flex>
  );
};

const MessageSend = ({item = null}) => {
  return (
    <Flex algItems={'flex-start'} gap={12} mT={22} jusContent={'flex-end'}>
      <View
        style={[
          {
            ...styles.messageView,
            backgroundColor: COLORS.grey400,
          },
          styles.sendMessageView,
        ]}>
        <Typography color={COLORS.dark100} size={12} mT={4}>
          {item?.text}
        </Typography>
        <Typography size={8} color={COLORS.grey100} textAlign="right">
          {formatFirebaseTimestamp(item?.timestamp)}
        </Typography>
      </View>
    </Flex>
  );
};

const styles = StyleSheet.create({
  messageView: {
    padding: 8,
    borderTopEndRadius: 8,
    borderBottomStartRadius: 8,
    borderBottomEndRadius: 8,
    backgroundColor: COLORS.orange100,
    maxWidth: 250,
    minWidth: 150,
  },

  sendMessageView: {
    borderTopRightRadius: 0,
    borderRadius: 8,
  },
});

export {MessageReceive, MessageSend};
