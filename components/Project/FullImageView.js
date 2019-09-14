import React from 'react';
import styled from 'styled-components';

const ViewContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const FullImageContainer = styled.div`
    position: relative;
`;

const FullImage = styled.img`
    max-width: 80vw;
    max-height: 80vh;
    display: block;
`;

const Spacer = styled.div`
    height: 150px;
    width: 100%;
`;

const FullImageView = props => {
    const { currentView } = props;

    return <ViewContainer
        onClick={props.modalProps.onClose}
    >
        <FullImageContainer onClick={props.toggleModal}>
            <FullImage
                src={currentView.source}
                alt={currentView.description}
                onClick={e => e.stopPropagation()}
            />
            <Spacer/>
        </FullImageContainer>
    </ViewContainer>;
}

export default FullImageView;