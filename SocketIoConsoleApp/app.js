var socket = new WebSocket("ws://localhost:5000");

socket.onopen = function (event){
    window.setInterval(function (){
        socket.send('ping from client :' + new Date())
    },2000)
}