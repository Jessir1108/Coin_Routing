const express = require('express');
const mysql = require('mysql');

const app = express();


require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});

// Servir archivos estáticos desde el directorio "public"
app.use(express.static('public'));

app.get('/data', (req, res) => {
    connection.query('SELECT * FROM precios', (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            res.status(500).json({ error: 'Error al obtener los datos' });
            return;
        }

        // Separa los datos de Bitcoin y Ethereum
        const dataBTC = results.filter((row) => row.symbol === 'BTC');
        const dataETH = results.filter((row) => row.symbol === 'ETH');

        // Prepara los datos para Plotly.js y crea las etiquetas
        const labels = dataBTC.map((row, index) => {
            const date = new Date(row.timestamp * 1000);
            const prevDate = index > 0 ? new Date(dataBTC[index - 1].timestamp * 1000) : null;
        
            let formattedDate = date.toLocaleString('es-CO', {
                timeZone: 'America/Bogota',
                hour: 'numeric',
                minute: 'numeric',
            });
        
            if (prevDate && date.getDate() !== prevDate.getDate()) {
                formattedDate = date.toLocaleString('es-CO', {
                    timeZone: 'America/Bogota',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                });
            }
        
            return formattedDate;
        });
        

        // Extrae los precios para Bitcoin y Ethereum
        const dataPricesBTC = dataBTC.map((row) => row.precio);
        const dataPricesETH = dataETH.map((row) => row.precio);

        // Envía los datos al frontend
        res.json({labels, dataBTC: dataPricesBTC, dataETH: dataPricesETH });
    });
});


app.listen(8080, () => {
    console.log('Servidor iniciado en http://localhost:8080/');
});

