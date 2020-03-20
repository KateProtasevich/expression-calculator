function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
  let str = expr;
  let pattern_mult_div = /(^|\(|\+|-|\*)\s*((-?\d+(\.\d+)?(e-?\d+)?)\s*([*\/])\s*(-?\d+(\.\d+)?(e-?\d+)?))/;
  let pattern_mult_divg = /(^|\(|\+|-|\*)\s*((-?\d+(\.\d+)?(e-?\d+)?)\s*([*\/])\s*(-?\d+(\.\d+)?(e-?\d+)?))/g;
  let pattern_sum_dif = /(^|\()\s*((-?\d+(\.\d+)?(e-?\d+)?)\s*([-\+ss])\s*(-?\d+(\.\d+)?(e-?\d+)?))\s*($|\)|-|\+)/;
  let pattern_sum_difg = /(^|\()\s*((-?\d+(\.\d+)?(e-?\d+)?)\s*([-\+ss])\s*(-?\d+(\.\d+)?(e-?\d+)?))\s*($|\)|-|\+)/g;
  let pattern = /\s*(-?\d+(\.\d+)?(e-?\d+)?)\s*/g;

    class ExpressionError extends Error {
    constructor(message) {
      super(message);
      this.name = "ExpressionError";
    }
  }

  class TypeError extends Error {
  constructor(message) {
    super("TypeError: Division by zero.");
    this.name = "TypeError";
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
        throw new ExpressionError("ExpressionError: Brackets must be paired");
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
        throw new TypeError("TypeError: Division by zero.");
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
      while (str.match(pattern_mult_div)) {
        str = str.replace(pattern_mult_div, (match, p1, p2, p3, p4, p5, p6, p7) => mult_div(p3, p6, p7, p1) );

        str = removeBrackets(str);
      }

    }

    function sum() {
      while ( str.match(pattern_sum_dif) ) {
        str = str.replace(pattern_sum_dif, (match, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10) => sum_dif(p3, p6, p7, p1, p10) );
        str = removeBrackets(str);
      }
        }

  bracketsVerification(str);
  while ( str.match(pattern).length > 1) {
    mult();
    sum()
  }

  let num = Number(str);
  let num2 = num.toFixed(4);
  if ( expr.match(pattern).length > 2) {
    return Number(num2);
  }
  return num;
}

module.exports = {
    expressionCalculator
}
