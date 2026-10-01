import {
  useCallback,
  useState,
} from 'react';

import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import {
  useFocusEffect,
  useRouter,
} from 'expo-router';

import ImageCard
  from '../components/ImageCard';

import EmptyState
  from '../components/EmptyState';

import {
  getFavorites,
  removeFavorite,
} from '../storage/favoritesStorage';

import {
  PixabayImage,
} from '../types/image';


export default function FavoritesScreen() {

  const router = useRouter();

  const [favorites, setFavorites] = useState<PixabayImage[]>([]);

  const {width} = useWindowDimensions();


  const columns =
    width >= 1400
      ? 5
      : width >= 1050
        ? 4
        : width >= 700
          ? 3
          : 2;


  useFocusEffect(

    useCallback(
      () => {

        loadFavorites();

      },
      []
    )

  );


  async function loadFavorites() {

    const result = await getFavorites();

    setFavorites(
      result
    );

  }


  async function remove(
    id: number
  ) {

    await removeFavorite(
      id
    );


    await loadFavorites();

  }


  function openDetails(
    image: PixabayImage
  ) {

    router.push({

      pathname:
        '/details',

      params: {

        image:
          JSON.stringify(
            image
          ),

      },

    });

  }


  return (

    <View
      style={styles.screen}
    >

      <View
        style={styles.topBar}
      >

        <Pressable
          style={styles.backButton}
          onPress={() =>
            router.back()
          }
        >

          <Text
            style={styles.backText}
          >
            ← Назад
          </Text>

        </Pressable>


        <Text
          style={styles.title}
        >
          Favorites
        </Text>


        <View
          style={styles.rightSpacer}
        />

      </View>


      <FlatList

        contentContainerStyle={
          styles.list
        }

        data={favorites}

        numColumns={
          columns
        }

        key={
          columns
        }

        keyExtractor={
          item =>
            String(
              item.id
            )
        }

        renderItem={
          ({ item }) => (

            <View
              style={styles.item}
            >

              <ImageCard
                image={item}

                onPress={() =>
                  openDetails(
                    item
                  )
                }
              />


              <Pressable
                style={
                  styles.removeButton
                }

                onPress={() =>
                  remove(
                    item.id
                  )
                }
              >

                <Text
                  style={
                    styles.removeText
                  }
                >
                  Удалить
                </Text>

              </Pressable>

            </View>

          )
        }

        ListEmptyComponent={

          <View
            style={styles.empty}
          >

            <EmptyState />

          </View>

        }

        showsVerticalScrollIndicator={
          false
        }

      />

    </View>

  );
}


const styles =
  StyleSheet.create({

    screen: {
      flex: 1,
      backgroundColor: '#f8fafc',
    },


    topBar: {
      paddingTop: 50,
      paddingHorizontal: 20,
      paddingBottom: 16,

      flexDirection: 'row',

      alignItems: 'center',

      justifyContent: 'space-between',

      backgroundColor: '#ffffff',

      borderBottomWidth: 1,

      borderBottomColor: '#e2e8f0',
    },


    backButton: {
      paddingHorizontal: 14,
      paddingVertical: 10,

      borderRadius: 12,

      backgroundColor: '#ffffff',

      borderWidth: 1,

      borderColor: '#e2e8f0',
      marginTop: 10
    },


    backText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#0f172a',
    },


    title: {
      fontSize: 22,

      fontWeight: '600',

      color: '#0f172a',

      textAlign: 'center',
      marginTop: 10
    },


    rightSpacer: {
      width: 92,
    },


    list: {
      width: '100%',
      maxWidth: 1450,
      alignSelf: 'center',

      paddingHorizontal: 15,
      paddingTop: 15,
      paddingBottom: 30,
    },


    item: {
      flex: 1,
      marginBottom: 6,
    },


    removeButton: {
      marginHorizontal: 6,
      marginTop: 2,
      marginBottom: 10,

      paddingVertical: 9,

      borderRadius: 10,

      backgroundColor: '#fff1f2',

      alignItems: 'center',
    },


    removeText: {
      color: '#e11d48',
      fontWeight: '700',
    },


    empty: {
      flex: 1,
      minHeight: 300,

      justifyContent: 'center',
      alignItems: 'center',
    },

  });