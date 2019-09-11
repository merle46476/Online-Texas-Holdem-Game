const suits = ['clubs', 'diamonds', 'hearts', 'spades'];
const pool = (()=>{
        let pool = [];
        for(let i=1; i<14; i++){
            for(let j=0; j<suits.length; j++){
                pool.push(i+suits[j]) 
            }
        }
        return pool;
    })();

const drawOneCard = (pool)=>{ 
        return pool[Math.floor(Math.random()*pool.length)]; 
    }










module.exports = {
    //suits
    suits: suits,
    //create all the cards
    pool: pool 

    //a function to draw one card from certain pool
    drawOneCard: drawOneCard     

};
