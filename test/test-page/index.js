document.onload = function (){
var socket = io.connect ('');

// 登录
// 创建聊天室
// 发送聊信息

var email = $('#email').val
var password = $('#password').val
$('#submit').on('click', function(){
	login(email, password);
});


var uid = $('#receiver-uid').val
$('#create').on('click', function(){
	create-a-new-chat-room(uid);
});

var cid = $('#send-cid').val
var message = $('#message').val
$('#send').on('click', function(){
	send-a-new-chat-message(cid, message);
});

var login = function (email, password) {
	socket.emit ('login', {'email': email, 'password': password, 'status': 'online'}, )

}
var create-a-new-chat-room = function (uid){}
var send-a-new-chat-message = function (cid, message){}

}
