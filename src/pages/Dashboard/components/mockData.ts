import { Todo } from '@/types/interface';

export const mockTodosData: Todo[] = [
  {
    noteId: null,
    done: false,
    linkUrl: null,
    fileUrl: null,
    title: 'Todo without Note',
    id: 1,
    userId: 1,
    teamId: 'team1',
    updatedAt: '2023-07-20T12:34:56Z',
    createdAt: '2023-07-20T12:00:00Z',
    goal: {
      title: '자바스크립트로 웹 서비스 만들기',
      id: 9,
    },
  },
  {
    noteId: 0,
    done: true,
    linkUrl: null,
    fileUrl: null,
    title: 'Todo with Note',
    id: 2,
    userId: 1,
    teamId: 'team1',
    updatedAt: '2023-07-21T12:34:56Z',
    createdAt: '2023-07-21T12:00:00Z',
    goal: {
      title: '자바스크립트로 웹 서비스 만들기',
      id: 8,
    },
  },
  {
    noteId: 3,
    done: false,
    linkUrl: 'https://example.com',
    fileUrl: null,
    title: 'Todo with Link',
    id: 3,
    userId: 1,
    teamId: 'team1',
    updatedAt: '2023-07-22T12:34:56Z',
    createdAt: '2023-07-22T12:00:00Z',
    goal: {
      title: '자바스크립트로 웹 서비스 만들기',
      id: 7,
    },
  },
  {
    noteId: 4,
    done: false,
    linkUrl: 'https://example.com',
    fileUrl: 'https://example.com/file.pdf',
    title: 'Todo with Link and File and Long Title',
    id: 4,
    userId: 1,
    teamId: 'team1',
    updatedAt: '2023-07-23T12:34:56Z',
    createdAt: '2023-07-23T12:00:00Z',
    goal: {
      title: '자바스크립트로 웹 서비스 만들기',
      id: 6,
    },
  },
  {
    noteId: 5,
    done: false,
    linkUrl: null,
    fileUrl: null,
    title: 'Todo with Goal',
    id: 5,
    userId: 1,
    teamId: 'team1',
    updatedAt: '2023-07-24T12:34:56Z',
    createdAt: '2023-07-02T12:00:00Z',
    goal: {
      title: '자바스크립트로 웹 서비스 만들기',
      id: 5,
    },
  },
  {
    noteId: 6,
    done: false,
    linkUrl: null,
    fileUrl: null,
    title: 'Todo with Goal',
    id: 6,
    userId: 1,
    teamId: 'team1',
    updatedAt: '2023-07-24T12:34:56Z',
    createdAt: '2023-07-02T12:00:00Z',
    goal: {
      title: '자바스크립트로 웹 서비스 만들기',
      id: 5,
    },
  },
  {
    noteId: 7,
    done: false,
    linkUrl: null,
    fileUrl: null,
    title: 'Todo with Goal',
    id: 7,
    userId: 1,
    teamId: 'team1',
    updatedAt: '2023-07-24T12:34:56Z',
    createdAt: '2023-07-02T12:00:00Z',
    goal: {
      title: '자바스크립트로 웹 서비스 만들기',
      id: 5,
    },
  },
];

export const mockGoalsData = {
  goals: [
    {
      id: 95,
      teamId: 'taco',
      userId: 26,
      title: '밥먹기',
      createdAt: '2024-07-25T15:50:30.237Z',
      updatedAt: '2024-07-25T15:50:30.237Z',
    },
    {
      id: 96,
      teamId: 'taco',
      userId: 26,
      title: '자기',
      createdAt: '2024-07-25T15:52:39.900Z',
      updatedAt: '2024-07-25T15:52:39.900Z',
    },
    {
      id: 9,
      teamId: 'taco',
      userId: 26,
      title: '자기',
      createdAt: '2024-07-25T15:52:39.900Z',
      updatedAt: '2024-07-25T15:52:39.900Z',
    },
  ],
};