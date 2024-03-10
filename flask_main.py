# app.py
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/api/cryptos', methods=['GET'])
def get_cryptos():
    symbol = request.args.get('symbol', None)
    if symbol:
        response = requests.get(f'https://api.coingecko.com/api/v3/coins/markets', params={
            'vs_currency': 'usd',
            'symbols': symbol.lower()
        })
        cryptos = response.json()
        if cryptos:
            return jsonify(cryptos[0])  # Предполагается, что ответ содержит массив
        else:
            return jsonify({"error": "Cryptocurrency not found"}), 404
    else:
        # Если символ не указан, возвращаем сообщение об ошибке
        return jsonify({"error": "Symbol parameter is required"}), 400

if __name__ == '__main__':
    app.run(debug=True)
