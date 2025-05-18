import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View, ScrollView} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Flex, Typography} from '../../atomComponents';
import Sizer from '../../helpers/Sizer';
import {COLORS} from '../../globalStyle/Theme';

const TabView = ({tabs = [], children}) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <View style={{flex: 1}}>
      {/* Tab Bar */}
      <View>
        {/* FOR ONLY TWO TABS */}
        {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}> */}
        <Flex gap={20} mT={20}>
          {tabs?.map((item, index) => (
            <TouchableOpacity
              style={[styles.alignCenter, styles.flex1]}
              onPress={() => setSelectedTab(item.value)}
              key={index}
              hitSlop={20}>
              <Typography
                size={16}
                fFamily="bold"
                color={
                  item.value === selectedTab ? COLORS.dark100 : COLORS.grey300
                }>
                {item?.label}
              </Typography>
              <BottomTabBar isSelected={item.value === selectedTab} />
            </TouchableOpacity>
          ))}
        </Flex>
        {/* </ScrollView> */}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {React.Children.map(children, (child, index) => {
          if (tabs[index].value === selectedTab) {
            return child;
          }
          return null;
        })}
      </View>
    </View>
  );
};

const BottomTabBar = ({isSelected}) => {
  const width = useSharedValue(isSelected ? '50%' : '0%');
  const barAnimation = useAnimatedStyle(() => {
    return {
      width: width.value,
    };
  });
  useEffect(() => {
    width.value = withTiming(isSelected ? '100%' : '0%');
  }, [isSelected]);
  return (
    <Animated.View
      style={[
        styles.tabBottomBar,
        barAnimation,
        {backgroundColor: COLORS.secondary},
      ]}
    />
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
    minWidth: Sizer.wSize(80),
  },
  alignCenter: {
    alignItems: 'center',
  },
  tabBottomBar: {
    marginTop: 8,
    height: 2,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
  },
  content: {
    paddingVertical: 20,
    // flex: 1,
  },
});

export default TabView;
