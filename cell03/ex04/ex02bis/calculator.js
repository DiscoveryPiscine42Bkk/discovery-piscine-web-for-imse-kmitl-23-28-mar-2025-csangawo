$(document).ready(function () {
    $('#calculateButton').click(function () {
        const leftOperand = parseFloat($('#leftOperand').val());
        const operator = $('#operator').val();
        const rightOperand = parseFloat($('#rightOperand').val());
        let result;

        if (isNaN(leftOperand) || isNaN(rightOperand)) {
            alert('Please enter valid numbers.');
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
                if (rightOperand === 0) {
                    alert('Division by zero is not allowed.');
                    return;
                }
                result = leftOperand / rightOperand;
                break;
            case '%':
                result = leftOperand % rightOperand;
                break;
            default:
                alert('Invalid operator.');
                return;
        }

        alert('Result: ' + result);
    });
});
