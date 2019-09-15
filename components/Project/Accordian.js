import React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import PropTypes from 'prop-types';
import { transparentize } from 'polished';

const AccordianContainer = styled.div`
    max-width: 600px;
`;

const AccordianOuter = styled.span`
    padding: 10px;
    border: solid 5px ${props => props.theme.mainDark};
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    margin: -2.5px 0;
`;

const BaseAccordianInner = posed.div({
    closed: { height: 0 },
    open: { height: 'auto' },
});

const AccordianInner = styled(BaseAccordianInner)`
    overflow: hidden;
    border: solid 5px ${props => transparentize(.4, props.theme.mainDark)};
`;

const AccordianImage = styled.img`
    max-width: 100%;
    cursor: zoom-in;
`;

const ZoomedImage = styled.img`
    cursor: zoom-out;
    max-width: 100vw;
    max-height: 90vh;
    display: block;
`;

const BaseFullScreenImageContainer = posed.div({
    hidden: { scale: 0 },
    visible: { scale: 1 },
});

const FullScreenImageContainer = styled(BaseFullScreenImageContainer)`
    height: 100vh;
    max-width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background: ${props => transparentize(.3, props.theme.black)};
    overflow: hidden;
    display: flex;
    align-items: center;
    z-index: 100;
    justify-content: center;
    width: 100%;
`;

const DropdownIndicatorBase = posed.span({
    'closed': { rotate: 0 },
    'open': { rotate: 180 },
})

const DropdownIndicator = styled(DropdownIndicatorBase)`
    display: flex;
    align-items: center;
`;

const FullScreenImage = props => <FullScreenImageContainer pose={props.show ? 'visible' : 'hidden'} onClick={props.handleClose} style={{ transform: 'scale(0)' }} >
    <ZoomedImage
        src={`${process.env.CONTENT_URL}/${props.source}`}
        alt={`Screenshot of ${props.title}`}
    />
</FullScreenImageContainer>;

FullScreenImage.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    source: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}

class AccordianFold extends React.Component{
    state = {
        open: false,
        fullscreen: false,
    }

    toggle = () => {
        this.setState({ open: !this.state.open });
    }

    toggleFullscreen = () => {
        this.setState({ fullscreen: !this.state.fullscreen });
    }

    render(){
        const { title, description, source } = this.props.image;
        const pose = this.state.open
            ? 'open'
            : 'closed';
        return <React.Fragment>
            <AccordianOuter onClick={this.toggle}>
                <div>
                    <span className='icon-image' style={{marginRight: '10px'}}/>
                    {title}
                </div>
                <DropdownIndicator className='icon-chevron-down' pose={pose} />
            </AccordianOuter>
            <AccordianInner pose={pose}>
                <p style={{ margin: '10px' }}>{description}</p>
                <AccordianImage
                    src={`${process.env.CONTENT_URL}/${source}`}
                    onClick={this.toggleFullscreen}
                    style={{ transform: this.state.open ? '' : 'scale(0)' }}
                    alt={`Screenshot of ${title}`}
                />
            </AccordianInner>
            <FullScreenImage
                show={this.state.fullscreen}
                handleClose={this.toggleFullscreen}
                source={source}
                title={title}
            />
        </React.Fragment>
    }
}

AccordianFold.propTypes = {
    image: PropTypes.object.isRequired,
}

const Accordian = props => <AccordianContainer>
    {props.images.map(image => <AccordianFold key={image.source} image={image} />)}
</AccordianContainer>;

Accordian.propTypes = {
    images: PropTypes.array.isRequired,
}

export default Accordian;