/* eslint-disable */

import { Meta, StoryFn } from '@storybook/react';
import Popup, { PopupProps } from '.';

export default {
  title: 'Components/Popup',
  component: Popup,
} as Meta;

const Template: StoryFn<PopupProps> = (args) => <Popup {...args} />;

export const Default = Template.bind({});
Default.args = {
  message: `정말 나가시겠어요?\n작성된 내용이 모두 삭제됩니다.`,
};

export const SingleButton = Template.bind({});
SingleButton.args = {
  message: '가입이 완료되었습니다!',
  singleButton: true,
};

export const CustomConfirmMessage = Template.bind({});
CustomConfirmMessage.args = {
  message: `'자바스크립트 기초'\n제목의 노트를 불러오시겠어요?`,
  confirmMessage: '불러오기',
};

export const FullExample = Template.bind({});
FullExample.args = {
  message: '전체 예제 팝업 메시지입니다.',
  confirmMessage: '불러오기',
  singleButton: false,
};
