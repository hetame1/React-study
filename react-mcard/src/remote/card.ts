import {
  collection,
  getDocs,
  limit,
  query,
  QuerySnapshot,
  startAfter,
} from 'firebase/firestore'
import { db } from './firebase'

import { COLLECTIONS } from '@/constants'
import { Card } from '@/models/card'

// pageParam 지금 보이고있는 맨 마지막요소
export async function getCards(pageParam?: QuerySnapshot<Card>) {
  const cardQuery =
    pageParam == null
      ? query(collection(db, COLLECTIONS.CARD), limit(20))
      : query(
          collection(db, COLLECTIONS.CARD),
          startAfter(pageParam),
          limit(20),
        )

  const cardSnapshot = await getDocs(cardQuery)

  const lastVisible = cardSnapshot.docs[cardSnapshot.docs.length - 1]

  const items = cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))

  return {
    items,
    lastVisible,
  }
}
