import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import {Container, Typography, Flex} from '../../atomComponents';
import {Button, Header} from '../../components';
import {COLORS, GLOBALSTYLE} from '../../globalStyle/Theme';
import SlideInView from '../../animations/SlideView';
import ListEmpty from '../../atomComponents/ListEmpty';
import {getNotes} from '../../services/NotesServices';
import Icon from '../../helpers/Icon';
import {useSelector} from 'react-redux';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {user} = useSelector(state => state.app);
  console.log('🚀 ~ HomeScreen ~ user:', user);
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
    <Container>
      <SlideInView slide="up">
        <Header home backgroundColor={COLORS.primary} left={false} logout />
      </SlideInView>
      <View style={[GLOBALSTYLE.verticalSpace, {marginTop: 20}]}>
        <Flex jusContent="space-between" algItems="center" mB={20}>
          <Typography size={20} fFamily="bold">
            My Notes
          </Typography>
          <Button
            label="Add Note"
            onPress={() => navigation.navigate('AddNoteScreen')}
          />
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
    </Container>
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
});

export default HomeScreen;
