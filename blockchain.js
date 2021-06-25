import Block from "./block.js";
import Transaction from "./transaction.js";

export default class Blockchain {

    defficultyLevel = 1;

    /**
     * @type Array<Block>
     */
    chain = []

    /**
     * @type Array<Transaction>
     */
    pendingTransactions = []

    constructor() {
        this.chain = Array();
        this.chain.push(
            new Block(0, new Date().toISOString(), [], "")
        );

        this.pendingTransactions = [];
        this.miningReward = 5;
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    getIndexForNewBlock() {
        return this.chain.length;
    }

    /**
     * @param {Block} block 
     */
    addBlock(block) {
        if (block.difficulty !== this.defficultyLevel && !block.isValid()) {
            console.log("Blockchain: This block is not valid. so block has not added.")
            return false;
        }
        if (this.isValidBlockchain() === false) {
            console.log(this.chain)
            console.log("Blockchain: This blockchain is not valid. so block has not added.")
            return false;
        }

        this.chain.push(block)
        console.log("Blockchain: Block added: ", block);
        this.defficultyLevel = this.defficultyLevel + 2;
        return true;
        // console.log(this.chain);

    }

    minePendingTransactions(minerAddress) {
        let block = new Block(this.getIndexForNewBlock(), new Date().toISOString(), this.pendingTransactions, this.getLatestBlock().hash)
        block.mineBlock(this.defficultyLevel);
        if (this.addBlock(block)) {
            this.pendingTransactions = Array();
            this.addTransaction(new Transaction('', minerAddress, this.miningReward));
        }
    }

    addTransaction(trans) {
        this.pendingTransactions.push(trans);
    }

    getBalanceOfAddress(address) {
        let balance = 0;
        this.chain.forEach(block => {
            block.transactions.forEach(transaction => {
                if (transaction.from === address) {
                    balance -= transaction.amount;
                } else if (transaction.to === address) {
                    balance += transaction.amount;
                } else {
                    return;
                }
            })
        })
        return balance;
    }

    isValidBlockchain() {
        for (let index = 0; index < this.chain.length; index++) {
            const block = this.chain[index];
            block.calculateHash();
            if (block.index !== index)
                return false
            else if (this.chain.length > index + 1 && block.hash !== this.chain[index + 1].prevHash)
                return false
            else
                continue;
        }
        return true;
    }
}