const SHA512 = require('crypto-js/sha512')

function calcularHash(block) {
    return SHA512(
        block.index +
        block.timestamp +
        block.hashAnterior +
        JSON.stringify(block.data) +
        block.nonce).toString();
}

class Block {
    constructor(index, timestamp, data, hashAnterior = "") {
        this.index = index;
        this.hashAnterior = hashAnterior;
        this.timestamp = timestamp;
        this.data = data;
        this.nonce = 0;
        this.hash = calcularHash(this);
    }

    miningBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash=calcularHash(this);
        }

        console.log(`mined block, iterations ${this.nonce}`)
    }

}

class Blockchain {
    constructor() {
        const genBlock = new Block(0, new Date().getTime(), "Block Gen", null);
        genBlock.miningBlock(1);
        this.chain = [genBlock]
    }

    print() {
        this.chain.forEach((block) => console.log(`${JSON.stringify(block)} \n`))
    }
}

const blockChain = new Blockchain();
blockChain.print();