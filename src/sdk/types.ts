export interface Folder {
  words: Word[];
  name: string;
  id: string;
  foreignLanguage: string;
  nativeLanguage: string;
  // sortMethod: SortMethod;
}

export interface Word {
  foreignWord: string;
  nativeWord: string;
  wordId: string;
  date?: number;
  speechPart?: string;
  tags?: string[];
}

export interface SpeechPart {
  value: string;
  label: string;
}

// export type SortMethod = "date" | "foreign" | "native" | "speech";
