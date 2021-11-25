
const socket=io('http://localhost:4500')
const you=prompt("Enter your name")
socket.emit('new-user-joined',you);
const rightcontainer=document.querySelector("#right-container");
const append=(message,position,user)=>{
    const messageElement=document.createElement('div');
    //const messageBox=document.createElement('div');
    const topName=document.createElement('h4');
    const messagePara=document.createElement('p');
    messagePara.innerHTML=message;
    //messageElement.innerHTML=message;
    topName.className="messenger-name"+position;
   // messageBox.className="message-box";
    messageElement.classList.add(position);
    messageElement.className=position;
    messageElement.style.marginTop="10px";
    topName.innerHTML=user;
   if(position!="center")
    {
        messageElement.append(topName);
    }
    messageElement.append(messagePara);
    //messageBox.append(messageElement);
   if(position==="right")
   {
       messageElement.style.backgroundColor="rgba(161, 199, 250, 0.212)";
   }
    rightcontainer.append(messageElement);
    
};
socket.on('user-joined',(name)=>{
    append(`${name} joined the chat`,"center","null");
   
});
socket.on('receive',(data)=>{
    append(`${data.message}`,"left",`${data.name}`);
});
const inputBox=document.querySelector('#send-container');
const sendButton=document.querySelector('.button-send');
const sendButtonIcon=document.querySelector('#button-send-icon');
const messageForm=document.querySelector('.messsage-form');
messageForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const messageValue=inputBox.value;
    append(`${messageValue}`,"right",`You`);
    socket.emit('send',messageValue);
     document.querySelector('#send-container').value=" ";
     
})
inputBox.addEventListener("focus",()=>{
    sendButton.style.display="block";
    sendButtonIcon.style.display="block";
})
