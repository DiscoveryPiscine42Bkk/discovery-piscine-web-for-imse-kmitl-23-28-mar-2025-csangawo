$(document).ready(function () {   
     setInterval(function() {
    alert('Please, use me...');
    }, 30000);
    $('#calculateButton').click(function () {
        const leftOperand = parseFloat($('#leftOperand').val());
        const operator = $('#operator').val();
        const rightOperand = parseFloat($('#rightOperand').val());
        let result;

        if (!Number.isInteger(leftOperand) || leftOperand < 0 || 
        !Number.isInteger(rightOperand) || rightOperand < 0) {
        alert('Error :(');
        return;
    }
        if (isNaN(leftOperand) || isNaN(rightOperand)) {
            alert('Error :(');
            return;
        }

        switch (operator) {
            case '+':
                result = leftOperand + rightOperand;
                break;
            case '-':
                result = leftOperand - rightOperand;
                break;
            case '*':
                result = leftOperand * rightOperand;
                break;
            case '/':
                if (rightOperand == 0) {
                    alert('It’s over 9000!');
                    return;
                }
                result = leftOperand / rightOperand;
                break;
            case '%':
                result = leftOperand % rightOperand;
                if (rightOperand == 0) {
                    alert('It’s over 9000!');
                    return;
                }
            default:
                alert('Invalid operator.');
                return;
        }

        alert('Result: ' + result);
        console.log('Result:', result);
        

    });

});
