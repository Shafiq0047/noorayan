
export interface Surah {
  id: number;
  name: string;
  englishName: string;
  arabicName: string;
  versesCount: number;
  verses: Verse[];
  audioUrl: string;
}

export interface Verse {
  number: number;
  arabic: string;
  transliteration: string;
  translation: string;
}

export interface Hadith {
  id: string;
  chapterId: number;
  chapterName: string;
  narrator: string;
  arabicText: string;
  bengaliText: string;
  book: string;
}

export type Theme = 'light' | 'dark';
export type FontSize = 'small' | 'medium' | 'large';
export type Language = 'bn' | 'en';

export interface AppState {
  bookmarks: {
    surahs: number[];
    hadiths: string[];
  };
  theme: Theme;
  fontSize: FontSize;
  language: Language;
  autoPlay: boolean;
}
