import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { motion } from 'framer-motion'
import { useCallback } from 'react'

import Top from '@/components/shared/Top'
import ListRow from '@/components/shared/ListRow'
import { getCard } from '@/remote/card'
import FixedBottomButton from '@/components/shared/FixedBottomButton'
import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import { css } from '@emotion/react'
import useUser from '@/hooks/auth/useUser'
import { useAlertContext } from '@/contexts/AlertContext'

function CardPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()

  const user = useUser()
  const { open } = useAlertContext()

  const moveToApply = useCallback(() => {
    if (user == null) {
      open({
        title: '로그인이 필요해요',
        description: '로그인 후 신청해주세요.',
        onButtonClick() {
          navigate('/signin')
        },
      })
    } else {
      navigate(`/apply/${id}`)
    }
  }, [user, navigate, id, open])

  const { data } = useQuery(['card', id], () => getCard(id), {
    enabled: !!id,
  })

  if (!data) return null

  const { name, corpName, promotion, tags, benefit } = data

  const subTitle =
    promotion != null ? removeHtmlTags(promotion.title) : tags.join(', ')

  return (
    <div>
      <Top title={`${corpName} ${name}`} subTitle={subTitle} />

      <ul>
        {benefit.map((text, index) => (
          <motion.li
            key={text}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
          >
            <ListRow
              as="div"
              left={<IconCheck />}
              contents={
                <ListRow.Texts title={`혜택 ${index + 1}`} subtitle={text} />
              }
            />
          </motion.li>
        ))}
      </ul>

      {promotion != null ? (
        <Flex direction="column" css={termsContainerStyle}>
          <Text bold>유의사항</Text>
          <Text typography="t7">{removeHtmlTags(promotion.terms)}</Text>
        </Flex>
      ) : null}

      <FixedBottomButton label="신청하기" onClick={moveToApply} />
    </div>
  )
}

function IconCheck() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.3333 4L6.66667 10.6667L3.33333 7.33333"
        stroke="#111111"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function removeHtmlTags(text: string) {
  let output = ''

  for (let i = 0; i < text.length; i++) {
    if (text[i] === '<') {
      for (let j = i; j < text.length; j++) {
        if (text[j] === '>') {
          i = j
          break
        }
      }
    } else {
      output += text[i]
    }
  }

  return output
}

const termsContainerStyle = css`
  margin-top: 80px;
  padding: 0 24px 80px;
`

export default CardPage
