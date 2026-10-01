import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  useLocalSearchParams,
  useRouter,
} from 'expo-router';

import {
  PixabayImage,
} from '../types/image';

import {
  addFavorite,
  isFavorite,
  removeFavorite,
} from '../storage/favoritesStorage';


export default function ImageDetailsScreen() {

  const router = useRouter();

  const params = useLocalSearchParams();

  const image:
    PixabayImage =
      JSON.parse(
        params.image as string
      );

  const imageAspectRatio = image.imageWidth / image.imageHeight;

  const [favorite, setFavorite] = useState(false);

  useEffect(
    () => {
      checkFavorite();
    },
    []
  );

  const tags =
    useMemo(
      () => {

        return image.tags
          .split(',')
          .map(
            tag =>
              tag.trim()
          )
          .filter(Boolean);

      },
      [
        image.tags,
      ]
    );


  async function checkFavorite() {

    const result =
      await isFavorite(
        image.id
      );


    setFavorite(
      result
    );

  }


  async function toggleFavorite() {

    if (favorite) {

      await removeFavorite(
        image.id
      );


      setFavorite(false);

    } else {

      await addFavorite(
        image
      );


      setFavorite(true);

    }

  }


  return (

    <ScrollView
      contentContainerStyle={
        styles.container
      }
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

      </View>

      <Image
        source={{
          uri: image.largeImageURL,
        }}

        style={[
          styles.mainImage,
          {
            aspectRatio:
              imageAspectRatio,
          },
        ]}

        resizeMode="cover"
      />

      <View
        style={styles.statsGrid}
      >

        <View
          style={styles.statCard}
        >

          <Text
            style={styles.statValue}
          >
            {image.views}
          </Text>

          <Text
            style={styles.statLabel}
          >
            Просмотры
          </Text>

        </View>


        <View
          style={styles.statCard}
        >

          <Text
            style={styles.statValue}
          >
            {image.likes}
          </Text>

          <Text
            style={styles.statLabel}
          >
            Лайки
          </Text>

        </View>


        <View
          style={styles.statCard}
        >

          <Text
            style={styles.statValue}
          >
            {image.downloads}
          </Text>

          <Text
            style={styles.statLabel}
          >
            Загрузки
          </Text>

        </View>


        <View
          style={styles.statCard}
        >

          <Text
            style={styles.statValue}
          >
            {image.comments}
          </Text>

          <Text
            style={styles.statLabel}
          >
            Комментарии
          </Text>

        </View>

      </View>


      <View
        style={styles.infoCard}
      >

        <View
          style={styles.infoRow}
        >

          <View>

            <Text
              style={styles.infoLabel}
            >
              Автор
            </Text>

            <Text
              style={styles.infoValue}
            >
              {image.user}
            </Text>

          </View>

        </View>


        <View
          style={styles.divider}
        />


        <View
          style={styles.infoRow}
        >

          <View>

            <Text
              style={styles.infoLabel}
            >
              Размер
            </Text>

            <Text
              style={styles.infoValue}
            >
              {
                image.imageWidth
              }
              {' × '}
              {
                image.imageHeight
              }
            </Text>

          </View>

        </View>

      </View>


      <View
        style={styles.tagsSection}
      >

        <View
          style={styles.tagsHeader}
        >

          <Text
            style={styles.tagsTitle}
          >
            Теги
          </Text>

        </View>


        <View
          style={styles.tagsList}
        >

          {
            tags.map(
              (tag, index) => (

                <View
                  key={`${tag}-${index}`}
                  style={styles.tag}
                >

                  <Text
                    style={styles.tagText}
                  >
                    {tag}
                  </Text>

                </View>

              )
            )
          }

        </View>

      </View>


      <Pressable
        style={[
          styles.favoriteButton,

          favorite
          &&
          styles.removeButton,
        ]}
        onPress={
          toggleFavorite
        }
      >

        <Text
          style={styles.favoriteButtonText}
        >

          {
            favorite
              ? 'Удалить из избранного'
              : 'Добавить в избранное'
          }

        </Text>

      </Pressable>

    </ScrollView>

  );

}


const styles =
  StyleSheet.create({

    container: {
      width: '100%',
      maxWidth: 1000,
      alignSelf: 'center',
      padding: 20,
      paddingBottom: 50,
      backgroundColor: '#f8fafc',
    },


    topBar: {
      width: '100%',
      paddingTop: 50,
      marginBottom: 15,
    },

    backButton: {
      alignSelf: 'flex-start',
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 12,
      backgroundColor: '#ffffff',
      borderWidth: 1,
      borderColor: '#e2e8f0',
    },

    backText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#0f172a',
    },


    favoriteCircle: {
      width: 46,
      height: 46,
      borderRadius: 23,
      backgroundColor: '#ffffff',
      borderWidth: 1,
      borderColor: '#e2e8f0',
      alignItems: 'center',
      justifyContent: 'center',
    },


    favoriteCircleActive: {
      backgroundColor: '#eff6ff',
      borderColor: '#2563eb',
    },


    favoriteIcon: {
      fontSize: 24,
      color: '#64748b',
    },


    favoriteIconActive: {
      color: '#2563eb',
    },


    imageCard: {
      width: '100%',
      backgroundColor: '#ffffff',
      borderRadius: 18,
      padding: 12,
      borderWidth: 1,
      borderColor: '#e2e8f0',
      marginBottom: 18,
    },


    mainImage: {
      width: '100%',
      borderRadius: 14,
      marginBottom: 18,
    },


    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      marginBottom: 18,
    },


    statCard: {
      width: '48%',
      minHeight: 120,
      borderRadius: 16,
      backgroundColor: '#ffffff',
      borderWidth: 1,
      borderColor: '#e2e8f0',
      padding: 16,
      justifyContent: 'center',
    },


    statValue: {
      fontSize: 22,
      fontWeight: '800',
      color: '#0f172a',
    },


    statLabel: {
      marginTop: 4,
      color: '#64748b',
      fontSize: 13,
    },


    infoCard: {
      backgroundColor: '#ffffff',
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#e2e8f0',
      padding: 16,
      marginBottom: 18,
    },


    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
    },


    infoLabel: {
      color: '#94a3b8',
      fontSize: 13,
    },


    infoValue: {
      marginTop: 3,
      color: '#0f172a',
      fontSize: 17,
      fontWeight: '700',
    },


    divider: {
      height: 1,
      backgroundColor: '#e2e8f0',
      marginVertical: 16,
    },


    tagsSection: {
      backgroundColor: '#ffffff',
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#e2e8f0',
      padding: 16,
      marginBottom: 18,
    },


    tagsHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginBottom: 14,
    },


    tagsTitle: {
      fontSize: 17,
      fontWeight: '700',
      color: '#0f172a',
    },


    tagsList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },


    tag: {
      backgroundColor: '#eff6ff',
      borderRadius: 999,
      paddingHorizontal: 12,
      paddingVertical: 7,
    },


    tagText: {
      color: '#2563eb',
      fontSize: 13,
      fontWeight: '600',
    },


    favoriteButton: {
      height: 52,
      borderRadius: 12,
      backgroundColor: '#2563eb',
      alignItems: 'center',
      justifyContent: 'center',
    },


    removeButton: {
      backgroundColor: '#e11d48',
    },


    favoriteButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '700',
    },

  });