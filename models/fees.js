class Fees {
  constructor(
    regNo,
    amountDue,
    amountPaid,
    payableAmount,
    paymentDate,
    lateFees,
    remarks,
  ) {
    this.regNo = regNo;
    this.amountDue = amountDue;
    this.amountPaid = amountPaid;
    this.payableAmount = payableAmount;
    this.paymentDate = paymentDate;
    this.lateFees = lateFees;
    this.remarks = remarks;
  }
}

export default Fees;
