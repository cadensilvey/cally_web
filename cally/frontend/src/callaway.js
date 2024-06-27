const map = {
    73: [0.5, -2], 76: [1, -2], 81: [1.5, -2], 86: [2, -2], 91: [2.5, -2], 96: [3, -2], 101: [3.5, -2], 106: [4, -2], 111: [4.5, -2], 116: [5, -2], 121: [5.5, -2], 126: [6, -2],
    74: [0.5, -1], 77: [1, -1], 82: [1.5, -1], 87: [2, -1], 92: [2.5, -1], 97: [3, -1], 102: [3.5, -1], 107: [4, -1], 112: [4.5, -1], 117: [5, -1], 122: [5.5, -1], 127: [6, -1],
    70: [0.5, 0], 75: [0.5, 0], 78: [1, 0], 83: [1.5, 0], 88: [2, 0], 93: [2.5, 0], 98: [3, 0], 103: [3.5, 0], 108: [4, 0], 113: [4.5, 0], 118: [5, 0], 123: [5.5, 0], 128: [6, 0],
    71: [0, 1], 79: [1, 1], 84: [1.5, 1], 89: [2, 1], 94: [2.5, 1], 99: [3, 1], 104: [3.5, 1], 109: [4, 1], 114: [4.5, 1], 119: [5, 1], 124: [5.5, 1], 129: [6, 1],
    72: [0, 2], 80: [1, 2], 85: [1.5, 2], 90: [2, 2], 95: [2.5, 2], 100: [3, 2], 105: [3.5, 2], 110: [4, 2], 115: [4.5, 2], 120: [5, 2], 125: [5.5, 2], 130: [6, 2]
  };
  
  class Scorecard {
    constructor(list, name) {
      this.list = list;
      this.name = name;
    }
  
    getName() {
      return this.name;
    }
  
    getScorecard() {
      return this.list;
    }
  
    sort() {
      const temp = [...this.list];
      temp.splice(16, 2);  // remove last two elements
      return temp.sort((a, b) => b - a);
    }
  
    totalScore() {
      return this.list.reduce((a, b) => a + b, 0);
    }
  
    getHoles() {
      return map[this.totalScore()] ? map[this.totalScore()][0] : 0;
    }
  
    getAdjustment() {
      return map[this.totalScore()] ? map[this.totalScore()][1] : 0;
    }
  
    getDeduction() {
      const scorecard = this.sort();
      let tempHoles = this.getHoles();
      const tempAdjustment = this.getAdjustment();
  
      let curr = 0;
      let total = 0;
  
      while (true) {
        if (tempHoles === 0.5) {
          total += Math.ceil(scorecard[curr] / 2);
          return total + tempAdjustment;
        } else if (tempHoles === 0) {
          return total + tempAdjustment;
        }
        total += scorecard[curr];
        curr++;
        tempHoles--;
      }
    }
  
    calc() {
      return this.totalScore() - this.getDeduction();
    }
  }
  
  module.exports = Scorecard;
  