import styled from '@emotion/styled'

interface SpacingProps {
  size: number
  direction: 'vertical' | 'horizontal'
}

const Spacing = styled.div<SpacingProps>`
  ${({ direction, size }) =>
    direction === 'vertical'
      ? `
      height: ${size}px;
    `
      : `
      width: ${size}px;
    `}
`

export default Spacing
