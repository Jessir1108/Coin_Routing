fetch('/data')
    .then(response => response.json())
    .then(data => {
        // Crear un gráfico de línea para Bitcoin
        var traceBTC = {
            x: data.labels,
            y: data.dataBTC,
            mode: 'lines',
            line: {
                color: 'rgba(255, 99, 132, 1)',
                width: 3    
            },
            name: 'Bitcoin'
        };

        // Crear un gráfico de línea para Ethereum
        var traceETH = {
            x: data.labels,
            y: data.dataETH,
            mode: 'lines',
            line: {
                color: 'rgba(54, 162, 235, 1)',
                width: 3
            },
            name: 'Ethereum'
        };

        // Configurar el diseño del gráfico con tamaño de fuente aumentado
        var layout = {
            title: 'Precio de Bitcoin y Ethereum',
            xaxis: {
                title: 'Fecha y hora',
                titlefont: {
                    size: 14 // Tamaño de fuente para el título del eje x
                },
                tickfont: {
                    size: 14 // Tamaño de fuente para las etiquetas del eje x
                }
            },
            yaxis: {
                title: 'Precio',
                titlefont: {
                    size: 18 // Tamaño de fuente para el título del eje y
                },
                tickfont: {
                    size: 14 // Tamaño de fuente para las etiquetas del eje y
                }
            }
        };

        // Crear la gráfica
        var chartBTC = document.getElementById('myChartBTC');
        var layoutBTC = Object.assign({}, layout); // Create a copy of the layout object
        layoutBTC.title = 'Precio de Bitcoin'; // Set the title for Bitcoin chart
        Plotly.newPlot(chartBTC, [traceBTC], layoutBTC);

        var chartETH = document.getElementById('myChartETH');
        var layoutETH = Object.assign({}, layout); // Create a copy of the layout object
        layoutETH.title = 'Precio de Ethereum'; // Set the title for Ethereum chart
        Plotly.newPlot(chartETH, [traceETH], layoutETH);
    });

// Esperar 3 segundos y luego agregar la clase para desaparecer el mensaje
setTimeout(function() {
    var overlayContent = document.querySelector('.overlay-content');
    overlayContent.classList.add('fade-out');
    overlayContent.addEventListener('animationend', function() {
        overlayContent.parentElement.remove(); // Elimina el overlay del DOM
    });
    var overlay = document.querySelector('.overlay');
    overlay.classList.add('fade-out');
}, 2500);

  