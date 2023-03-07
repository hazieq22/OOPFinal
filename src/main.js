var electron = require('electron');
var{ipcRenderer} = electron;

ipcRenderer.on("item:add", function(e,item){
    var newItem = document.createElement('li');
    newItem.innerHTML = `${item.names} - ${item.description} - ${item.place}`
    console.log(item)
    document.getElementById("list").appendChild(newItem);
})

ipcRenderer.on("item:clear", function(){
    document.getElementById("list").innerHTML=""
})