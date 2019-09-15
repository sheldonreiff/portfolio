import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const List = styled.ul`
    min-width: 250px;
    list-style: none;
    padding: 0;
`;

const BaseListItem = styled.li`
    display: flex;
    align-items: center;
    margin: 5px 0;
`;

const Bullet = styled.span`
    margin-right: 10px;
    font-size: .7em;
`;

export const ListItem = props => <BaseListItem>
    <Bullet className='icon-circle' />
    <span>{props.children}</span>
</BaseListItem>;

ListItem.propTypes = {
    children: PropTypes.node.isRequired,
}

export default List;