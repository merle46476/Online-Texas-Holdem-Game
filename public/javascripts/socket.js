//not specifying any URL when I call io(), since it defaults to trying to connect to the host that serves the page.
let socket = io();

//load the previous logged in users
socket.on('load', (data)=>{
    let ul = document.getElementById('players');
    for(let i=0; i<data.length; i++){
        let li = document.createElement('li');
        li.setAttribute('id', data[i]);
        li.appendChild(document.createTextNode(data[i]));
        ul.appendChild(li);
    }
});
//add the login user
socket.on('online', (data)=>{
    let username = data;
    let ul = document.getElementById('players');
    let li = document.createElement('li');
    li.setAttribute('id', username);
    li.appendChild(document.createTextNode(username));
    ul.appendChild(li);
});

//remove the logout user
socket.on('offline', (data)=>{
    let username = data;
    let ul = document.getElementById('players');
    let target = document.getElementById(username);
    ul.removeChild(target);
});

//ajax function that can send data to server

//let other know I am ready
document.getElementById('ready').addEventListener('change', ()=>{
    if (this.checked){

    }
})



//warning the user if he refresh the page
//window.onbeforeunload = function() {
//    return "Dude, are you sure you want to leave? Think of the kittens!";
//}
