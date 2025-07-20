import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Calculator() {
    const { t } = useTranslation();
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    const handleButtonClick = (value) => {
        if (value === 'C') {
            setInput('');
            setResult('');
        } else if (value === '=') {
            if (!input.trim()) {
                setResult('Empty');
                return;
            }
            // Prevent expressions ending with an operator
            const lastChar = input.slice(-1);
            if (['+', '-', '*', '/'].includes(lastChar)) {
                setResult('Invalid expression');
                return;
            }
            try {
                const finalResult = Function('return ' + input)();
                setResult(finalResult.toString());
            } catch (error) {
                setResult('Error');
            }
        } else {
            const lastChar = input.slice(-1);
            const isOperator = ['+', '-', '*', '/'].includes(value);
            const lastCharIsOperator = ['+', '-', '*', '/'].includes(lastChar);

            // Prevent consecutive operators
            if (isOperator && lastCharIsOperator) {
                // Replace the last operator with the new one
                setInput(input.slice(0, -1) + value);
                return;
            }
            // Prevent starting with an operator (except for negative numbers)
            if (input === '' && isOperator && value !== '-') {
                return;
            }
            // Prevent multiple decimal points in a number
            if (value === '.') {
                const parts = input.split(/[\+\-\*\/]/);
                const lastPart = parts[parts.length - 1];
                if (lastPart.includes('.')) {
                    return;
                }
            }

            setInput(prevInput => prevInput + value);
        }
    };

    const buttons = [
        'C', '/', '*', '-',
        '7', '8', '9', '+',
        '4', '5', '6', '.',
        '1', '2', '3', '=',
        '0'
    ];

    return (
        <div className="card fade-in" style={{ maxWidth: '300px', margin: 'auto' }}>
            <div className="card-body">
                <h5 className="card-title text-center mb-3">{t('calculator')}</h5>
                <div className="mb-3">
                    <input type="text" className="form-control text-end fs-4" value={input} readOnly style={{ height: '50px' }} />
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control text-end fs-4" value={result} readOnly style={{ height: '50px' }} />
                </div>
                <div className="d-grid gap-2">
                    <div className="row row-cols-4 g-2">
                        {buttons.map((button, index) => (
                            <div className="col" key={index}>
                                <button
                                    className={`btn btn-lg w-100 ${button === '=' ? 'btn-primary' : button === 'C' ? 'btn-danger' : 'btn-secondary'}`}
                                    onClick={() => handleButtonClick(button)}
                                    style={{ height: '60px' }}
                                >
                                    {button}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calculator;