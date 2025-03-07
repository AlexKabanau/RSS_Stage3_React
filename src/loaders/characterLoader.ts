// import { getCharacters } from '@/store/api/characterApi';

import { getCharacter } from '@/api/getItems';

// import { getCharacters } from "@/store/api/characterApi";

export const characterLoader = async (id: string) => {
  const response = await getCharacter(id);
  return response?.data;
};

// export const characterLoader = async (id: string) => {
//   try {
//     const response = await getCharacter(id);
//     if (!response) {
//       throw new Response("Character not found", { status: 404 });
//     }
//     return response;
//   } catch (error) {
//     throw new Response("Failed to load character", { status: 500 });
//   }
// };
