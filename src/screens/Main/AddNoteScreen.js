import {Alert, View} from 'react-native';
import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {Container, Typography} from '../../atomComponents';
import {Button, Header, TextField} from '../../components';
import {COLORS, GLOBALSTYLE} from '../../globalStyle/Theme';
import SlideInView from '../../animations/SlideView';
import {showMessage} from 'react-native-flash-message';
import {addNote} from '../../services/NotesServices';

const AddNoteScreen = ({navigation}) => {
  const handleAddNote = async (values, {resetForm}) => {
    try {
      setTimeout(() => {
        showMessage({
          type: 'success',
          message: 'Note Added',
        });
        resetForm();
        navigation.goBack();
      }, 1000); // DUE TO ERROR I USED THIS :P

      await addNote({
        title: values.title,
        content: values.content,
      });
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
          title="Add Note"
          backgroundColor={COLORS.primary}
          backPress={() => navigation.goBack()}
        />
      </SlideInView>
      <View
        style={[
          GLOBALSTYLE.verticalSpace,
          {
            flex: 0.5,
            justifyContent: 'center',
          },
        ]}>
        <Typography size={20} fFamily="bold" mB={20}>
          Add Note
        </Typography>
        <Formik
          initialValues={{title: '', content: ''}}
          validationSchema={Yup.object({
            title: Yup.string().required('Title required'),
            content: Yup.string().required('Content required'),
          })}
          onSubmit={handleAddNote}>
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
              <Button label="Save Note" onPress={handleSubmit} mT={20} />
            </>
          )}
        </Formik>
      </View>
    </Container>
  );
};

export default AddNoteScreen;
