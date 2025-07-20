import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function TaxSummary() {
    const { t } = useTranslation();
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [netProfit, setNetProfit] = useState(0);
    const [taxLiability, setTaxLiability] = useState(0);

    useEffect(() => {
        window.api.loadData().then(data => {
            if (data) {
                const revenueSum = data.revenues ? data.revenues.reduce((sum, item) => sum + item.amount, 0) : 0;
                const expenseSum = data.expenses ? data.expenses.reduce((sum, item) => sum + item.amount, 0) : 0;

                const calculatedNetProfit = revenueSum - expenseSum;

                // Calculate tax liability based on individual tax rates
                const revenueTax = data.revenues ? data.revenues.reduce((sum, item) => sum + (item.amount * item.taxRate), 0) : 0;
                const expenseTax = data.expenses ? data.expenses.reduce((sum, item) => sum + (item.amount * item.taxRate), 0) : 0;
                const calculatedTaxLiability = revenueTax - expenseTax;

                setTotalRevenue(revenueSum);
                setTotalExpenses(expenseSum);
                setNetProfit(calculatedNetProfit);
                setTaxLiability(calculatedTaxLiability);
            }
        });
    }, []);

    return (
        <div>
            <h1>{t('taxSummary')}</h1>
            <div className="card mb-3">
                <div className="card-header">{t('summaryForCurrentPeriod')}</div>
                <div className="card-body">
                    <p className="card-text"><strong>{t('totalRevenue')}:</strong> ${totalRevenue.toFixed(2)}</p>
                    <p className="card-text"><strong>{t('totalExpenses')}:</strong> ${totalExpenses.toFixed(2)}</p>
                    <p className="card-text"><strong>{t('netProfit')}:</strong> ${netProfit.toFixed(2)}</p>
                    <p className="card-text"><strong>{t('estimatedTaxLiability')}:</strong> ${taxLiability.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
}

export default TaxSummary;