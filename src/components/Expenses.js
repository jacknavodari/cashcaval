import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function Expenses({ currency }) {
    const { t } = useTranslation();
    const [expenses, setExpenses] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [jobNumber, setJobNumber] = useState(''); // New state for job number
    const [editingIndex, setEditingIndex] = useState(null);
    const [editDescription, setEditDescription] = useState('');
    const [editAmount, setEditAmount] = useState('');
    const [editJobNumber, setEditJobNumber] = useState(''); // New state for editing job number

    useEffect(() => {
        window.api.loadData().then(data => {
            if (data && data.expenses) {
                setExpenses(data.expenses);
            }
        });
    }, []);

    const saveData = (updatedExpenses) => {
        window.api.loadData().then(data => {
            const newData = { ...data, expenses: updatedExpenses };
            window.api.saveData(newData);
        });
    };

    const handleAddExpense = async () => {
        const newExpense = { description, amount: parseFloat(amount), job_number: jobNumber };
        const newExpenses = [...expenses, newExpense];
        setExpenses(newExpenses);
        saveData(newExpenses);
        setDescription('');
        setAmount('');
        setJobNumber('');
        new Audio(await window.api.getSoundPath('money_add.mp3')).play();
    };

    const handleEditClick = (index) => {
        setEditingIndex(index);
        setEditDescription(expenses[index].description);
        setEditAmount(expenses[index].amount);
        setEditJobNumber(expenses[index].job_number);
    };

    const handleSaveEdit = () => {
        const updatedExpenses = expenses.map((expense, index) =>
            index === editingIndex ? { description: editDescription, amount: parseFloat(editAmount), job_number: editJobNumber } : expense
        );
        setExpenses(updatedExpenses);
        saveData(updatedExpenses);
        setEditingIndex(null);
        setEditDescription('');
        setEditAmount('');
        setEditJobNumber('');
    };

    const handleDeleteExpense = async (index) => {
        const updatedExpenses = expenses.filter((_, i) => i !== index);
        setExpenses(updatedExpenses);
        saveData(updatedExpenses);
        new Audio(await window.api.getSoundPath('money_remove.mp3')).play();
    };

    const formatCurrency = (value) => {
        return `${currency} ${value.toFixed(2)}`;
    };

    return (
        <div>
            <h1>{t('expenses')}</h1>
            <div className="card fade-in">
                <div className="card-body">
                    <h5 className="card-title">{t('addExpense')}</h5>
                    <div className="form-group">
                        <label>{t('description')}</label>
                        <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>{t('amount')}</label>
                        <input type="number" className="form-control" value={amount} onChange={e => setAmount(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>{t('jobNumber')}</label>
                        <input type="text" className="form-control" value={jobNumber} onChange={e => setJobNumber(e.target.value)} />
                    </div>
                    <button className="btn btn-primary mt-2" onClick={handleAddExpense}>{t('addExpense')}</button>
                </div>
            </div>

            <div className="card mt-4 fade-in">
                <div className="card-body">
                    <h5 className="card-title">{t('expenseList')}</h5>
                    <ul className="list-group">
                        {expenses.map((expense, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center slide-in-left">
                                {editingIndex === index ? (
                                    <div className="flex-grow-1">
                                        <input type="text" className="form-control mb-1" value={editDescription} onChange={e => setEditDescription(e.target.value)} />
                                        <input type="number" className="form-control mb-1" value={editAmount} onChange={e => setEditAmount(e.target.value)} />
                                        <input type="text" className="form-control" value={editJobNumber} onChange={e => setEditJobNumber(e.target.value)} />
                                    </div>
                                ) : (
                                    <span>{expense.description}: {formatCurrency(expense.amount)} - Job: {expense.job_number}</span>
                                )}
                                <div>
                                    {editingIndex === index ? (
                                        <button className="btn btn-success btn-sm me-2" onClick={handleSaveEdit}>{t('save')}</button>
                                    ) : (
                                        <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditClick(index)}>{t('edit')}</button>
                                    )}
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteExpense(index)}>{t('delete')}</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Expenses;