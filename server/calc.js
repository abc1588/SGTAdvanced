
function doMath(num1, num2, operator){

    var result = 0;

    switch (operator){
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            if (num2===0){
              console.log('cannot divide by 0');
              break;
            } else {
                result = num1 / num2;
                break;
            }
    }

    return result;
}

var n1 = parseFloat(process.argv[2]);
var op = process.argv[3];
var n2 = parseFloat(process.argv[4]);

//var answer = doMath(1,2,'add');
var answer = doMath(n1, n2, op);
console.log(answer);