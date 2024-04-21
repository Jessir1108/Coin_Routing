import pymysql
import requests
import time

def obtener_precio(symbol):
    url = f"https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest"
    parametros = {
        'symbol': symbol,
        'convert': 'USD'
    }
    headers = {
        'X-CMC_PRO_API_KEY': '2ee1533b-51b4-4824-9454-31d436e8669a'
    }
    respuesta = requests.get(url, headers=headers, params=parametros)
    data = respuesta.json()
    return data['data'][symbol]['quote']['USD']['price']

def almacenar_precio(symbol, precio):
    conn = pymysql.connect(
        host='efrouting.cuuo9scbn0zr.us-east-2.rds.amazonaws.com',
        user='admin',
        password='1001819879',
        database='Test'
    )
    cursor = conn.cursor()

    timestamp = int(time.time())
    cursor.execute("INSERT INTO precios (symbol, precio, timestamp) VALUES (%s, %s, %s)", (symbol, precio, timestamp))

    conn.commit()
    conn.close()

def lambda_handler(event, context):
    bitcoin_price = obtener_precio('BTC')
    ethereum_price = obtener_precio('ETH')
    almacenar_precio('BTC', bitcoin_price)
    almacenar_precio('ETH', ethereum_price)

    return {
        'statusCode': 200,
        'body': 'Precios almacenados en RDS MySQL'
    }
