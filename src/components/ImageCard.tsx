import {
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';

import {
  PixabayImage,
} from '../types/image';


interface Props {

  image: PixabayImage;

  onPress:
    () => void;

}


export default function ImageCard(
  {
    image,
    onPress,
  }: Props
) {

  return (

    <Pressable
      style={styles.card}
      onPress={onPress}
    >

      <Image
        source={{
          uri: image.webformatURL,
        }}

        style={styles.image}

        resizeMode="cover"
      />

    </Pressable>

  );
}


const styles =
  StyleSheet.create({

    card: {

      flex: 1,

      margin: 6,

      borderRadius: 12,

      overflow: 'hidden',

      backgroundColor:
        '#e5e7eb',

    },


    image: {

      width: '100%',

      aspectRatio: 1.15,

    },

  });