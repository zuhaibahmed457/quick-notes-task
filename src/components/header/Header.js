import React, {memo, useEffect} from 'react';
import {View, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import {IconButton} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

import {COLORS} from '../../globalStyle/Theme';

import Typography from '../../atomComponents/Typography';
import Flex from '../../atomComponents/Flex';

import Sizer from '../../helpers/Sizer';
import Icon from '../../helpers/Icon';
import {useNavigation} from '@react-navigation/native';

const Header = ({
  title = '',
  backPress = () => {},
  left = true,
  chat = false,
  search = false,
  eclipse = false,
  addProject = false,
  logout = false,
  addPress = () => {},
  bgColor = undefined,
}) => {
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.replace('LoginScreen'); // replace ensures user can't go back
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };
  return (
    <View style={[styles.headerWrapper, bgColor && {backgroundColor: bgColor}]}>
      <Flex algItems={'center'} flexStyle={{zIndex: 2}}>
        <View style={styles.flex1}>
          {left && (
            <TouchableOpacity onPress={() => backPress()}>
              <Icon
                name={'arrow-back-circle-outline'}
                iconFamily={'Ionicons'}
                color={COLORS.white100}
                size={40}
              />
            </TouchableOpacity>
          )}
        </View>
        <View
          style={[
            {
              alignItems: chat ? 'flex-start' : 'center',
              flex: chat ? 5 : 2,
            },
          ]}>
          <Typography
            size={24}
            color={COLORS.white100}
            fFamily="bold"
            textAlign="center">
            {title}
          </Typography>
        </View>
        <View style={[styles.flex1, {alignItems: 'flex-end'}]}>
          {search && (
            <IconButton
              size={18}
              icon={'magnify'}
              // style={GLOBALSTYLE.iconBtnStyle(COLORS.secondary)}
              iconColor={COLORS.white100}
              onPress={addPress}
            />
          )}
          {addProject && (
            <IconButton
              size={35}
              icon={'plus-circle-outline'}
              // style={GLOBALSTYLE.iconBtnStyle(COLORS.secondary)}
              iconColor={COLORS.white100}
              onPress={addPress}
            />
          )}
          {eclipse && (
            <TouchableOpacity>
              <Icon
                name={'dots-three-vertical'}
                iconFamily={'Entypo'}
                size={18}
                color={COLORS.white100}
              />
            </TouchableOpacity>
          )}
          {logout && (
            <TouchableOpacity onPress={handleLogout}>
              <Icon
                name={'logout'}
                iconFamily={'MaterialIcons'}
                size={24}
                color={COLORS.white100}
              />
            </TouchableOpacity>
          )}
        </View>
      </Flex>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    padding: 18,
    paddingTop: Sizer.hSize(60),
    // Platform.OS == 'ios'
    //   ? Sizer.hSize(80)
    //   : Sizer.hSize((StatusBar.currentHeight || 50) + 10),
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    overflow: 'hidden',
    minHeight: Sizer.hSize(Platform.OS == 'ios' ? 140 : 120),
    backgroundColor: COLORS.primary,
  },
  flex1: {
    flex: 1,
  },
  containerSt: {
    flex: 1,
    height: 40,
    borderRadius: 10,
  },
});

export default memo(Header);
