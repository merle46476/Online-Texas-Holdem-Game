const getStats = ((numOfPlayers, time, smallBlind, bigBlind)=>{
    return [numOfPlayers, time, smallBlind, bigBlind];
})();

module.exports = {
    num: getStats[0], 
    time: getStats[1],
    smallBlind: getStats[2],
    bigBlind: getStats[3]
};
