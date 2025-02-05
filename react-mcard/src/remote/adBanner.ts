import { collection, getDocs } from 'firebase/firestore'
import { db } from './firebase'

import { COLLECTIONS } from '@constants/'
import { AdBanner } from '@models/card'

export async function getAdBanners() {
  const adBannerSnapshot = await getDocs(collection(db, COLLECTIONS.ADBANNER))

  return adBannerSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as AdBanner),
  }))
}
