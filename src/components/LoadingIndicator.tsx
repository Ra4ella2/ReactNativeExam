import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';


export default function LoadingIndicator() {

  return (

    <View
      style={styles.container}
    >

      <ActivityIndicator
        size="large"
      />

    </View>

  );
}


const styles =
  StyleSheet.create({

    container: {
      padding: 30,
      alignItems: 'center',
    },

  });