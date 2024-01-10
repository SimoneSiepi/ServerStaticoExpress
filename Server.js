// Dipendenze del progetto
const express=require('express');//importo il framework Express
const app=express();
const favicon = require('serve-favicon'); //importa il modulo che gestisce il favicon
const fs = require('fs'); //importo il modulo per la gestione del File System
const morgan=require('morgan'); //importo il modulo per la gestione dei logger
const path = require('path'); //importo il modulo per la gestione dei percorsi delle cartelle e dei file
const helmet=require('helmet'); //importo il modulo per rendere il server web piu sicuro

const porta=3000;
app.set ('appName', 'Server Web Statico'); //imposta il nome dell'applicazione web

//Middleweare Morgan: per la creazione di un logger: formati predefiniti (short, combined,common, tiny)
//oppure app.use(morgan(':method :url :status - :response-time ms', {stream:accessLogStream}));
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
app.use(morgan('short', {stream: accessLogStream}));

//Middleweare sicurezza helmet
app.use(helmet());//aggiunge un ulteriore layer di sicurezza alle nostre app in Express.js configurando le intestazioni HTTP in modo appropriato

//Middleweare favicon: gestisce il favicon del sito Web
app.use(favicon(path.join(__dirname, 'public/immagini' ,'stip.ico')))

//Middleweare express.static: per restituire al client file statici
app.use(express.static(path.join(__dirname,'public')));

//Middleweare che gestisce l’errore nel caso che nessuna route vada a buon fine
app.use("*",function (req,res,next){
res.status(404);
res.send('Url non presente');
});

app.listen(porta, () => {
    console.log(`Server in ascolto su http://localhost:${porta}`);
});