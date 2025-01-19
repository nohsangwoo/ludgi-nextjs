import { motion, TargetAndTransition } from 'framer-motion'

interface ButtonProps {
  /** 버튼 내부에 표시될 텍스트 */
  label: string

  /** 버튼의 크기를 지정합니다 */
  size?: 'sm' | 'md' | 'lg'

  /** 버튼의 변형 스타일을 지정합니다 */
  variant?: 'primary' | 'secondary' | 'danger'

  /** 버튼의 비활성화 상태를 지정합니다 */
  disabled?: boolean

  /** 버튼 클릭 시 실행될 함수 */
  onClick?: () => void

  /** 애니메이션 효과를 지정합니다 */
  animation?: 'bounce' | 'pulse' | 'shake' | 'none'
}

/**
 * Button 컴포넌트는 사용자 인터랙션을 위한 기본적인 버튼을 제공합니다.
 * Framer Motion을 사용하여 다양한 애니메이션 효과를 지원합니다.
 * 
 * @component
 * @example
 * // 기본 사용법
 * <Button label="클릭하세요" />
 * 
 * // 애니메이션 효과 추가
 * <Button label="튀는 버튼" animation="bounce" />
 */
const Button = ({ 
  label, 
  size = 'md', 
  variant = 'primary',
  disabled = false,
  onClick,
  animation = 'none'
}: ButtonProps) => {
  // 크기에 따른 패딩과 폰트 크기 클래스를 결정하는 객체
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  // 변형 스타일에 따른 색상 클래스를 결정하는 객체
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  }

  // 비활성화 상태일 때 적용될 클래스
  const disabledClasses = disabled ? 
    'opacity-50 cursor-not-allowed' : 
    'cursor-pointer'

  type AnimationVariant = {
    hover?: TargetAndTransition
    tap?: TargetAndTransition
    animate?: TargetAndTransition
  }

  const animations: Record<NonNullable<ButtonProps['animation']>, AnimationVariant> = {
    bounce: {
      hover: {
        scale: 1.1,
        transition: { duration: 0.2, type: 'spring', stiffness: 400 }
      },
      tap: { scale: 0.95 }
    },
    pulse: {
      animate: {
        scale: [1, 1.05, 1],
        transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
      }
    },
    shake: {
      hover: {
        x: [0, -5, 5, -5, 5, 0],
        transition: { duration: 0.4 }
      }
    },
    none: {}
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-md font-medium transition-colors duration-200
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${disabledClasses}
      `}
      // Framer Motion 애니메이션 속성
      whileHover={animations[animation]?.hover}
      whileTap={animations[animation]?.tap}
      animate={animations[animation]?.animate}
    >
      {label}
    </motion.button>
  )
}

export default Button