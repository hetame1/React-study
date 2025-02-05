import { useInfiniteQuery } from 'react-query'
import { flatten } from 'lodash'
import InfiniteScroll from 'react-infinite-scroll-component'

import ListRow from '@shared/ListRow'
import { getCards } from '@/remote/card'
import { useCallback } from 'react'

function CardList() {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(
    ['cards'],
    ({ pageParam }) => {
      return getCards(pageParam)
    },
    {
      getNextPageParam: (snapshot) => {
        return snapshot.lastVisible
      },
    },
  )

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) return

    fetchNextPage()
  }, [hasNextPage, isFetching, fetchNextPage])

  if (!data) return null

  const cards = flatten(data?.pages.map(({ items }) => items))

  return (
    <div>
      <InfiniteScroll
        next={loadMore}
        hasMore={hasNextPage}
        loader={<></>}
        dataLength={cards.length}
      >
        {cards.map((card, index) => (
          <ListRow
            key={card.id}
            contents={
              <ListRow.Texts title={`${index + 1}위`} subtitle={card.name} />
            }
            right={card.payback != null ? <div>{card.payback}</div> : null}
            withArrow
          />
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default CardList
