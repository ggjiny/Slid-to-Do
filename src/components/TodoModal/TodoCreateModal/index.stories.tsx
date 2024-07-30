import { Goal } from '@/types/interface';
import TodoCreateModal from '@components/TodoModal/TodoCreateModal';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof TodoCreateModal> = {
  title: 'Components/TodoCreateModal',
  component: TodoCreateModal,
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);
    if (!isOpen) return <></>;
    return <TodoCreateModal {...args} onClose={() => setIsOpen(false)} />;
  },
};
export default meta;

type Story = StoryObj<typeof TodoCreateModal>;

const mockInitialGoal: Goal = {
  id: 1,
  title: 'Goal 1',
  userId: 1,
  teamId: 'team1',
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-01-01T00:00:00Z',
};

export const Default: Story = {
  args: {
    initialGoal: mockInitialGoal,
  },
};
