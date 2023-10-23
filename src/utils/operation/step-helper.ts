export const getLastStep = (operationState: number) => {
  if (operationState < 2) {
    return 3
  } else {
    5
  }
}

export const isShortForm = (operationState: number) => {
  return operationState <= 2
}

export const isFullForm = (operationState: number) => {
  return operationState >= 3
}

export const isLastStep = (operationState: number, active: number) => {
  return (
    (isFullForm(operationState) && active === 5) ||
    (isShortForm(operationState) && active === 2)
  )
}
