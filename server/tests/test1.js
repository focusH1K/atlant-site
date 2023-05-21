exports.calculatePower = function(num, pow) {
    if (pow == 0) {
    return 1;
    } else if (pow == 1) {
    return num;
    } else if (pow > 1){
    result = num;
    for (let i = 2; i <= pow; i++) {
    result = result * result;
    }
    return result;
    }
    return null;
   }
   