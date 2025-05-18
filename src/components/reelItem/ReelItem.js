import {useIsFocused} from '@react-navigation/native';
import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';

const {height} = Dimensions.get('window');

const ReelItem = ({item, isActive, reelHeight}) => {
  const videoRef = useRef(null);
  const [liked, setLiked] = useState(false);
  const isFocused = useIsFocused();

  const shouldPlay = isActive && isFocused;
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.seek(0);
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.seek(0);
      }
    };
  }, [shouldPlay]);

  return (
    <View style={[styles.container, {height: reelHeight}]}>
      <Video
        ref={videoRef}
        source={{uri: item.videoUrl}}
        style={styles.video}
        resizeMode="cover"
        repeat
        paused={!isActive}
      />
      <View style={styles.overlay}>
        <Text style={styles.description}>{item.description}</Text>
        <TouchableOpacity
          onPress={() => setLiked(prev => !prev)}
          style={styles.likeButton}>
          <Text style={{color: liked ? 'red' : 'white'}}>❤️ Like</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReelItem;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: 'black',
    // padding: 12,
  },
  video: {
    height: '100%',
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 50,
    left: 20,
  },
  description: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  likeButton: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    maxWidth: 80,
  },
});
