export interface DailyModelModel {

  claimNumber: string;
  date: Date;
  status: string;
  processedBy: string;
  assignment: string;
  client?: string;
  exception: string;
  exception2?: string;
  id?: string;
}
