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

function navTabClassName(isActive) {
    // font-weight / 文字列の付け外しをしない（幅とラスタライズが変わってチカチカ見える）
    const base =
        'mr-4 flex w-[140px] cursor-pointer items-center justify-center overflow-hidden bg-transparent py-2 font-sans text-base font-medium text-ellipsis whitespace-nowrap no-underline last:mr-0';
    const state = isActive ? 'text-accent' : 'text-sub2 hover:text-accent';

    return `${base} ${state}`;
}

function NavTabLabel({ label, isActive }) {
    // 括弧は常に同じ幅で置き、非アクティブ時だけ透明にする
    return (
        <>
            <span className={isActive ? 'opacity-100' : 'opacity-0'} aria-hidden="true">
                {'<'}
            </span>
            {label}
            <span className={isActive ? 'opacity-100' : 'opacity-0'} aria-hidden="true">
                {'>'}
            </span>
        </>
    );
}

const Header = () => {
    const tabs = useHeaderNav();

    return (
        <header className="relative isolate flex flex-nowrap items-center justify-start overflow-hidden bg-main py-3 pr-4 pl-7 text-sub1">
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
                        <NavTabLabel label={tab.label} isActive={tab.isActive} />
                    </Link>
                ))}
            </nav>
        </header>
    );
};

export default Header;
