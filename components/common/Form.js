import React from 'react';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import BarLoader from 'react-spinners/BarLoader';
import theme from '../theme.js';
import posed from 'react-pose';
import { transparentize } from 'polished';

const LoaderButton = props => <button
        {...props}
    >   
        <span style={{marginBottom: '5px'}}>{props.children}</span>
        <BarLoader 
            height={5}
            width={80}
            color={theme.black}
            loading={props.loading}
        />
    </button>;

export const Button = styled(LoaderButton)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: solid 3px white;
    padding: 10px 10px;
    font-size: 1.2em;
    cursor: pointer;
    outline: none;
    transition: background .1s, color .1s, height .1s, width .1s;
    color: ${props => props.loading ? props.theme.black : 'white'};
    background: ${props => props.loading ? 'white' : 'none'};

    &:hover{
        background: white;
        color: ${props => props.theme.black};
    }
`;

export const Input = styled(Field)`
    padding: 5px 0;
    margin: 0;
    border: none;
    border-bottom: solid 5px lightgray;
    font-size: 1em;
    border-radius: unset;
    color: white;

    &::placeholder{
        color: ${props => transparentize(.5,props.theme.gray)};
    }

    &:focus{
        outline: none;
        border-bottom: solid 5px ${props => props.theme.accent2}; 
    }
`;

const BaseErrorMessageElement = posed.span({
    'hidden': { height: 0, opacity: 0, y: -20 },
    'visible': { height: 'auto', opacity: 1, y: 0 }, 
});

const BaseErrorMessage = styled(BaseErrorMessageElement)`
    color: ${props => props.theme.accent3};
`;

export const Error = props => {
    const error = props.touched[props.name] && props.errors[props.name]
        ? props.errors[props.name]
        : null;
    return <BaseErrorMessage
        pose={error ? 'visible' : 'hidden'}
    >{error ? error : <span style={{visibility: 'hidden'}}>placeholder</span> }</BaseErrorMessage>;
}

const BaseMessage = posed.span({
    'hidden': { opacity: 0, x: -20 },
    'visible': { opacity: 1, x: 0 },
});

export const Message = styled(BaseMessage)`
    padding: 15px;
    display: flex;
    align-items: center;
    background: ${props => props.success ? props.theme.accent2 : props.theme.accent3};
    color: white;
`;