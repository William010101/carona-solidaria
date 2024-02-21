const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.urlencoded({extended:true}));

console.log('conectado');

fs.access('../data/motorista.json', fs.constants.F_OK, (err) => {
    console.log(err ? 'Arquivo motorista.json não existe' : '');
});

fs.access('../data/passageiro.json', fs.constants.F_OK, (err) => {
    console.log(err ? 'Arquivo passageiro.json não existe' : '');
});


const readFile = (filename) => {
    const atual = fs.readFileSync(`../data/${filename}.json`, 'utf-8');
    return atual == '' ? [] : JSON.parse(atual);
}

const writeFile = (filename, arrayElement) => {
    const currentData = readFile(filename);
    currentData.push(arrayElement);
    const updateFile = JSON.stringify(currentData);
    fs.writeFileSync(`../data/${filename}.json`, updateFile,'utf-8')
}

app.post('/',(req, resp) => {
    const { motorista } = req.body;
    if (motorista === 'sim') {
        writeFile('motorista', req.body);
    } else {
        writeFile('passageiro', req.body);
    }
    console.log(req.body);
    resp.send('<h1>Parabéns</h1>');  
});
  
app.get('/getAtributes', (req,resp)=>{
    const motoristaData = readFile('motorista');
    const passageiroData = readFile('passageiro');
    resp.send({ motorista: motoristaData, passageiro: passageiroData }); 
})

app.listen(3003);
