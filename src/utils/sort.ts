export const sortExtractor = (sort: string) => {
  const result = sort.split("-")

  return {
    field: result[0],
    order: result[1],
  }
}
