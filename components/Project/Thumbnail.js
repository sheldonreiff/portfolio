import React from 'react';
import styled from 'styled-components';
import { transparentize } from 'polished';

export const ImagesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;

    margin: -20px;
    & > div {
        margin: 20px;
    }
`;

const ImageElement = styled.img`
    cursor: pointer;
    max-height: 200px;
    max-width: 100%;
    display: block;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
`;

const ImageContainer = styled.div`
    position: relative;
`;

const ImageOutline = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 15px;
    left: 15px;
    z-index: -1;
    background: ${props => transparentize(.5, props.theme.accent2)};
`;

const ImageTitle = styled.span`
    position: relative;
    text-align: right;
    color: ${props => props.theme.mainDark};
    border-right: solid 3px ${props => props.theme.mainDark};
    margin: 25px -15px 0 0;
    padding: 0 10px 10px;

    &::before{
        content: '';
        width: 50px;
        border-bottom: solid 3px ${props => props.theme.mainDark};
        position: absolute;
        bottom: 0;
        right: 0;
    }
`;

const Image = props => <Container>
    <ImageContainer>
        <ImageOutline />
        <ImageElement
            src={props.src}
            onClick={props.onClick}
        />
        {/* <ThumbnailTitle onClick={e => e.stopPropagation()}>{props.title}</ThumbnailTitle> */}
    </ImageContainer>
    <ImageTitle>{props.title}</ImageTitle>
</Container>;

export default Image;