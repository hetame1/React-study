import styles from './FullScreenMessage.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface FullScreenMessageProps {
  type: 'loading' | 'error'
}

const FullScreenMessage = ({ type }: FullScreenMessageProps) => {
  return (
    <div className={cx('container')}>
      {type === 'loading' ? (
        <Heart />
      ) : (
        <>
          에러가 발생했어요. <br />
          <Error />
        </>
      )}
    </div>
  )
}

const Heart = () => {
  return (
    <svg
      className={cx('icon-header')}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(0 -1028.4)">
        <path d="m7 1031.4c-1.5355 0-3.0784 0.5-4.25 1.7-2.3431 2.4-2.2788 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-0.75 0.8-0.75-0.8c-1.172-1.2-2.7145-1.7-4.25-1.7z" />
      </g>
    </svg>
  )
}

const Error = () => {
  return (
    <svg
      className={cx('icon-error')}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width={48}
      height={48}
      viewBox="0 0 128 128"
    >
      <g>
        <g>
          <path
            d="M64,0C28.656,0,0,28.656,0,64s28.656,64,64,64s64-28.656,64-64S99.344,0,64,0z M64,120    C33.125,120,8,94.875,8,64S33.125,8,64,8s56,25.125,56,56S94.875,120,64,120z"
            fill="#B0BEC5"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M75.313,64l16.969-16.969c3.125-3.125,3.125-8.195,0-11.313c-3.117-3.125-8.188-3.125-11.313,0L64,52.688    L47.031,35.719c-3.125-3.125-8.195-3.125-11.313,0c-3.125,3.117-3.125,8.188,0,11.313L52.688,64L35.719,80.969    c-3.125,3.125-3.125,8.195,0,11.313c3.117,3.125,8.188,3.125,11.313,0L64,75.313l16.969,16.969c3.125,3.125,8.195,3.125,11.313,0    c3.125-3.117,3.125-8.188,0-11.313L75.313,64z"
            fill="#F44336"
          />
        </g>
      </g>
    </svg>
  )
}

export default FullScreenMessage
