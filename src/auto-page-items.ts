import { rateLimit } from './utils'

// request with maximum available page size to minimize number of requests
const MAX_PAGE_SIZE = 200

type RequestItemsFn<Item> = (
  page: number,
  pageSize: number
) => Promise<{
  total_items: number
  page_count: number
  items: Item[]
}>

const requestPageItems = async <Item>(
  requestFn: RequestItemsFn<Item>,
  page = 1
): Promise<Item[]> => {
  await rateLimit()
  const { items = [] } = (await requestFn(page, MAX_PAGE_SIZE)) || {}
  const moreItems =
    items.length === MAX_PAGE_SIZE
      ? await requestPageItems(requestFn, page + 1)
      : []
  return [...items, ...moreItems]
}

export const autoPageItems = async <Item>(
  requestFn: RequestItemsFn<Item>
): Promise<{
  total_items: number
  page_count: 1
  items: Item[]
}> => {
  const { total_items = 0, items = [] } =
    (await requestFn(1, MAX_PAGE_SIZE)) || {}
  return {
    total_items,
    page_count: 1,
    items: [
      ...items,
      ...(total_items > items.length
        ? await requestPageItems(requestFn, 2)
        : []),
    ],
  }
}
