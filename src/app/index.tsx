import {
  useEffect,
  useState,
} from 'react';

import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  Image
} from 'react-native';

import {
  useRouter,
} from 'expo-router';

import SearchBar
  from '../components/SearchBar';

import ImageCard
  from '../components/ImageCard';

import EmptyState
  from '../components/EmptyState';

import Pagination
  from '../components/Pagination';

import {
  PER_PAGE,
  searchImages,
} from '../services/pixabayApi';

import {
  PixabayImage,
} from '../types/image';


export default function GalleryScreen() {

  const router = useRouter();


  const {width} = useWindowDimensions();


  const columns =
    width >= 1400
      ? 5
      : width >= 1050
        ? 4
        : width >= 700
          ? 3
          : 2;


  const [query, setQuery] = useState('');

  const [images, setImages] = useState<PixabayImage[]>([]);

  const [page, setPage] = useState(1);

  const [totalHits, setTotalHits] = useState(0);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');


  const totalPages =Math.ceil(totalHits / PER_PAGE);

  useEffect(
    () => {

      loadImages(
        1
      );

    },
    []
  );


  async function loadImages(
    selectedPage: number
  ) {

    try {

      setLoading(true);

      setError('');


      const result =
        await searchImages(
          query,
          selectedPage
        );


      setImages(
        result.hits
      );


      setPage(
        selectedPage
      );


      setTotalHits(
        result.totalHits
      );


    } catch (
      error: any
    ) {

      setError(
        error.message
      );

    } finally {

      setLoading(false);

    }

  }


  function search() {
    loadImages(
      1
    );
  }


  function changePage(
    newPage: number
  ) {

    loadImages(
      newPage
    );

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
        style={styles.content}
      >

        <View
          style={styles.header}
        >

          <Image
            source={
              require('../../assets/logo.jpg')
            }
            style={styles.logo}
            resizeMode="contain"
          />


          <Pressable
            style={
              styles.favoriteButton
            }

            onPress={() =>
              router.push(
                '/favorites'
              )
            }
          >

            <Text
              style={
                styles.favoriteText
              }
            >
              Favourites
            </Text>

          </Pressable>

        </View>


        <View
          style={styles.searchSection}
        >

          <SearchBar
            value={query}

            onChangeText={
              setQuery
            }

            onSearch={
              search
            }
          />

        </View>


        <View
          style={styles.summary}
        >

          <Text
            style={
              styles.summaryText
            }
          >
            Found: {
              totalHits
            }
          </Text>


          {
            totalPages > 0
            &&
            (

              <Text
                style={
                  styles.summaryText
                }
              >
                Page {
                  page
                } / {
                  totalPages
                }
              </Text>

            )
          }

        </View>


        {
          error
          ? (

            <View
              style={
                styles.errorBox
              }
            >

              <Text
                style={
                  styles.error
                }
              >
                {error}
              </Text>


              <Pressable
                onPress={() =>
                  loadImages(
                    page
                  )
                }
              >

                <Text
                  style={
                    styles.retry
                  }
                >
                  Повторить
                </Text>

              </Pressable>

            </View>

          )
          : null
        }


        {
          loading
          ? (

            <View
              style={
                styles.loading
              }
            >

              <ActivityIndicator
                size="large"
              />

              <Text
                style={
                  styles.loadingText
                }
              >
                Loading images...
              </Text>

            </View>

          )
          : (

            <FlatList
              key={
                columns
              }

              data={
                images
              }

              numColumns={
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

                  <ImageCard
                    image={
                      item
                    }

                    onPress={() =>
                      openDetails(
                        item
                      )
                    }
                  />

                )
              }

              ListEmptyComponent={
                <EmptyState />
              }

              ListFooterComponent={

                <Pagination
                  currentPage={
                    page
                  }

                  totalPages={
                    totalPages
                  }

                  onPageChange={
                    changePage
                  }
                />

              }

              contentContainerStyle={
                styles.gallery
              }

              showsVerticalScrollIndicator={
                false
              }
            />

          )
        }

      </View>

    </View>

  );
}


const styles =
  StyleSheet.create({

    screen: {

      flex: 1,

      backgroundColor:
        '#ffffff',

      alignItems:
        'center',

    },


    content: {

      flex: 1,

      width: '100%',

      maxWidth: 1500,

      paddingHorizontal: 20,

    },


    header: {

      flexDirection: 'row',

      alignItems: 'center',

      justifyContent:
        'space-between',

      paddingTop: 50,

      paddingBottom: 22,

    },


    logo: {

      width: 170,

      height: 55,

    },


    favoriteButton: {

      paddingHorizontal: 18,

      paddingVertical: 12,

      borderRadius: 12,

      backgroundColor:
        '#f1f5f9',

    },


    favoriteText: {

      color: '#2563eb',

      fontSize: 15,

      fontWeight: '700',

    },


    searchSection: {

      width: '100%',

      marginBottom: 8,

    },


    summary: {

      flexDirection: 'row',

      justifyContent:
        'space-between',

      alignItems: 'center',

      paddingHorizontal: 6,

      marginTop: 8,

      marginBottom: 8,

    },


    summaryText: {

      color: '#64748b',

      fontSize: 13,

    },


    gallery: {

      paddingBottom: 30,

    },


    loading: {

      flex: 1,

      minHeight: 300,

      justifyContent:
        'center',

      alignItems:
        'center',

    },


    loadingText: {

      marginTop: 10,

      color: '#64748b',

    },


    errorBox: {

      padding: 15,

      backgroundColor:
        '#fef2f2',

      borderRadius: 10,

      marginVertical: 10,

    },


    error: {

      color: '#dc2626',

      textAlign: 'center',

    },


    retry: {

      color: '#2563eb',

      fontWeight: '700',

      textAlign: 'center',

      marginTop: 8,

    },

  });