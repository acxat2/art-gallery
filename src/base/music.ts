export type Music = {
  id: number;
  name: string;
  date: string;
  path: string;
  place?: string;
  pathCover?: string
}

export const music: Music[] =[
  {
    id: 1,
    name: 'Kiss the rain',
    date: '16.11.2024',
    path: 'assets/music/video_2024-11-21_05-53-02.webm',
    place: 'Литературное кафе "От А до Я" (Анапа, Терская 79)',
  }
]
