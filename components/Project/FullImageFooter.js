import React from 'react';
import styled from 'styled-components';
import { transparentize } from 'polished';

const Caption = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    background: ${props => transparentize(.3, props.theme.accent2)}};
    color: white;
    --padding: 20px;
    padding: var(--padding);
    width: calc(100% - var(--padding) * 2);
`;

const FullImageFooter = props => {
    const { currentView } = props;
    
    return <Caption>
        <h2>{currentView.title}</h2>
        {currentView.description &&
            <p>{currentView.description}</p>
        }
    </Caption>;
}

export default FullImageFooter;