import Button from '@shared/Button'
import { collection, doc, writeBatch } from 'firebase/firestore'

import { db } from '@remote/firebase'
import { adBanners } from '@/mock/data'
import { COLLECTIONS } from '@constants'

function AdBannerListAddButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(db)

    adBanners.forEach((banner) => {
      const docRef = doc(collection(db, COLLECTIONS.ADBANNER))
      batch.set(docRef, banner)
    })

    await batch.commit()

    alert('배너 리스트 추가완료!')
  }

  return <Button onClick={handleButtonClick}>배너 리스트 추가하기</Button>
}

export default AdBannerListAddButton
