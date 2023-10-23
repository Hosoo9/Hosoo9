export const getLastStep = (operationState: number) => {
  if (operationState < 2) {
    return 3
  } else {
    5
  }
}

export const isShortForm = (operationState: number) => {
  return [1, 2, 4].includes(operationState)
}

export const isFullForm = (operationState: number) => {
  return [3, 5, 6].includes(operationState)
}

export const isLastStep = (operationState: number, active: number) => {
  return (
    (isFullForm(operationState) && active === 5) ||
    (isShortForm(operationState) && active === 2)
  )
}
