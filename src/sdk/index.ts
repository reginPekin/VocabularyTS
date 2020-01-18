import axios from "axios";
import { Folder } from "./types";

const API_ENDPOINT = "http://localhost:4000/vocabulary";

export const getFolderNames = async (): Promise<Folder[]> => {
  return await axios
    .get(`${API_ENDPOINT}/folders/names`)
    .then(response => response.data);
};

export const editWord = async (newName: {
  word: string;
  wordId: string;
  id: string;
  renamedWord: string;
}) => {
  return await axios.patch(
    `${API_ENDPOINT}/folders/` + newName.id + "/words/edit/" + newName.wordId,
    newName
  );
};

export const editSpeechPart = async (newSpeechPart: {
  id: string;
  wordId: string;
  newSpeechPart: string;
}) => {
  return await axios.patch(
    `${API_ENDPOINT}/folder/` +
      newSpeechPart.id +
      "/words/" +
      newSpeechPart.wordId +
      "/speechPart",
    newSpeechPart
  );
};

export const deleteFolder = async (id: string) => {
  return await axios.delete(`${API_ENDPOINT}/folders/` + id);
};

export const renameFolder = async (id: string, text: string) => {
  return await axios.patch(`${API_ENDPOINT}/folders/` + id, {
    name: text
  });
};

export const createNewWord = async (newWord: {
  folderId: string;
  foreignWord: string;
  nativeWord: string;
  speechPart: string;
}) => {
  return await axios.post(
    `${API_ENDPOINT}/folders/` + newWord.folderId + "/words",
    newWord
  );
};

export const createFolder = async (newFolder: {
  name: string;
  foreignLanguage: string;
  nativeLanguage: string;
}) => {
  return await axios.post(`${API_ENDPOINT}/folders`, newFolder);
};

export const deleteWordsPair = async (id: string, wordId: string) => {
  return await axios.post(
    `${API_ENDPOINT}/folders/` + id + "/words/" + wordId,
    { id, wordId }
  );
};

export const getWordsArray = async (
  folderId: string,
  sort: string, // SortMethod
  sortDirecton: number
) => {
  return await axios
    .get(
      `${API_ENDPOINT}/folders/` +
        folderId +
        "/words?sort=" +
        sort +
        "&direction=" +
        sortDirecton
    )
    .then(response => response.data);
};

export const getFolder = async (folderId: string) => {
  return await axios
    .get(`${API_ENDPOINT}/folders/` + folderId)
    .then(response => response.data);
};

export const changeLanguage = async (
  id: string,
  text: string,
  language: string
) => {
  return await axios.patch(`${API_ENDPOINT}/folders/` + id + "/language", {
    language,
    renamedLanguage: text
  });
};
