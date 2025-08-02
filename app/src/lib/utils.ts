enum CopyStatus {
  NotAvailable,
  OnOrder,      
  InTransit,    
  OnHold,       
  OnLoan,       
  InLibrary     
}

export function getBookStatuses() {
  return Object.values(CopyStatus).filter((value) => typeof value === "string");
}

export interface AuthorType {
  id: number
  first_name: string
  family_name: string
}

export interface GenreType {
  id: number
  title: string
}
