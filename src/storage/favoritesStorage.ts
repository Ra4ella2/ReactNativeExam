import AsyncStorage
  from '@react-native-async-storage/async-storage';

import {
  PixabayImage,
} from '../types/image';


const FAVORITES_KEY = 'pixabay_favorites';


export async function getFavorites():
  Promise<PixabayImage[]> {

  const data =
    await AsyncStorage.getItem(
      FAVORITES_KEY
    );


  if (!data) {

    return [];

  }


  return JSON.parse(
    data
  );
}


export async function saveFavorites(
  favorites: PixabayImage[]
) {

  await AsyncStorage.setItem(

    FAVORITES_KEY,

    JSON.stringify(
      favorites
    )

  );
}


export async function addFavorite(
  image: PixabayImage
) {

  const favorites =
    await getFavorites();


  const exists =
    favorites.some(
      item =>
        item.id === image.id
    );


  if (exists) {

    return;

  }


  const updated = [
    ...favorites,
    image,
  ];


  await saveFavorites(
    updated
  );
}


export async function removeFavorite(
  imageId: number
) {

  const favorites =
    await getFavorites();


  const updated =
    favorites.filter(
      item =>
        item.id !== imageId
    );


  await saveFavorites(
    updated
  );
}


export async function isFavorite(
  imageId: number
) {

  const favorites =
    await getFavorites();


  return favorites.some(
    item =>
      item.id === imageId
  );
}