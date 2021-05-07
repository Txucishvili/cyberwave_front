import React from 'react';

// !!
export const withLazy = (path: string) => {
    return React.lazy(() => import(path))
}