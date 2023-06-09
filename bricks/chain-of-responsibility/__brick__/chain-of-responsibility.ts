// It helps building a chain of objects. Request enters from
// one end and keeps going from object to object till it finds the suitable handler.

class Account {
  successor?;
  name?;
  balance?;
  setNext(account) {
    this.successor = account;
  }

  pay(amountToPay) {
    if (this.canPay(amountToPay)) {
      return `Paid ${amountToPay} using ${this.name}`;
    } else if (this.successor) {
      console.log(`Cannot pay using ${this.name}. Proceeding...`);
      return this.successor.pay(amountToPay);
    } else {
      console.log("None of the accounts have enough balance");
    }
  }

  canPay(amount) {
    return this.balance >= amount;
  }
}

export class Bank extends Account {
  constructor(balance) {
    super();
    this.name = "bank";
    this.balance = balance;
  }
}

export class Paypal extends Account {
  constructor(balance) {
    super();
    this.name = "Paypal";
    this.balance = balance;
  }
}

export class Bitcoin extends Account {
  constructor(balance) {
    super();
    this.name = "bitcoin";
    this.balance = balance;
  }
}

// // Let's prepare a chain like below
// //      bank.paypal.bitcoin
// //
// // First priority bank
// //      If bank can't pay then paypal
// //      If paypal can't pay then bit coin

// const bank = new Bank(100)          // Bank with balance 100
// const paypal = new Paypal(200)      // Paypal with balance 200
// const bitcoin = new Bitcoin(300)    // Bitcoin with balance 300

// bank.setNext(paypal)
// paypal.setNext(bitcoin)

// // Let's try to pay using the first priority i.e. bank
// bank.pay(259)

// // Output will be
// // ==============
// // Cannot pay using bank. Proceeding ..
// // Cannot pay using paypal. Proceeding ..:
// // Paid 259 using Bitcoin!
