import classNames from 'classnames/bind'
import { useState } from 'react'
import ImageViewer from '../imageViewer'
import Section from '../shared/Section'
import styles from './ImageGallery.module.scss'

const cx = classNames.bind(styles)

const ImageGallery = ({ images }: { images: string[] }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)

  const open = selectedIndex > -1

  const handleSelectImage = (idx: number) => {
    setSelectedIndex(idx)
  }

  const handleClose = () => {
    setSelectedIndex(-1)
  }

  return (
    <>
      <Section title="사진첩">
        <ul className={cx('wrap-images')}>
          {images.map((image, idx) => (
            <li
              key={idx}
              className={cx('wrap-image')}
              onClick={() => {
                handleSelectImage(idx)
              }}
            >
              <img src={image} alt="사진첩 이미지" />
            </li>
          ))}
        </ul>
      </Section>

      <ImageViewer
        images={images}
        open={open}
        selectedIndex={selectedIndex}
        onClose={handleClose}
      />
    </>
  )
}

export default ImageGallery
