interface BadgeProps {
  /** 뱃지에 표시될 텍스트 내용 */
  text: string
  /** 뱃지의 변형 스타일을 지정합니다 */
  variant?: 'default' | 'success' | 'warning' | 'danger'
  /** 뱃지의 크기를 지정합니다 */
  size?: 'sm' | 'md' | 'lg'
}

const Badge = ({ text, variant = 'default', size = 'md' }: BadgeProps) => {
  // 변형 스타일에 따른 배경색 클래스를 결정하는 객체
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
  }

  // 크기에 따른 패딩과 폰트 크기 클래스를 결정하는 객체
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  }

  return (
    <span
      className={`
        inline-block rounded-full font-medium
        ${variantClasses[variant]}
        ${sizeClasses[size]}
      `}
    >
      {text}
    </span>
  )
}

export default Badge
