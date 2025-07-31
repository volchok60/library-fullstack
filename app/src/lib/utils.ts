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