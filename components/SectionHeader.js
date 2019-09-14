import React from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
    margin: 0 0 40px 0;
`;

const Title = styled.h1`
    color: ${props => props.color || props.theme.mainDark};
    font-size: 3em;
    margin: 0;
`;

const Underline = styled.span`
    display: block;
    background: ${props => props.underLineColor || props.theme.mainDark};
    width: 30px;
    height: 10px;
`;

const SectionHeader = props => <Container>
    <Title {...props}>{props.title}</Title>
    <Underline {...props}/>
</Container>;

SectionHeader.propTypes = {
    title: PropTypes.string.isRequired,
}

export default withTheme(SectionHeader);
