import React from 'react';
import { Navbase } from './navbase';
import { Navlogohome } from './navlogohome';
import { NavProjectIntegration } from './navprojectintegration';

export const MarketNavbar = () => {
    return (
            <Navbase navleft={ <Navlogohome /> }/>
        )
}

export const CreateNavBar = ({title}) => {
    return (
        <Navbase navleft={<NavProjectIntegration title={title}/>}/>
    )
}

