import {
  StyleSheet,
  Text,
  View,
} from 'react-native';


export default function EmptyState() {

  return (

    <View
      style={styles.container}
    >

      <Text
        style={styles.text}
      >
        Ничего не найдено
      </Text>

    </View>

  );
}


const styles =
  StyleSheet.create({

    container: {
      padding: 40,
      alignItems: 'center',
    },

    text: {
      fontSize: 16,
      color: '#777777',
    },

  });