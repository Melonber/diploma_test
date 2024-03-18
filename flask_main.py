from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from datetime import datetime
import time

app = Flask(__name__)
CORS(app)

# Хранилище логов запросов
request_logs = []
suspect_log = []

def log_request(req):
    now = datetime.now().strftime("%d/%b/%Y %H:%M:%S")
    log_entry = f"{req.remote_addr} - - [{now}] \"{req.method} {req.full_path} HTTP/1.1\" 200"
    print(log_entry)
    if 'script' in log_entry:
        suspect_log.append(log_entry)
    request_logs.append(log_entry)


@app.route('/api/cryptos', methods=['GET'])
def get_cryptos():
    symbol = request.args.get('symbol', None)
    log_request(request)  # Логируем запрос

    if symbol:
        response = requests.get('https://api.coingecko.com/api/v3/coins/markets', params={
            'vs_currency': 'usd',
            'symbols': symbol.lower()
        })
        cryptos = response.json()
        if cryptos:
            return jsonify(cryptos[0])  # Предполагается, что ответ содержит массив
        else:
            return jsonify({"error": "Cryptocurrency not found"}), 404
    else:
        # Если символ не указан, возвращаем топ-20 криптовалют
        response = requests.get('https://api.coingecko.com/api/v3/coins/markets', params={
            'vs_currency': 'usd',
            'order': 'market_cap_desc',
            'per_page': 20,
            'page': 1
        })
        return jsonify(response.json())


@app.route('/api/logs', methods=['GET'])
def get_logs():
    # Возвращаем логи запросов
    return jsonify(request_logs)


if __name__ == '__main__':
    app.run(debug=True)
