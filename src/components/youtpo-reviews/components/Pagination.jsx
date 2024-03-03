import React from 'react';
import * as Style from './pagination.module.scss';

const Pagination = ({ pages, curentPage, handlePage }) => {

    const [paginationPages, setPaginationPages] = React.useState([]);

    React.useEffect(() => {
        const allPages = [];
        for (let i = 1; i <= pages; i++) {
            allPages.push(i);
        }
        setPaginationPages(allPages.slice(curentPage - 1, curentPage + 5));
    }, [curentPage, pages]);

    const handleNavigation = (page, position) => {
        if (position === 'left' && page > 0) handlePage(page);
        if (position === 'right' && page < pages) handlePage(page);
    }

    return <div className={Style.pagination}>
        <span role="button" tabIndex={0} onClick={() => handleNavigation(curentPage - 1, 'left')} onKeyDown={() => handleNavigation(curentPage - 1, 'left')}>{'<'}</span>
        {paginationPages.length && paginationPages.map((page, index) => {
            return <div role="button" tabIndex={0} onClick={() => handlePage(index + 1)} onKeyDown={() => handlePage(index + 1)} key={index}>{page}</div>
        })}
        <span role="button" tabIndex={0} onClick={() => handleNavigation(curentPage + 1, 'right')} onKeyDown={() => handleNavigation(curentPage + 1, 'right')}>{'>'}</span>
    </div>;
};

export default Pagination;
