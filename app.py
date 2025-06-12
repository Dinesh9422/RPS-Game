from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

CHOICES = ['rock', 'paper', 'scissor']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/play', methods=['POST'])
def play():
    data = request.json
    mode = data['mode']
    player1_choice = data['player1']
    player2_choice = data.get('player2')

    if mode == '1-player':
        computer_choice = random.choice(CHOICES)
        result = get_result(player1_choice, computer_choice)
        return jsonify(player1=player1_choice, player2=computer_choice, result=result)

    elif mode == '2-player':
        result = get_result(player1_choice, player2_choice)
        return jsonify(player1=player1_choice, player2=player2_choice, result=result)

    elif mode == 'computer':
        comp1 = random.choice(CHOICES)
        comp2 = random.choice(CHOICES)
        result = get_result(comp1, comp2)
        return jsonify(player1=comp1, player2=comp2, result=result)

def get_result(p1, p2):
    if p1 == p2:
        return 'draw'
    if (p1 == 'rock' and p2 == 'scissor') or \
       (p1 == 'paper' and p2 == 'rock') or \
       (p1 == 'scissor' and p2 == 'paper'):
        return 'player1'
    return 'player2'

if __name__ == '__main__':
   app.run(host='0.0.0.0', port=10000)

