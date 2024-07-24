import type { Meta, StoryObj } from '@storybook/react';
import Button from '.';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    shape: {
      options: ['solid', 'outlined'],
      control: { type: 'select' },
    },
    round: {
      options: ['xl', '3xl'],
      control: { type: 'select' },
    },
    size: {
      options: ['lg', 'sm', 'xs'],
      control: { type: 'select' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  args: {
    shape: 'solid',
    round: 'xl',
    size: 'lg',
    children: '생성하기',
  },
};
export const Outlined: Story = {
  args: {
    shape: 'outlined',
    round: 'xl',
    size: 'lg',
    children: '생성하기',
  },
};
export const SolidRound: Story = {
  args: {
    shape: 'solid',
    round: '3xl',
    size: 'xs',
    children: '생성하기',
  },
};
export const OutlinedRound: Story = {
  args: {
    shape: 'outlined',
    round: '3xl',
    size: 'xs',
    children: '생성하기',
  },
};
