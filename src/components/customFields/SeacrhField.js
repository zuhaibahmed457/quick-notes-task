import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  FlatList,
  Pressable,
} from 'react-native';
import {Modal, Portal, Searchbar} from 'react-native-paper';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';

import {BASEOPACITY, COLORS, WINDOW} from '../../globalStyle/Theme';
import Sizer from '../../helpers/Sizer';

import {Flex, Typography} from '../../atomComponents';

import Icon from '../../helpers/Icon';
import CustomDropDown from './CustomDropDown';
import Button from '../customButtons/Button';
import CustomDatePicker from './CustomDatePicker';

import {useSearchMutation} from '../../services/searchApi';
import ListEmpty from '../../atomComponents/ListEmpty';
import CaseCard from '../cards/CaseCard';
import DocumentCard from '../cards/DocumentCard';

const HEIGHT = WINDOW.height;

const SearchField = ({}) => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [expand, setExpand] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const [searchQuery, setSearchQuery] = useState({
    search: '',
    from_date: '',
    till_date: '',
    type: 'beneficiary', // DEFUALT TYPE
  });

  // HANDLE RESET
  const handleReset = () => {
    setShowModal(false);
    setSearchData(null);
    setSearchQuery({
      search: '',
      from_date: '',
      till_date: '',
      type: 'beneficiary',
    });
    Keyboard.dismiss();

    setTimeout(() => {
      // IMPORTANT FOR CLOSING...
      setExpand(false);
    }, 500);
  };

  // ANIMATIONS
  const heightProgress = useSharedValue(48);
  const reanimatedHeightStyle = useAnimatedStyle(() => {
    return {
      height: heightProgress.value,
    };
  }, []);

  useEffect(() => {
    if (expand || searchData || isLoading) {
      heightProgress.value = withSpring(HEIGHT - 64);
    } else {
      heightProgress.value = withTiming(48);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expand, searchData]);

  // API LOGIC
  const [search, {isLoading}] = useSearchMutation();

  const handleSearch = async () => {
    try {
      const response = await search(searchQuery);
      if (response?.data?.data && searchQuery?.type == 'documents') {
        const formattedDocuments = response?.data?.data?.flatMap(item => {
          const documents = [];
          // Process each document type
          Object.entries(item?.documents || []).forEach(
            ([docType, docArray]) => {
              docArray.forEach(doc => {
                documents.push({
                  id: `${item.id}_${docType}_${doc.file}`, // Unique identifier
                  file: doc?.file, // Clean filename
                  description: doc?.description,
                  created_by: doc?.created_by,
                  created_at: doc?.created_at,
                });
              });
            },
          );

          return documents;
        });
        setSearchData(prev => ({
          ...prev,
          documents: formattedDocuments,
          messaege:
            formattedDocuments?.length > 0 ? null : 'No documents found',
        }));
      } else {
        setSearchData(prev => ({
          ...prev,
          beneficiary: response?.data?.data,
          messaege: response?.data?.data > 0 ? null : 'No benenificary found',
        }));
      }
    } catch (error) {
      console.log(' SeacrhField.js:68 ~ handleSearch ~ error:', error);
    }
  };

  return (
    <Animated.View style={[reanimatedHeightStyle]}>
      {/* FILTER FEILD */}
      <Flex gap={10} algItems={'center'}>
        {/* SEARCH FEILD */}
        <Searchbar
          placeholder="Search here..."
          onChangeText={query =>
            setSearchQuery(prev => ({
              ...prev,
              search: query,
            }))
          }
          value={searchQuery?.search}
          inputStyle={styles.inputStyle}
          mode="bar"
          showDivider={false}
          style={styles.conStyle}
          placeholderTextColor={COLORS.grey300}
          iconColor={COLORS.grey300}
          onFocus={() => {
            setExpand(true);
          }}
          onBlur={() => {
            setExpand(false);
          }}
          right={() =>
            expand || searchData || isLoading || searchQuery?.search ? (
              <TouchableOpacity
                style={{marginRight: 10}}
                onPress={() => {
                  handleReset();
                }}
                hitSlop={30}>
                <Icon
                  name={'close'}
                  iconFamily={'Ionicons'}
                  color={COLORS.grey300}
                  size={18}
                />
              </TouchableOpacity>
            ) : null
          }
          onEndEditing={() => {
            setExpand(true);
            handleSearch();
          }}
        />
        <TouchableOpacity
          style={styles.filterBtn}
          activeOpacity={0.5}
          onPress={() => {
            setExpand(true);
            setShowModal(true);
            Keyboard.dismiss();
          }}>
          <Icon
            name={'filter'}
            iconFamily={'FontAwesome5'}
            size={16}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </Flex>

      {/* LIST FOR SEARCH RESULT */}
      <FlatList
        style={{flex: 1}}
        data={searchData?.[searchQuery?.type] || []}
        renderItem={({item}) =>
          searchQuery?.type == 'beneficiary' ? (
            <CaseCard
              item={{
                ...item,
                color: COLORS.secondary,
                bgColor: COLORS.white100,
                onPress: () =>
                  navigation.navigate('BeneficinaryDetailScreen', {
                    beneficinary_id: item?.id,
                  }),
              }}
            />
          ) : (
            <DocumentCard item={item} />
          )
        }
        ItemSeparatorComponent={() => <View style={{marginVertical: 6}} />}
        ListEmptyComponent={({}) => (
          <ListEmpty
            showNo={false}
            type={
              searchData?.messaege
                ? searchData?.messaege
                : 'Search for documents or beneficiaries'
            }
            isLoading={isLoading}
            color={COLORS.white100}
          />
        )}
        contentContainerStyle={{
          flex: 1,
          paddingTop: 20,
          paddingBottom: 40,
        }}
      />

      {/* FILTER MODEL */}
      <Portal>
        <Modal
          visible={showModal}
          dismissable={false}
          onDismiss={() => null}
          contentContainerStyle={styles.containerStyle}>
          <View>
            <TouchableOpacity
              style={{alignSelf: 'flex-end'}}
              onPress={() => handleReset()}
              activeOpacity={BASEOPACITY}>
              <Icon
                name={'cancel'}
                iconFamily={'MaterialIcons'}
                size={18}
                color={COLORS.red600}
              />
            </TouchableOpacity>
            <Typography mB={24} size={22} color={COLORS.primary} fFamily="bold">
              Search Filters
            </Typography>
            <CustomDropDown
              containerSt={styles.inputWrapper}
              label="Filter By Type"
              placeholder="Select Type"
              selectedVal={searchQuery?.type}
              onChange={({value}) =>
                setSearchQuery(prev => ({...prev, type: value}))
              }
              data={[
                {label: 'Beneficiary', value: 'beneficiary'},
                {label: 'Documents', value: 'documents'},
              ]}
            />
            <Flex gap={5} mB={20} jusContent={'space-between'}>
              <CustomDatePicker
                label="From Date"
                value={searchQuery?.from_date}
                onChange={date =>
                  setSearchQuery(prev => ({...prev, from_date: date}))
                }
                containerSt={{flex: 1}}
                validRange={{
                  startDate: new Date(1900, 1, 1),
                  endDate: new Date(),
                }}
              />
              <CustomDatePicker
                label="Till Date"
                value={searchQuery?.till_date}
                onChange={date =>
                  setSearchQuery(prev => ({...prev, till_date: date}))
                }
                containerSt={{flex: 1}}
                validRange={{
                  startDate: new Date(1900, 1, 1),
                  endDate: new Date(),
                }}
              />
            </Flex>

            <Flex gap={12}>
              <Button
                type="outline"
                label={'Reset'}
                btnStyle={{flex: 1}}
                onPress={() => handleReset()}
              />
              <Button
                label={'Search'}
                btnStyle={{flex: 1}}
                onPress={() => {
                  setShowModal(false);
                  handleSearch();
                }}
              />
            </Flex>
          </View>
        </Modal>
      </Portal>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  conStyle: {
    backgroundColor: COLORS.white100,
    height: Sizer.hSize(45),
    minHeight: Sizer.hSize(45),
    borderRadius: Sizer.fS(12),
    // backgroundColor: 'cyan',
    flex: 1,
    overflow: 'hidden',
  },
  inputStyle: {
    height: Sizer.hSize(45),
    minHeight: Sizer.hSize(45),
    fontSize: Sizer.fS(14),
  },
  filterBtn: {
    backgroundColor: COLORS.white100,
    width: Sizer.wSize(44),
    height: Sizer.hSize(44),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Sizer.fS(12),
  },

  containerStyle: {
    backgroundColor: COLORS.white100,
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  inputWrapper: {
    marginBottom: 20,
  },
});

export default SearchField;
