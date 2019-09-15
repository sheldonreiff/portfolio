import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ProjectLinksContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const ProjectLinkContainer = styled.div`
    display: flex;
    margin: 10px;
`;

const ProjectLink = styled.a`
    overflow-wrap: break-word;
    word-break: break-all;
    hyphens: auto;
    color: ${props => props.theme.mainDark};
`;

const LinkIcon = styled.span`
    margin-right: 10px;
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

export default ProjectLinks;