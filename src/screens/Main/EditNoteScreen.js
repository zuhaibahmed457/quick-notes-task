import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, View} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {Container, Typography} from '../../atomComponents';
import {Button, Header, TextField} from '../../components';
import {deleteNote, updateNote} from '../../services/NotesServices';
import {showMessage} from '../../utils';
import SlideInView from '../../animations/SlideView';
import {COLORS, GLOBALSTYLE} from '../../globalStyle/Theme';

const EditNoteScreen = ({route, navigation}) => {
  const {note} = route.params;
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (values, {resetForm}) => {
    try {
      setTimeout(() => {
        navigation.goBack();
        showMessage({
          type: 'success',
          message: 'Note Added',
        });
        resetForm();
      }, 1000); // DUE TO ERROR I USED THIS :P

      await updateNote(note?.id, {
        title: values.title,
        content: values.content,
      });
    } catch (error) {
      console.log(' AddNoteScreen.js:30 ~ handleAddNote ~ error:', error);
      showMessage({
        type: 'success',
        message: error?.message || 'Something wrong!',
      });
    }
  };

  const handleDelete = async () => {
    try {
      setTimeout(() => {
        navigation.goBack();
        showMessage({
          type: 'success',
          message: 'Note Delete',
        });
      }, 1000); // DUE TO ERROR I USED THIS :P
      await deleteNote(note?.id);
    } catch (error) {
      showMessage({
        type: 'success',
        message: error?.message || 'Something wrong!',
      });
    }
  };

  return (
    <Container>
      <SlideInView slide="up">
        <Header
          title="Edit Note"
          backgroundColor={COLORS.primary}
          backPress={() => navigation.goBack()}
        />
      </SlideInView>
      <View
        style={[
          GLOBALSTYLE.verticalSpace,
          {
            marginTop: 40,
          },
        ]}>
        <Typography size={20} fFamily="bold" mB={20}>
          Edit Note
        </Typography>
        <Formik
          initialValues={{title: note.title, content: note.content}}
          validationSchema={Yup.object({
            title: Yup.string().required('Title required'),
            content: Yup.string().required('Content required'),
          })}
          onSubmit={handleUpdate}>
          {({handleChange, handleSubmit, values, errors, touched}) => (
            <>
              <View style={GLOBALSTYLE.inputContainer}>
                <TextField
                  label="Title"
                  value={values.title}
                  onChangeText={handleChange('title')}
                  error={touched.title && errors.title}
                />
              </View>
              <View style={GLOBALSTYLE.inputContainer}>
                <TextField
                  label="Content"
                  multiline
                  numberOfLines={4}
                  value={values.content}
                  onChangeText={handleChange('content')}
                  error={touched.content && errors.content}
                />
              </View>
              <Button
                label="Update Note"
                onPress={handleSubmit}
                mT={20}
                isLoading={isLoading}
                disabled={isLoading}
              />
              <Button
                label="Delete Note"
                onPress={handleDelete}
                mode="outlined"
                color="red"
                mT={10}
              />
            </>
          )}
        </Formik>
      </View>
    </Container>
  );
};

export default EditNoteScreen;
