import type { Meta, StoryObj } from '@storybook/react'
import Badge from './badge'

/**
 * 스토리북의 메타데이터를 정의합니다.
 * 이 부분은 스토리북에서 컴포넌트를 어떻게 표시하고 문서화할지 설정합니다.
 */
const meta = {
  // 스토리북 사이드바에서 표시될 컴포넌트의 제목
  title: 'UI/Badge',
  
  // 문서화할 실제 컴포넌트
  component: Badge,
  
  // 스토리북 캔버스에서 컴포넌트를 중앙에 배치
  parameters: {
    layout: 'centered',
  },
  
  // 자동으로 문서를 생성하도록 설정
  tags: ['autodocs'],
  
  // 컴포넌트의 props에 대한 설명과 제어 방법을 정의
  argTypes: {
    text: {
      description: '뱃지에 표시될 텍스트',
      control: 'text',
    },
    variant: {
      description: '뱃지의 스타일 변형',
      control: 'select',
      options: ['default', 'success', 'warning', 'danger'],
    },
    size: {
      description: '뱃지의 크기',
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

/**
 * 기본 뱃지 스토리
 * 가장 기본적인 사용 예시를 보여줍니다.
 */
export const Default: Story = {
  args: {
    text: '기본 뱃지',
  },
}

/**
 * 성공 상태의 뱃지
 */
export const Success: Story = {
  args: {
    text: '성공',
    variant: 'success',
  },
}

/**
 * 경고 상태의 뱃지
 */
export const Warning: Story = {
  args: {
    text: '경고',
    variant: 'warning',
  },
}

/**
 * 위험 상태의 뱃지
 */
export const Danger: Story = {
  args: {
    text: '위험',
    variant: 'danger',
  },
}

/**
 * 다양한 크기의 뱃지들을 보여주는 예시
 */
export const Sizes: Story = {
  args: {
    text: '',
  },
  decorators: [
    (Story) => (
      <div className="flex gap-2 items-center">
        <Badge text="작은 크기" size="sm" />
        <Badge text="중간 크기" size="md" />
        <Badge text="큰 크기" size="lg" />
      </div>
    ),
  ],
}
