import SHA256 from 'crypto-js/sha256.js';
import Transaction from './transaction.js';

export default class Block {

    /**
     * @type Array<Transaction>
     */
    transactions = []

    constructor(index, timestamp, transactions, prevHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.prevHash = prevHash;
        this.nounce = 0;
        this.difficulty = 0;
        this.hash = this.calculateHash();
        // console.log("Block: created " + this.hash);
    }

    calculateHash() {
        return this.hash = SHA256(this.index + this.timestamp + this.prevHash + JSON.stringify(this.transactions) + this.nounce).toString()
    }


    mineBlock(difficulty) {
        this.nounce = 0;
        this.difficulty = difficulty;
        console.log("\n-------------------Mining new block-------------------")
        console.time("Block Mined In")
        while (this.hash.substr(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nounce = parseInt(this.nounce) + 1;
            this.calculateHash();
        }
        console.timeEnd("Block Mined In")
    }

    isValid() {
        return this.hash.substr(0, this.difficulty) === Array(this.difficulty + 1).join("0")
    }
}