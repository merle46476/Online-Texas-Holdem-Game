let playerModel = require('../models/player');

let user1 = new playerModel({ username:'user1', password:'111', email:'dummy1', chips:100 });
let user2 = new playerModel({ username:'user2', password:'222', email:'dummy2', chips:200 });

module.exports = {
    create_1: ()=>{
        user1.save((err)=>{
            if (err) return handleError(err);
            console.log('saved user1');
    })},

    create_2: ()=>{
        user2.save((err)=>{
        if (err) return handleError(err);
        console.log('saved user2');
    })}
}
