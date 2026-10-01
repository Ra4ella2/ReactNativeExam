import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';


interface Props {

  value: string;

  onChangeText:
    (text: string) => void;

  onSearch:
    () => void;

}


export default function SearchBar(
  {
    value,
    onChangeText,
    onSearch,
  }: Props
) {

  return (

    <View
      style={styles.container}
    >

      <TextInput
        style={styles.input}

        placeholder="Write..."

        placeholderTextColor="#94a3b8"

        value={value}

        onChangeText={
          onChangeText
        }

        onSubmitEditing={
          onSearch
        }

        returnKeyType="search"
      />


      <Pressable
        style={styles.button}
        onPress={onSearch}
      >

        <Text
          style={styles.buttonText}
        >
          Search
        </Text>

      </Pressable>

    </View>

  );
}


const styles =
  StyleSheet.create({

    container: {

      flexDirection: 'row',

      gap: 10,

      width: '100%',

    },


    input: {

      flex: 1,

      height: 52,

      borderWidth: 1,

      borderColor:
        '#cbd5e1',

      borderRadius: 12,

      paddingHorizontal: 16,

      backgroundColor:
        '#ffffff',

      fontSize: 16,

      color: '#0f172a',

    },


    button: {

      height: 52,

      paddingHorizontal: 22,

      borderRadius: 12,

      backgroundColor:
        '#2563eb',

      justifyContent:
        'center',

      alignItems:
        'center',

    },


    buttonText: {

      color: '#ffffff',

      fontSize: 15,

      fontWeight: '700',

    },

  });