function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
  let str = expr;
  let pattern_mult_div = /(^|\(|\+|-|\*)\s*((-?\d+(\.\d+)?)\s*([*\/])\s*(-?\d+(\.\d+)?))/;
  let pattern_mult_divg = /(^|\(|\+|-|\*)\s*((-?\d+(\.\d+)?)\s*([*\/])\s*(-?\d+(\.\d+)?))/g;
  let pattern_sum_dif = /(^|\()\s*((-?\d+(\.\d+)?)\s*([-\+ss])\s*(-?\d+(\.\d+)?))\s*($|\)|-|\+)/;
  let pattern_sum_difg = /(^|\()\s*((-?\d+(\.\d+)?)\s*([-\+ss])\s*(-?\d+(\.\d+)?))\s*($|\)|-|\+)/g;
  let pattern = /\s*(-?\d+(\.\d+)?)\s*/g;

    class ExpressionError extends Error {
    constructor(message) {
      super(message);
      this.name = "ExpressionError";
    }
  }

    function braketsCounter(str, braket) {
      if (braket == '(') {
        if ( str.match(/[\(]/g) ) {
        return str.match(/[\(]/g).length;
      } else {
        return 0;
      }
      }
      if ( braket == ')' ) {
        if ( str.match(/[\)]/g)) {
          return str.match(/[\)]/g).length;
        } else {
          return 0
        }
      }
    }

    function bracketsVerification(str) {
      if ( braketsCounter(str, '(') != braketsCounter(str, ')') ) {
        throw new ExpressionError("Brackets must be paired");
      }   else {
        return str;
      }
    }
  
    function removeBrackets(str) {
      let pattern2 = /\(\s*(-?\d+(\.\d+)?)\s*\)/g;
      while (str.match(pattern2)) {
        str = str.replace(pattern2, '$1');
      }
      return str;
    }

    function mult_div(a, sign, b, sign2) {
      if ((sign == "/") & b == "0") {
        throw new TypeError("Division by zero.");
      }
      let result = ( sign == "*")? ( a * b): (a / b);
      if ((sign2 == "+") || (sign2 == "-") || (sign2 == "(") || (sign2 == "*"))  {
        return sign2 + " " +result;
      }
      return result;
    }

    function sum_dif(a, sign, b, before, after) {
      let c = Number(a);
      let d = Number(b);
      let result = ( sign == "+")? ( c + d): (c - d);
      if ( ((after == "+") || (after == "-") || (after == ")")) || (before == "(")) {
      return   before + " " +result+" "+ after;
      }
      return result;
    }

    function mult() {
      while (str.match(pattern_mult_divg)) {
        str = str.replace(pattern_mult_divg, (match, p1, p2, p3, p4, p5, p6) => mult_div(p3, p5, p6, p1) );
        str = removeBrackets(str);
      }
    }

    function sum() {
      while ( str.match(pattern_sum_difg) ) {
        str = str.replace(pattern_sum_difg, (match, p1, p2, p3, p4, p5, p6, p7, p8) => sum_dif(p3, p5, p6, p1, p8) );
        str = removeBrackets(str);
      }
        }

  bracketsVerification(str);
  while ( str.match(pattern).length > 1) {
    mult();
    sum()
  }

  let num = Number(str);
  if ( Math.abs(num) > 10 ) {
    return num.toFixed(4);
  }
  return num;
}

module.exports = {
    expressionCalculator
}
