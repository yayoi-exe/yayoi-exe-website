import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_TABS } from '../routes';

function useHeaderNav() {
    const { pathname } = useLocation();

    return NAV_TABS.map((tab) => ({
        ...tab,
        isActive: tab.path === pathname,
    }));
}

function navTabLabel({ label, isActive }) {
    return isActive ? `<${label}>` : label;
}

function navTabClassName(isActive) {
    const base =
        'mr-4 flex w-[140px] cursor-pointer items-center justify-center overflow-hidden bg-transparent py-2 font-sans text-base text-ellipsis whitespace-nowrap no-underline transition-colors duration-[250ms] last:mr-0';
    const state = isActive ? 'font-bold text-accent' : 'font-normal text-sub2 hover:text-accent';

    return `${base} ${state}`;
}

const Header = () => {
    const tabs = useHeaderNav();

    return (
        <header className="relative flex flex-nowrap items-center justify-start overflow-hidden bg-main py-2 pr-4 pl-7 text-sub1">
            <div className="relative z-[1] shrink-0 text-xl font-bold whitespace-normal text-sub1">
                Yayoi-exe
            </div>
            <nav
                className="absolute left-1/2 flex shrink-0 -translate-x-1/2 flex-nowrap whitespace-nowrap"
                aria-label="Primary"
            >
                {tabs.map((tab) => (
                    <Link
                        key={tab.path}
                        to={tab.path}
                        className={navTabClassName(tab.isActive)}
                        draggable="false"
                        aria-current={tab.isActive ? 'page' : undefined}
                    >
                        {navTabLabel(tab)}
                    </Link>
                ))}
            </nav>
        </header>
    );
};

export default Header;
