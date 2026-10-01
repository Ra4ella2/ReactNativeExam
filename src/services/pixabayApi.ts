import mockData
  from '../data/pixabayMock.json';

import {
  PixabayImage,
  PixabayResponse,
} from '../types/image';


const USE_MOCK = true;


const API_URL = 'https://pixabay.com/api/';


const API_KEY = process.env.EXPO_PUBLIC_PIXABAY_API_KEY;

console.log(
  'PIXABAY API KEY:',
  API_KEY
);

export const PER_PAGE = 12;


export async function searchImages(
  query: string,
  page: number = 1
): Promise<PixabayResponse> {

  if (USE_MOCK) {

    const normalizedQuery =
      query
        .trim()
        .toLowerCase();


    let images: PixabayImage[] = mockData.hits;

    if (normalizedQuery) {

      images =
        images.filter(
          image => {

            const tags =
              image.tags
                .toLowerCase();


            const name =
              image.name
                .toLowerCase();


            const user =
              image.user
                .toLowerCase();


            return (
              tags.includes(
                normalizedQuery
              )
              ||
              name.includes(
                normalizedQuery
              )
              ||
              user.includes(
                normalizedQuery
              )
            );

          }
        );

    }


    const start = (page - 1) * PER_PAGE;

    const end = start + PER_PAGE;


    const pageItems =
      images.slice(
        start,
        end
      );


    return {

      total:
        images.length,

      totalHits:
        images.length,

      hits:
        pageItems,

    };

  }


  if (!API_KEY) {

    throw new Error(
      'Pixabay API key не найден'
    );

  }


  const params =
    new URLSearchParams({

      key:
        API_KEY,

      q:
        query,

      image_type:
        'photo',

      page:
        String(page),

      per_page:
        String(PER_PAGE),

      safesearch:
        'true',

    });


  const response =
    await fetch(
      `${API_URL}?${params.toString()}`
    );


  if (!response.ok) {

    const errorText = await response.text();

    console.log(
      'Pixabay API error:',
      response.status,
      errorText
    );


    throw new Error(
      `Pixabay API: ${response.status} ${errorText}`
    );

  }


  const data:
    PixabayResponse =
      await response.json();


  return data;
}