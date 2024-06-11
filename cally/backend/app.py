from flask import Flask, request, jsonify
from flask_cors import CORS
import math

app = Flask(__name__)
CORS(app)

deductions = {
     73: (0.5, -2), 76:(1, -2), 81:(1.5, -2), 86:(2, -2), 91:(2.5, -2), 96:(3, -2), 101:(3.5, -2), 106:(4, -2), 111:(4.5, -2), 116:(5, -2), 121:(5.5, -2), 126:(6, -2),
     74: (0.5, -1), 77:(1, -1), 82:(1.5, -1), 87:(2, -1), 92:(2.5, -1), 97:(3, -1), 102:(3.5, -1), 107:(4, -1), 112:(4.5, -1), 117:(5, -1), 122:(5.5, -1), 127:(6, -1),
     70: (0.5, 0), 75:(0.5, 0), 78:(1, 0), 83:(1.5, 0), 88:(2, 0), 93:(2.5, 0), 98:(3, 0), 103:(3.5, 0), 108:(4, 0), 113:(4.5, 0), 118:(5, 0), 123:(5.5, 0), 128:(6, 0),
     71:(0, 1), 79:(1, 1), 84:(1.5, 1), 89:(2, 1), 94:(2.5, 1), 99:(3, 1), 104:(3.5, 1), 109:(4, 1), 114:(4.5, 1), 119:(5, 1), 124:(5.5, 1), 129:(6, 1),
     72:(0, 2), 80:(1, 2), 85:(1.5, 2), 90:(2, 2), 95:(2.5, 2), 100:(3, 2), 105:(3.5, 2), 110:(4, 2), 115:(4.5, 2), 120:(5, 2), 125:(5.5, 2), 130:(6, 2)
}

def get_Holes(grossScore):
    return deductions.get(grossScore, (0, 0))[0]

def get_Adjustment(grossScore):
    return deductions.get(grossScore, (0, 0))[1]

def callyScore(scorecard, holeAmount, adjustment):
    scorecard.pop(17)
    scorecard.pop(16)
    scorecard.sort(reverse=True)
    
    curr = 0
    total = 0
    while True:
        if holeAmount == 0.5:
            total += math.ceil(scorecard[curr] / 2)
            return total + adjustment
        elif holeAmount == 0:
            return total + adjustment
        total += scorecard[curr]
        curr += 1
        holeAmount -= 1

@app.route('/api/calculate', methods=['POST'])
def calculate():
    data = request.json
    scores = data.get('scores', [])
    totalScore = sum(scores)
    holeAmount = get_Holes(totalScore)
    adjustment = get_Adjustment(totalScore)
    finalScore = totalScore - callyScore(scores, holeAmount, adjustment)
    return jsonify({'finalScore': finalScore})

if __name__ == '__main__':
    app.run(debug=True)
