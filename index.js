import Block from "./block.js";
import Blockchain from "./blockchain.js";
import Transaction from "./transaction.js";

var bitcoin = new Blockchain();

bitcoin.addTransaction(new Transaction("vaitul", "john", 120));

bitcoin.minePendingTransactions('vaitul')

checkBal();

bitcoin.minePendingTransactions('abcd')

checkBal();

function checkBal() {
    console.log("Balance of Vaitul is --->  " + bitcoin.getBalanceOfAddress("vaitul"))
    console.log("Balance of John is --->  " + bitcoin.getBalanceOfAddress("john"))
}
