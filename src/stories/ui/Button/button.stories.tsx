import type { Meta, StoryObj } from '@storybook/react'
import Button from './button'

/**
 * Button 컴포넌트의 스토리북 설정입니다.
 * 여기서는 컴포넌트가 스토리북에서 어떻게 표시되고 문서화될지 정의합니다.
 */
const meta = {
  // 스토리북 사이드바에서 표시될 컴포넌트의 제목
  title: 'UI/Button',
  
  // 문서화할 실제 컴포넌트
  component: Button,
  
  // 스토리북 캔버스에서 컴포넌트를 중앙에 배치
  parameters: {
    layout: 'centered',
  },
  
  // 자동으로 문서를 생성하도록 설정
  tags: ['autodocs'],
  
  // 컴포넌트의 props에 대한 설명과 제어 방법을 정의
  argTypes: {
    label: {
      description: '버튼에 표시될 텍스트',
      control: 'text',
    },
    size: {
      description: '버튼의 크기',
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      description: '버튼의 스타일 변형',
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
    },
    disabled: {
      description: '버튼의 비활성화 상태',
      control: 'boolean',
    },
    onClick: {
      description: '클릭 이벤트 핸들러',
      action: 'clicked',
    },
    animation: {
      description: '버튼에 적용될 애니메이션 효과',
      control: 'select',
      options: ['none', 'bounce', 'pulse', 'shake'],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

/**
 * 기본 버튼 스토리
 * 가장 기본적인 사용 예시를 보여줍니다.
 */
export const Default: Story = {
  args: {
    label: '기본 버튼',
  },
}

/**
 * 비활성화된 버튼
 * 클릭할 수 없는 상태의 버튼을 보여줍니다.
 */
export const Disabled: Story = {
  args: {
    label: '비활성화 버튼',
    disabled: true,
  },
}

/**
 * 다양한 크기의 버튼들
 * 서로 다른 크기의 버튼들을 한번에 보여줍니다.
 */
export const Sizes: Story = {
  args: {
    label: '',
  },
  decorators: [
    (Story) => (
      <div className="flex gap-4 items-center">
        <Button label="작은 버튼" size="sm" />
        <Button label="중간 버튼" size="md" />
        <Button label="큰 버튼" size="lg" />
      </div>
    ),
  ],
}

/**
 * 다양한 스타일의 버튼들
 * 사용 가능한 모든 변형 스타일을 보여줍니다.
 */
export const Variants: Story = {
  args: {
    label: '',
  },
  decorators: [
    (Story) => (
      <div className="flex gap-4 items-center">
        <Button label="기본" variant="primary" />
        <Button label="보조" variant="secondary" />
        <Button label="위험" variant="danger" />
      </div>
    ),
  ],
}

/**
 * 애니메이션이 적용된 버튼들
 * Framer Motion을 사용한 다양한 애니메이션 효과를 보여줍니다.
 */
export const Animations: Story = {
  args: {
    label: '',
  },
  decorators: [
    (Story) => (
      <div className="flex gap-4 items-center">
        <Button label="튀는 효과" animation="bounce" />
        <Button label="맥박 효과" animation="pulse" />
        <Button label="흔들림 효과" animation="shake" />
      </div>
    ),
  ],
}

/**
 * 애니메이션과 스타일이 결합된 버튼들
 * 다양한 스타일과 애니메이션의 조합을 보여줍니다.
 */
export const AnimatedVariants: Story = {
  args: {
    label: '',
  },
  decorators: [
    (Story) => (
      <div className="flex gap-4 items-center">
        <Button 
          label="기본" 
          variant="primary" 
          animation="bounce" 
        />
        <Button 
          label="보조" 
          variant="secondary" 
          animation="pulse" 
        />
        <Button 
          label="위험" 
          variant="danger" 
          animation="shake" 
        />
      </div>
    ),
  ],
}
