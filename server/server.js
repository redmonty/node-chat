const log = a => console.log(a);
const path = require('path'),
    express = require('express'),
    app = express(),
    publicPath = path.join(__dirname, '../public'),
    port = process.env.PORT || 3000;

log(__dirname + '/../public');///Users/Redmonty/Desktop/Новая папка/node-chat-app/server/../public
log(publicPath);///Users/Redmonty/Desktop/Новая папка/node-chat-app/public

app.use(express.static(publicPath));//config express static midlewere

app.get('/', (req,res) => {
    res.send(index);
});


app.listen(port, () => {log(`Server start on port: ${port}`);});