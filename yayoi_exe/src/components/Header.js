import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_TABS } from '../routes';

const Header = () => {
    const location = useLocation();

    return (
        <header className="relative flex flex-nowrap items-center justify-start overflow-hidden bg-main py-2 pr-4 pl-7 text-sub1">
            <div className="relative z-[1] shrink-0 text-xl font-bold whitespace-normal text-sub1">
                Yayoi-exe
            </div>
            <nav
                className="absolute left-1/2 flex shrink-0 -translate-x-1/2 flex-nowrap whitespace-nowrap"
                aria-label="Primary"
            >
                {NAV_TABS.map((tab) => {
                    const isActive = tab.path === location.pathname;
                    return (
                        <Link
                            key={tab.path}
                            to={tab.path}
                            className={`mr-4 flex w-[140px] cursor-pointer items-center justify-center overflow-hidden bg-transparent py-2 font-sans text-base text-ellipsis whitespace-nowrap no-underline transition-colors duration-[250ms] last:mr-0 ${
                                isActive
                                    ? 'font-bold text-accent'
                                    : 'font-normal text-sub2 hover:text-accent'
                            }`}
                            draggable="false"
                            aria-current={isActive ? 'page' : undefined}
                        >
                            {isActive ? `<${tab.label}>` : tab.label}
                        </Link>
                    );
                })}
            </nav>
        </header>
    );
};

export default Header;
