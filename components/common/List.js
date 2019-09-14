import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
    min-width: 250px;
    list-style: none;
    padding: 0;
`;

const Bullet = styled.span`
    margin-right: 10px;
    font-size: .7em;
`;

export const ListItem = props => <li>
    <Bullet className='icon-circle' />
    <span>{props.children}</span>
</li>;

export default List;