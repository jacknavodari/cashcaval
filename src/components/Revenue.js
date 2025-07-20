import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function Revenue({ currency }) {
    const { t } = useTranslation();
    const [revenues, setRevenues] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [jobNumber, setJobNumber] = useState(''); // New state for job number
    const [editingIndex, setEditingIndex] = useState(null);
    const [editDescription, setEditDescription] = useState('');
    const [editAmount, setEditAmount] = useState('');
    const [editJobNumber, setEditJobNumber] = useState(''); // New state for editing job number

    useEffect(() => {
        window.api.loadData().then(data => {
            if (data && data.revenues) {
                setRevenues(data.revenues);
            }
        });
    }, []);

    const saveData = (updatedRevenues) => {
        window.api.loadData().then(data => {
            const newData = { ...data, revenues: updatedRevenues };
            window.api.saveData(newData);
        });
    };

    const handleAddRevenue = () => {
        const newRevenue = { description, amount: parseFloat(amount), job_number: jobNumber };
        const newRevenues = [...revenues, newRevenue];
        setRevenues(newRevenues);
        saveData(newRevenues);
        setDescription('');
        setAmount('');
        setJobNumber('');
        new Audio(window.api.getSoundPath('money_add.mp3')).play();
    };

    const handleEditClick = (index) => {
        setEditingIndex(index);
        setEditDescription(revenues[index].description);
        setEditAmount(revenues[index].amount);
        setEditJobNumber(revenues[index].job_number);
    };

    const handleSaveEdit = () => {
        const updatedRevenues = revenues.map((revenue, index) =>
            index === editingIndex ? { description: editDescription, amount: parseFloat(editAmount), job_number: editJobNumber } : revenue
        );
        setRevenues(updatedRevenues);
        saveData(updatedRevenues);
        setEditingIndex(null);
        setEditDescription('');
        setEditAmount('');
        setEditJobNumber('');
    };

    const handleDeleteRevenue = (index) => {
        const updatedRevenues = revenues.filter((_, i) => i !== index);
        setRevenues(updatedRevenues);
        saveData(updatedRevenues);
        new Audio(window.api.getSoundPath('money_remove.mp3')).play();
    };

    const formatCurrency = (value) => {
        return `${currency} ${value.toFixed(2)}`;
    };

    return (
        <div>
            <h1>{t('revenue')}</h1>
            <div className="card fade-in">
                <div className="card-body">
                    <h5 className="card-title">{t('addRevenue')}</h5>
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
                    <button className="btn btn-primary mt-2" onClick={handleAddRevenue}>{t('addRevenue')}</button>
                </div>
            </div>

            <div className="card mt-4 fade-in">
                <div className="card-body">
                    <h5 className="card-title">{t('revenueList')}</h5>
                    <ul className="list-group">
                        {revenues.map((revenue, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center slide-in-right">
                                {editingIndex === index ? (
                                    <div className="flex-grow-1">
                                        <input type="text" className="form-control mb-1" value={editDescription} onChange={e => setEditDescription(e.target.value)} />
                                        <input type="number" className="form-control mb-1" value={editAmount} onChange={e => setEditAmount(e.target.value)} />
                                        <input type="text" className="form-control" value={editJobNumber} onChange={e => setEditJobNumber(e.target.value)} />
                                    </div>
                                ) : (
                                    <span>{revenue.description}: {formatCurrency(revenue.amount)} - Job: {revenue.job_number}</span>
                                )}
                                <div>
                                    {editingIndex === index ? (
                                        <button className="btn btn-success btn-sm me-2" onClick={handleSaveEdit}>{t('save')}</button>
                                    ) : (
                                        <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditClick(index)}>{t('edit')}</button>
                                    )}
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteRevenue(index)}>{t('delete')}</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Revenue;