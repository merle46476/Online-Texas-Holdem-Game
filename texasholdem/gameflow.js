//data from rules
const rules = require('./rules');
const startPool = rules.pool;


//data from gamestats
const gamestats = require('./gamestats');
const num = gamestats.num

const preflop = (()=>{
    //make a copy
    const startPoolCopy;
    Object.assign(startPoolCopy, startPool);

    const distributedCards = [];

    for (let i=0; i<num*2; i++){
        const removed = startPoolCopy.splice(Math.floor(Math.random()*startPoolCopy.length), 1)[0];
        distributedCards.push(removed);
    }  
    return {pool: startPoolCopy, cards: distributedCards}; 

})();

const flop = (()=>{

    const preflopPoolCopy;
    Object.assign(preflopPoolCopy, preflop.pool);

    const flop = [];

    for (let i=0; i<3; i++){
        const removed = preflopPoolCopy.splice(Math.floor(Math.random()*preflopPoolCopy.length), 1)[0];
        flop.push(removed);
    }  
    return {pool: preflopPoolCopy, cards: flop};

})();

const turn = (()=>{
    
    const flopPoolCopy;
    Object.assign(flopPoolCopy, flop.pool);
    
    const turn = [];

    const removed = flopPoolCopy.splice(Math.floor(Math.random()*flopPoolCopy.length), 1)[0];
    turn.push(removed)

    return {pool: flopPoolCopy, cards: turn};

})();

const river = (()=>{
    
    const turnPoolCopy;
    Object.assign(turnPoolCopy, turn.pool);
    
    const river = [];

    const removed = turnPoolCopy.splice(Math.floor(Math.random()*turnPoolCopy.length), 1)[0];
    river.push(removed)

    return {pool: turnPoolCopy, cards: river};

})();

module.exports = {

    startPool: startPool,

    preflop: preflop,

    flop: flop,

    turn: turn,

    river: river
}

