import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function Dashboard({ currency }) {
    const { t } = useTranslation();
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [jobProfits, setJobProfits] = useState({});

    // State for the tax calculator
    const [calculatorAmount, setCalculatorAmount] = useState('');
    const [calculatorTaxRate, setCalculatorTaxRate] = useState('');
    const [calculatedTax, setCalculatedTax] = useState(0);
    const [calculatedNet, setCalculatedNet] = useState(0);

    useEffect(() => {
        window.api.loadData().then(data => {
            if (data) {
                const revenueSum = data.revenues ? data.revenues.reduce((sum, item) => sum + item.amount, 0) : 0;
                const expenseSum = data.expenses ? data.expenses.reduce((sum, item) => sum + item.amount, 0) : 0;
                setTotalRevenue(revenueSum);
                setTotalExpenses(expenseSum);

                const profits = {};
                data.revenues.forEach(rev => {
                    if (rev.job_number) {
                        profits[rev.job_number] = (profits[rev.job_number] || 0) + rev.amount;
                    }
                });
                data.expenses.forEach(exp => {
                    if (exp.job_number) {
                        profits[exp.job_number] = (profits[exp.job_number] || 0) - exp.amount;
                    }
                });
                setJobProfits(profits);
            }
        });
    }, []);

    useEffect(() => {
        const amount = parseFloat(calculatorAmount);
        const rate = parseFloat(calculatorTaxRate);

        if (!isNaN(amount) && !isNaN(rate)) {
            const tax = amount * (rate / 100);
            setCalculatedTax(tax);
            setCalculatedNet(amount - tax);
        } else {
            setCalculatedTax(0);
            setCalculatedNet(0);
        }
    }, [calculatorAmount, calculatorTaxRate]);

    const formatCurrency = (value) => {
        return `${currency} ${value.toFixed(2)}`;
    };

    return (
        <div>
            <h1>{t('dashboard')}</h1>
            <div className="row">
                <div className="col-md-6 fade-in">
                    <div className="card text-white bg-success mb-3">
                        <div className="card-header">{t('totalRevenue')}</div>
                        <div className="card-body">
                            <h5 className="card-title">{formatCurrency(totalRevenue)}</h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 fade-in">
                    <div className="card text-white bg-danger mb-3">
                        <div className="card-header">{t('totalExpenses')}</div>
                        <div className="card-body">
                            <h5 className="card-title">{formatCurrency(totalExpenses)}</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mt-4 fade-in">
                <div className="card-body">
                    <h5 className="card-title">{t('taxCalculator')}</h5>
                    <div className="form-group">
                        <label>{t('amount')}</label>
                        <input type="number" className="form-control" value={calculatorAmount} onChange={e => setCalculatorAmount(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>{t('taxRate')}</label>
                        <div className="input-group">
                            <input type="number" className="form-control" value={calculatorTaxRate} onChange={e => setCalculatorTaxRate(e.target.value)} min="0" step="0.01" />
                            <span className="input-group-text">%</span>
                        </div>
                    </div>
                    <p className="mt-3"><strong>{t('calculatedTax')}:</strong> {formatCurrency(calculatedTax)}</p>
                    <p><strong>{t('calculatedNet')}:</strong> {formatCurrency(calculatedNet)}</p>
                </div>
            </div>

            <div className="card mt-4 fade-in">
                <div className="card-body">
                    <h5 className="card-title">{t('jobProfits')}</h5>
                    <ul className="list-group">
                        {Object.entries(jobProfits).map(([job, profit]) => (
                            <li key={job} className="list-group-item d-flex justify-content-between align-items-center">
                                <span>{t('jobNumber')}: {job}</span>
                                <span>{t('netProfit')}: {formatCurrency(profit)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;