import React, {useRef, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import {Container, Typography, Flex} from '../../atomComponents';
import {Header, ReelItem, TabView} from '../../components';
import {COLORS, GLOBALSTYLE, WINDOW} from '../../globalStyle/Theme';
import SlideInView from '../../animations/SlideView';
import ListEmpty from '../../atomComponents/ListEmpty';
import {getNotes} from '../../services/NotesServices';
import Icon from '../../helpers/Icon';
import {Avatar} from 'react-native-paper';
import {getAllUsersExceptCurrent} from '../../services/UserServices';
import format from 'pretty-format';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  const tabs = [
    {label: 'Chats', value: 0},
    {label: 'Reels', value: 1},
    {label: 'Notes', value: 2},
  ];

  return (
    <Container>
      <SlideInView slide="up">
        <Header home backgroundColor={COLORS.primary} left={false} logout />
      </SlideInView>

      <TabView tabs={tabs}>
        <SlideInView slide="left">
          <InboxList />
        </SlideInView>
        <SlideInView slide="down">
          <ReelsList />
        </SlideInView>
        <SlideInView slide="right">
          <NotesList />
        </SlideInView>
      </TabView>
    </Container>
  );
};

// INBOX LIST
const InboxList = ({}) => {
  const navigation = useNavigation();
  const [inbox, setInbox] = useState([]);
  console.log('🚀 ~ InboxList ~ inbox:', format(inbox));
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    getAllUsersExceptCurrent(setInbox, setIsLoading);
  }, [isFocused]);

  const renderNote = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ChatScreen', {
          other_user: item,
        })
      }>
      <View style={styles.chatCard}>
        <Flex gap={18}>
          <Avatar.Text label={item?.firstName.charAt(0)} size={28} />
          <Typography size={16} fFamily="bold">
            {item?.firstName} - {item?.lastName}
          </Typography>
        </Flex>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={[GLOBALSTYLE.verticalSpace]}>
        <Typography size={20} fFamily="bold">
          My Inbox
        </Typography>
      </View>
      <FlatList
        data={inbox}
        renderItem={renderNote}
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingBottom: 40}}
        ListEmptyComponent={({}) => (
          <ListEmpty isLoading={isLoading} type="Inbox Found" />
        )}
      />
    </>
  );
};

// REEL LIST
const ReelsList = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onViewRef = useRef(({viewableItems}) => {
    if (viewableItems?.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  });
  const viewConfigRef = useRef({itemVisiblePercentThreshold: 80});

  const dummyReels = [
    {
      id: '1',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      description: 'Reel 1: This is a sample video.',
    },
    {
      id: '2',
      videoUrl: 'https://www.w3schools.com/html/movie.mp4',
      description: 'Reel 2: Another video just for testing.',
    },
    {
      id: '3',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      description: 'Reel 3: Enjoy this sample reel.',
    },
  ];

  return (
    <FlatList
      data={dummyReels}
      renderItem={({item, index}) => (
        <ReelItem
          item={item}
          isActive={activeIndex === index}
          reelHeight={SCREEN_HEIGHT - 200} // match visible area
        />
      )}
      keyExtractor={item => item.id}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={onViewRef.current}
      viewabilityConfig={viewConfigRef.current}
      snapToAlignment="start"
      decelerationRate="fast"
      snapToInterval={SCREEN_HEIGHT - 200}
      contentContainerStyle={{backgroundColor: 'blue'}}
    />
  );
};

// const ReelsList = ({}) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const onViewRef = useRef(({viewableItems}) => {
//     if (viewableItems?.length > 0) {
//       setActiveIndex(viewableItems[0].index);
//     }
//   });
//   const viewConfigRef = useRef({itemVisiblePercentThreshold: 80});

//   const dummyReels = [
//     {
//       id: '1',
//       videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
//       description: 'Reel 1: This is a sample video.',
//     },
//     {
//       id: '2',
//       videoUrl: 'https://www.w3schools.com/html/movie.mp4',
//       description: 'Reel 2: Another video just for testing.',
//     },
//     {
//       id: '3',
//       videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
//       description: 'Reel 3: Enjoy this sample reel.',
//     },
//   ];
//   return (
//     <FlatList
//       data={dummyReels}
//       renderItem={({item, index}) => (
//         <ReelItem item={item} isActive={activeIndex === index} />
//       )}
//       keyExtractor={item => item.id}
//       pagingEnabled
//       showsVerticalScrollIndicator={false}
//       onViewableItemsChanged={onViewRef.current}
//       viewabilityConfig={viewConfigRef.current}
//       snapToAlignment="start"
//       decelerationRate={'fast'}
//       snapToInterval={WINDOW.height}
//       style={{backgroundColor: 'blue'}}
//     />
//   );
// };

//  NOTE LIST
const NotesList = ({}) => {
  const navigation = useNavigation();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    loadNotes();
  }, [isFocused]);

  const loadNotes = async () => {
    await getNotes(setNotes, setLoading);
  };

  const renderNote = ({item}) => (
    <View style={styles.noteCard}>
      <Flex jusContent="space-between" algItems="center">
        <Typography size={16} fFamily="bold">
          {item.title}
        </Typography>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditNoteScreen', {note: item})}>
          <Icon size={18} name={'edit'} iconFamily={'Feather'} />
        </TouchableOpacity>
      </Flex>
      <Typography size={14} mT={4} color={COLORS.gray700}>
        {item.content}
      </Typography>
    </View>
  );

  return (
    <>
      <View style={[GLOBALSTYLE.verticalSpace]}>
        <Flex jusContent="space-between" algItems="center" mB={20}>
          <Typography size={20} fFamily="bold">
            My Notes
          </Typography>
          <TouchableOpacity
            hitSlop={30}
            onPress={() => navigation.navigate('AddNoteScreen')}>
            <Icon
              name={'add-to-list'}
              iconFamily={'Entypo'}
              size={24}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </Flex>
      </View>
      <FlatList
        data={notes}
        renderItem={renderNote}
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingBottom: 40}}
        ListEmptyComponent={({}) => (
          <ListEmpty isLoading={loading} type="Notes Found" />
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  noteCard: {
    backgroundColor: COLORS.grey400,
    borderRadius: 16,
    marginHorizontal: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 12,
  },

  chatCard: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey400,
    borderRadius: 12,
    marginHorizontal: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 12,
  },
});

export default HomeScreen;
