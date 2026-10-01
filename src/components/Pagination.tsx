import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';


interface Props {

  currentPage: number;

  totalPages: number;

  onPageChange:
    (page: number) => void;

}


export default function Pagination(
  {
    currentPage,
    totalPages,
    onPageChange,
  }: Props
) {

  if (totalPages <= 1) {

    return null;

  }


  const pages: number[] = [];


  for (
    let page = 1;
    page <= totalPages;
    page++
  ) {

    pages.push(page);

  }


  return (

    <View
      style={styles.wrapper}
    >

      <ScrollView
        horizontal

        showsHorizontalScrollIndicator={
          false
        }

        contentContainerStyle={
          styles.container
        }
      >

        <Pressable
          style={[
            styles.button,

            currentPage === 1
            &&
            styles.disabled,
          ]}

          disabled={
            currentPage === 1
          }

          onPress={() =>
            onPageChange(
              currentPage - 1
            )
          }
        >

          <Text
            style={styles.text}
          >
            ←
          </Text>

        </Pressable>


        {
          pages.map(
            page => (

              <Pressable
                key={page}

                style={[
                  styles.button,

                  page === currentPage
                  &&
                  styles.active,
                ]}

                onPress={() =>
                  onPageChange(
                    page
                  )
                }
              >

                <Text
                  style={[
                    styles.text,

                    page === currentPage
                    &&
                    styles.activeText,
                  ]}
                >
                  {page}
                </Text>

              </Pressable>

            )
          )
        }


        <Pressable
          style={[
            styles.button,

            currentPage === totalPages
            &&
            styles.disabled,
          ]}

          disabled={
            currentPage === totalPages
          }

          onPress={() =>
            onPageChange(
              currentPage + 1
            )
          }
        >

          <Text
            style={styles.text}
          >
            →
          </Text>

        </Pressable>

      </ScrollView>

    </View>

  );
}


const styles =
  StyleSheet.create({

    wrapper: {

      width: '100%',

      marginTop: 10,

      marginBottom: 25,

    },


    container: {

      flexDirection: 'row',

      alignItems: 'center',

      justifyContent: 'center',

      flexGrow: 1,

      gap: 8,

      paddingHorizontal: 4,

    },


    button: {

      minWidth: 40,

      height: 40,

      paddingHorizontal: 12,

      borderRadius: 10,

      backgroundColor:
        '#f1f5f9',

      alignItems: 'center',

      justifyContent: 'center',

    },


    active: {

      backgroundColor:
        '#2563eb',

    },


    disabled: {

      opacity: 0.35,

    },


    text: {

      fontSize: 15,

      fontWeight: '600',

      color: '#334155',

    },


    activeText: {

      color: '#ffffff',

    },

  });