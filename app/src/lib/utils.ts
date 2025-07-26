enum CopyStatus {
  NotAvailable,
  OnOrder,      
  InTransit,    
  OnHold,       
  OnLoan,       
  InLibrary     
}

export function getBookCopyStatuses() {
  return Object.values(CopyStatus).filter((value) => typeof value === "string");
}