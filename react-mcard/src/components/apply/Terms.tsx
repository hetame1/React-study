import { MouseEvent, useCallback, useState } from 'react'

import Agreement from '@components/shared/Agreement'
import FixedBottomButton from '@components/shared/FixedBottomButton'
import { 약관목록 } from '@constants/apply'

function Terms({ onNext }: { onNext: (terms: string[]) => void }) {
  const [termsAgreement, setTermsAgreement] = useState(() => {
    return 약관목록.reduce<Record<string, boolean>>((prev, term) => {
      return {
        ...prev,
        [term.id]: false,
      }
    }, {})
  })

  const 모든약관이_동의되었는가 = Object.values(termsAgreement).every(
    (agreement) => agreement,
  )

  const handleAllAgreement = useCallback(
    (_: MouseEvent<HTMLDivElement>, checked: boolean) => {
      setTermsAgreement((prevTerms) => {
        return Object.keys(prevTerms).reduce(
          (prev, termId) => ({
            ...prev,
            [termId]: checked,
          }),
          {} as Record<string, boolean>,
        )
      })
    },
    [],
  )

  return (
    <div>
      <Agreement>
        <Agreement.Title
          checked={모든약관이_동의되었는가}
          onChange={handleAllAgreement}
        >
          이용약관 동의
        </Agreement.Title>
        {약관목록.map(({ id, title, link }) => (
          <Agreement.Description
            key={id}
            checked={termsAgreement[id]}
            link={link}
            onChange={(_, checked) => {
              setTermsAgreement((prev) => ({
                ...prev,
                [id]: checked,
              }))
            }}
          >
            {title}
          </Agreement.Description>
        ))}
      </Agreement>

      <FixedBottomButton
        label="약관동의"
        disabled={!모든약관이_동의되었는가}
        onClick={() => {
          onNext(Object.keys(termsAgreement))
        }}
      />
    </div>
  )
}

export default Terms
