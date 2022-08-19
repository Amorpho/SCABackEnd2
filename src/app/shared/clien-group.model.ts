import {AssignmentType} from "./assignment.model";

export interface ClientGroup {
  id?: string
  clientName: string
  assignments: AssignmentType[]
}
