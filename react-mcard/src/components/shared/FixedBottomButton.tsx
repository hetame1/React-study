import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'

import { createPortal } from 'react-dom'
import Button from '@shared/Button'
import { colors } from '@/styles/colorPalette'

interface Props {
  label: string
  onClick: () => void
  disabled?: boolean
}

function FixedBottomButton({ label, onClick, disabled }: Props) {
  const $portalRoot = document.getElementById('root-portal')

  if (!$portalRoot) return null

  return createPortal(
    <Container>
      <Button
        size="medium"
        onClick={onClick}
        full
        disabled={disabled}
        css={buttonStyle}
      >
        {label}
      </Button>
    </Container>,
    $portalRoot,
  )
}

const slideup = keyframes`
  to {
    transform: translateY(0);
  }
`

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 10px 8px;
  background-color: ${colors.white};
  transform: translateY(100%);
  animation: ${slideup} 0.5s ease-in-out forwards;
`

const buttonStyle = css`
  border-radius: 8px;
`

export default FixedBottomButton
