export const sortBy = (
  a: string | number,
  b: string | number,
  sortedKey: string,
  sortedType: string
) => {
  if (sortedType === "desc") {
    if (a[sortedKey as keyof typeof a] < b[sortedKey as keyof typeof b]) {
      return -1
    }
    if (a[sortedKey as keyof typeof a] > b[sortedKey as keyof typeof b]) {
      return 1
    }
    return 0
  }
  if (a[sortedKey as keyof typeof a] > b[sortedKey as keyof typeof b]) {
    return -1
  }
  if (a[sortedKey as keyof typeof a] < b[sortedKey as keyof typeof b]) {
    return 1
  }
  return 0
}
