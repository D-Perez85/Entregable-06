const socket = io();

const producto = document.getElementById("productos");
const productoForm = document.getElementById("productsForm")
const titleInput = document.getElementById("title");
const priceInput = document.getElementById("price");
const thumbnailInput = document.getElementById("thumbnail");

productoForm.addEventListener("submit", (event) =>{
    event.preventDefault();
    const title = titleInput.value
    const price = priceInput.value
    const thumbnail = thumbnailInput.value
    const newProduct = { title, price, thumbnail }   

    socket.emit("newProduct", newProduct)
    titleInput.value ="";
    priceInput.value ="";
    thumbnailInput.value ="";    
})


socket.on('products', (products) => {  
     fetch('vista.hbs')
        .then((data) =>data.text())
        .then((serverTemplate) =>{
            const template = Handlebars.compile(serverTemplate);
            const html = template({products});
            producto.innerHTML = html;
        })  
});

const msg = document.getElementById('msg');
const messagesForm = document.getElementById('formMessages');
const emailImput = document.getElementById('email');
const messageImput = document.getElementById('message');

messagesForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = emailImput.value.toUpperCase();
    const message = messageImput.value;
    socket.emit('newUser', username); 
    socket.emit('newMessage', message);
});

socket.on("message", (data) => {
    const html = data.map((user) => {
        let renderMessage = ` <p style="padding-top: 0.5rem"><b>
                                <span style="color: blue">${user.username}</b></span> 
                                <span style="color: brown">[${user.time}]:</span> 
                                <span style="color: green"><i>${user.text}</i></span></p>
                                `;        
        return renderMessage;
      })
      .join("\n");
    document.getElementById("msg").innerHTML = html;  
  });

socket.on('chatMessage', (data) =>{
    const user = data.username;
    const message = data.text;
    socket.on('userDisconnected', () =>{ 
        let renderMsgDisc = `<p style="color: red"><b>Usuario: ${user} desconectado</b></p>`;
        document.getElementById("msg").innerHTML = renderMsgDisc
    });
    let renderMsgChat = ` <p style="padding-top: 0.3rem"><b>
                        <span style="color: blue">${user}</b></span> 
                        <span style="color: brown">[${data.time}]:</span> 
                        <span style="color:green"><i>${message}</i></span></p>`;

    document.getElementById("msg").innerHTML += renderMsgChat    
});











