const calculate = (operands, operator) => {
    return new Promise((resolve, reject) => {
        try{
        const convertedOperands = operands.map(operand => parseInt(operand));
        for(let op of operator) {
            let result;
            if(op === "+") {
                result  =  convertedOperands[0] + convertedOperands[1];
            } else if (op === '-') {
                result  =  convertedOperands[0] - convertedOperands[1];
            } else if (op === '*') {
                result  =  convertedOperands[0] * convertedOperands[1]
            } else {
                result  =  convertedOperands[0] / convertedOperands[1]
            }
            convertedOperands.splice(0, 2, result);
        }
        resolve(convertedOperands[0]);
    } catch(error) {
        reject(error);
    }
    });
}

module.exports= {
    calculate
}