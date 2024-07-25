/* eslint-disable no-console */

import { Meta, StoryObj } from '@storybook/react';
import Kebab from '.';

const meta: Meta<typeof Kebab> = {
  title: 'Components/Kebab',
  component: Kebab,
  parameters: {
    layout: 'centered',
    backgrounds: {
      values: [
        {
          name: 'black',
          value: 'black',
        },
      ],
    },
  },
  args: {
    onEdit: () => {
      console.log('수정');
    },
    onDelete: () => {
      console.log('삭제');
    },
  },
};

export default meta;

type Story = StoryObj<typeof Kebab>;

export const Default: Story = {
  args: {
    isSmall: false,
  },
};

export const SmallKebab: Story = {
  args: {
    isSmall: true,
  },
};
