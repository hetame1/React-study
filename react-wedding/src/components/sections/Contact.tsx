import { Person, Wedding } from '@/models/wedding'
import classNames from 'classnames/bind'
import Accordion from '../shared/Accordion'
import Section from '../shared/Section'
import styles from './Contact.module.scss'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const cx = classNames.bind(styles)

const Contact = ({
  groom,
  bride,
}: {
  groom: Wedding['groom']
  bride: Wedding['bride']
}) => {
  console.log(groom, bride)

  return (
    <Section title="연락처 및 마음 전하실 곳">
      <Accordion label="신랑측">
        <ContactInfo
          name={groom.name}
          account={groom.account}
          phoneNumbers={groom.phoneNumbers}
        />
        <ContactInfo
          name={groom.parents[0].name}
          account={groom.parents[0].account}
          phoneNumbers={groom.parents[0].phoneNumbers}
        />
        <ContactInfo
          name={groom.parents[1].name}
          account={groom.parents[1].account}
          phoneNumbers={groom.parents[1].phoneNumbers}
        />
      </Accordion>
      <Accordion label="신부측">신부측</Accordion>
    </Section>
  )
}

const ContactInfo = ({ name, account, phoneNumbers }: Person) => {
  return (
    <div className={cx('wrap-contact')}>
      {/* 정보 표현 */}
      <div className={cx('wrap-contact-info')}>
        <span>{`${account.bankName} | ${account.accountNumber}`}</span>
        <span>{name}</span>
      </div>

      {/* 버튼들 */}
      <ul className={cx('wrap-buttons')}>
        <li>
          <a href={`tel: ${phoneNumbers}`} className={cx('button')}>
            전화
          </a>
        </li>
        <li>
          <CopyToClipboard
            text={account.accountNumber}
            onCopy={() => {
              alert('계좌번호가 복사되었습니다.')
            }}
          >
            <button className={cx('button')}>복사</button>
          </CopyToClipboard>
        </li>
        {account.kakaopayLink && (
          <li>
            <a
              href={account.kakaopayLink}
              className={cx('button')}
              target="_blank"
              rel="noreferrer"
            >
              송금
            </a>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Contact
