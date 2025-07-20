import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Navbar({ setCurrency, currentCurrency }) {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const handleCurrencyChange = (currency) => {
        setCurrency(currency);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">CashCaval 💰</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">{t('dashboard')}</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/expenses">{t('expenses')}</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/revenue">{t('revenue')}</Link>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownLanguage" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Language
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownLanguage">
                            <li><a className="dropdown-item" href="#" onClick={() => changeLanguage('en')}>English</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => changeLanguage('ro')}>Română</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => changeLanguage('es')}>Español</a></li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownCurrency" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Currency: {currentCurrency}
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownCurrency">
                            <li><a className="dropdown-item" href="#" onClick={() => handleCurrencyChange('EUR')}>EUR</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => handleCurrencyChange('USD')}>USD</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => handleCurrencyChange('RON')}>RON</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;