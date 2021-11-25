const socket= require('socket.io');
const cors=require('cors');
 const io=require('socket.io')(4500,{
     cors:"*"
 });
 const users={};
  io.on('connection',(socket)=>{
      socket.on('new-user-joined',(name)=>{
          console.log(`new user joined ${name}`);
          users[socket.id]=name;
          socket.broadcast.emit('user-joined',name);
      })
      socket.on('send',(message)=>{
          socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
      })

  })


 