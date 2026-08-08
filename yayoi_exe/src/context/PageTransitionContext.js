import React, { createContext, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

const PageTransitionContext = createContext({ isPageReady: true });

export function PageTransitionProvider({ isPageReady, children }) {
    const value = useMemo(() => ({ isPageReady }), [isPageReady]);

    return (
        <PageTransitionContext.Provider value={value}>{children}</PageTransitionContext.Provider>
    );
}

PageTransitionProvider.propTypes = {
    isPageReady: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};

export function usePageTransition() {
    return useContext(PageTransitionContext);
}
