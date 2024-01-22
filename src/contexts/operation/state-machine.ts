import { OperationState } from "."

export class OperationStateMachine {
  code: string
  state: OperationState

  constructor(code: string, state = 1 as OperationState) {
    this.code = code
    this.state = state // Default state is 'Draft' (Status 1)
  }

  // ... other methods (requestForApproval, pause, approve, reject, complete)

  // Method to check if a transition is valid
  isValidTransition(newState: number) {
    // Define valid transitions based on the current state
    const validTransitions: any = {
      1: [2], // Draft can go to Pending Approval
      2: [3, 4], // Pending Approval can go to Approved or Rejected
      3: [5, 6], // Approved can go to Paused or Completed
      4: [2], // Rejected can go back to Pending Approval
      5: [6], // Paused can go to Completed
    }

    return validTransitions[this.state].includes(newState)
  }

  changeState(newState: OperationState) {
    if (this.isValidTransition(newState)) {
      this.state = newState
    } else {
      throw new Error(
        `Invalid transition for operation ${this.code} in state ${this.state}`,
      )
    }
  }
}
