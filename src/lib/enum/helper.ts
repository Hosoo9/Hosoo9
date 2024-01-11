export const buildGetterForType = (type: any) => {
  return (id: number | null): string => {
    if (!id) {
      return ''
    }

    return type[id]
  }
}

export const buildForSelect = (type: any) => {
  return Object.keys(type).map((key) => {
    return {
      value: key.toString(),
      label: type[key],
    }
  })
}
