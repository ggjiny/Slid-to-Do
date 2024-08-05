import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import TodoItem, { TodoItemProps } from '.';

const todos = [
  {
    noteId: null,
    done: false,
    linkUrl: null,
    fileUrl: null,
    title: 'Todo without Note',
    id: 1,
    goal: null,
    userId: 1,
    teamId: 'team1',
    updatedAt: '2023-07-20T12:34:56Z',
    createdAt: '2023-07-20T12:00:00Z',
  },
  {
    noteId: 0,
    done: false,
    linkUrl: null,
    fileUrl: null,
    title: 'Todo with Note',
    goal: null,
    id: 2,
    userId: 1,
    teamId: 'team1',
    updatedAt: '2023-07-21T12:34:56Z',
    createdAt: '2023-07-21T12:00:00Z',
  },
  {
    noteId: 3,
    done: false,
    linkUrl: 'https://example.com',
    fileUrl: null,
    title: 'Todo with Link',
    id: 3,
    goal: null,
    userId: 1,
    teamId: 'team1',
    updatedAt: '2023-07-22T12:34:56Z',
    createdAt: '2023-07-22T12:00:00Z',
  },
  {
    noteId: 4,
    done: false,
    linkUrl: 'https://example.com',
    fileUrl: 'https://example.com/file.pdf',
    title: 'Todo with Link and File and Long Title',
    id: 4,
    goal: null,
    userId: 1,
    teamId: 'team1',
    updatedAt: '2023-07-23T12:34:56Z',
    createdAt: '2023-07-23T12:00:00Z',
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
    createdAt: '2023-07-24T12:00:00Z',
    goal: {
      id: 5,
      title: '자바스크립트로 웹 서비스 만들기',
    },
  },
];

const meta: Meta<typeof TodoItem> = {
  title: 'Components/TodoItem',
  component: TodoItem,
  render: (args: TodoItemProps) => (
    <BrowserRouter>
      <div className="rounded-lg bg-white px-6 py-4">
        <div className="w-full flex-col overflow-hidden">
          {todos.map((todo) => (
            <TodoItem {...args} todo={todo} />
          ))}
        </div>
      </div>
    </BrowserRouter>
  ),
};
export default meta;

type Story = StoryObj<typeof TodoItem>;

export const Default: Story = {
  args: {
    showGoals: false,
    showIcons: false,
  },
};

export const ShowGoals: Story = {
  args: {
    showGoals: true,
    showIcons: false,
  },
};

export const ShowIcons: Story = {
  args: {
    showGoals: false,
    showIcons: true,
  },
};

export const WhiteContainer: Story = {
  args: {
    showGoals: true,
    showIcons: true,
  },
};

export const BlueContainer: Story = {
  args: {
    showGoals: true,
    showIcons: true,
    hoverBgColor: 'hover:bg-slate-50',
  },
  render: (args) => (
    <BrowserRouter>
      <div className="rounded-lg bg-blue-50 px-6 pb-4 pt-3">
        <div className="w-full flex-col overflow-hidden">
          {todos.map((todo) => (
            <TodoItem {...args} todo={todo} />
          ))}
        </div>
      </div>
    </BrowserRouter>
  ),
};
