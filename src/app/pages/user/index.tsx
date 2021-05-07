import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../store/context/ThemeContext';
// import {partition, defaults} from 'lodash';

// console.log('a', partition([1, 2, 3, 4], n => n % 2));
// console.log('b', defaults({ 'a': 1 }, { 'a': 3, 'b': 2 }));
// console.log('lodash', _);

const UserPage = (props: any, data?: any) => {
    const [loading, setLoad] = useState(true);
    const [theme, setTheme]: any= useContext(ThemeContext);

    return (<React.Fragment>
        <h2><b>Users Page 1</b></h2>
    </React.Fragment>)
}

export default UserPage;
