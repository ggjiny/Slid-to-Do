import { Todo } from '@/types/interface';
import TodoDetailModal, {
  TodoDetailModalProps,
} from '@components/TodoModal/TodoDetailModal';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof TodoDetailModal> = {
  title: 'Components/TodoDetailModal',
  component: TodoDetailModal,
  render: (args: TodoDetailModalProps) => {
    const [isOpen, setIsOpen] = useState(true);
    if (!isOpen) return <></>;
    return <TodoDetailModal {...args} onClose={() => setIsOpen(false)} />;
  },
};
export default meta;

type Story = StoryObj<typeof TodoDetailModal>;

const mockTodo: Todo = {
  id: 1,
  title: 'Sample Todo',
  goal: {
    id: 1,
    title: 'Goal 1',
  },
  fileUrl: null,
  linkUrl: null,
  noteId: null,
  done: false,
  userId: 1,
  teamId: 'team1',
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-01-01T00:00:00Z',
};

export const Default: Story = {
  args: {
    todo: mockTodo,
  },
};
