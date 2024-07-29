import { Note } from '@/types/interface';

const mockNotes: Note[] = [
  {
    todo: {
      done: true,
      title: '자바스크립트 기초1 듣기',
      id: 1,
    },
    updatedAt: '2024-07-25T05:01:17.918Z',
    createdAt: '2024-07-25T05:01:17.918Z',
    title: '자바스크립트 시작 전 준비물',
    id: 1,
    goal: {
      title: '자바스크립트로 웹 서비스 만들기',
      id: 9,
    },
  },
  {
    todo: {
      done: false,
      title: '자바스크립트 기초2 듣기',
      id: 2,
    },
    updatedAt: '2024-07-25T05:01:17.918Z',
    createdAt: '2024-07-25T05:01:17.918Z',
    title: '자바스크립트',
    id: 2,
    goal: {
      title: '자바스크립트로 웹 서비스 만들기',
      id: 9,
    },
  },
];

export default mockNotes;
