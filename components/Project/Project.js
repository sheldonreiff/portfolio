import React from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { transparentize } from 'polished';
import posed from 'react-pose';


import List, { ListItem } from '../common/List';
import Accordian from './Accordian';

const ProjectContainer = styled.div`
    border-left: solid 5px ${props => transparentize(.7, props.theme.mainDark)};
    padding-left: 30px;
`;

const MainContainer = styled.div`
    flex-basis: 0;
    flex-grow: 1;
`;

const PrivateBadge = styled.span`
    color: ${props => props.theme.black};
    padding: 5px 0;
    font-size: .8rem;
    display: flex;
    align-items: center;
    cursor: help;
    border-bottom: dotted 1px ${props => props.theme.black};
`;

const SourceContainer = styled.div`
    display: flex;
    align-items: flex-start;
    margin: -10px;
    & > * {
        margin: 10px;
    }
    position: relative;
`;

const ProjectLinksContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const ContentContainer = styled.div`
    margin: -10px -20px;
    & > * {
        margin: 10px 20px;
    }
    display: flex;
    flex-wrap: wrap;
`;

const ProjectLinkContainer = styled.div`
    display: flex;
    margin: 10px;
`;

const ProjectLink = styled.a`
    overflow-wrap: break-word;
    hyphens: auto;
    color: ${props => props.theme.mainDark};
`;

const ProjectLinks = props => <ProjectLinksContainer>
    {props.viewLink &&
        <ProjectLinkContainer>
            <LinkIcon className='icon-link'/>
            <ProjectLink href={`https://${props.viewLink}`} target='_blank'>{props.viewLink}</ProjectLink>
        </ProjectLinkContainer>
    }
    <ProjectLinkContainer>
        <LinkIcon className='icon-code'/>
        <ProjectLink href={`https://${props.sourceLink}`} target='_blank'>{props.sourceLink}</ProjectLink>
    </ProjectLinkContainer>
</ProjectLinksContainer>;

ProjectLinks.propTypes = {
    sourceLink: PropTypes.string,
    viewLink: PropTypes.string,
}

const LinkIcon = styled.span`
    margin-right: 10px;
    color: ${props => props.theme.mainDark};
`;

const BasePopover = posed.span({
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
});

export const Popover = styled(BasePopover)`
    font-size: .7rem;
    display: flex;
    align-items: center;
    background: ${props => props.theme.mainDark};
    color: white;
    overflow: hidden;
    position: absolute;
    margin-left: 100px;
`;

const PopoverInner = styled.span`
    padding: 10px;
`;

export const ImagesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;

    margin: -20px;
    & > div {
        margin: 20px;
    }
`;

class Project extends React.Component{

    static propTypes = {
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        viewLink: PropTypes.string,
        sourceLink: PropTypes.string,
        images: PropTypes.array,
        bullets: PropTypes.array,
    }

    state = { 
        modalIsOpen: false,
        index: 0,
        privateBadgeHover: false,
    }

    togglePrivateBadge = (show=null) => {
        this.setState({ privateBadgeHover: show === null
            ? !this.state.privateBadgeHover
            : show
        });
    }

    toggleModal = index => {
        this.setState(state => ({ 
            modalIsOpen: !state.modalIsOpen,
            index,
        }));
    }

    render(){
        const { name, description, viewLink, sourceLink, images, bullets } = this.props;

        const { privateBadgeHover } = this.state;

        return <ProjectContainer>
            <h2>{name}</h2>
            <ContentContainer>
                <MainContainer>
                    <SourceContainer>
                        {sourceLink ?
                            <ProjectLinks
                                viewLink={viewLink}
                                sourceLink={sourceLink}
                            />
                            : <PrivateBadge
                                onMouseEnter={() => this.togglePrivateBadge(true)}
                                onMouseLeave={() => this.togglePrivateBadge(false)}
                                onClick={() => this.togglePrivateBadge()}
                            >Proprietary</PrivateBadge>
                        }

                        {!sourceLink &&
                            <Popover
                                pose={privateBadgeHover ? 'visible' : 'hidden'}
                                onClick={this.togglePrivateBadge}
                            >
                                <PopoverInner>
                                    This is an internal application so I can&apos;t share a live example, but I may be able to provide a code sample
                                </PopoverInner>
                            </Popover>
                        }
                    </SourceContainer>
                    <p>{description}</p>

                    {bullets &&
                        <List>
                            {bullets.map(item => <ListItem key={item}>{item}</ListItem>)}
                        </List>
                    }
                </MainContainer>
                

            {images &&
                <ImagesContainer>
                    <Accordian
                        images={images}
                    />  
                </ImagesContainer>
            }
            </ContentContainer>
        </ProjectContainer>;
    }
}

export default withTheme(Project);
