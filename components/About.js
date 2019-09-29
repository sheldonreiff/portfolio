import React from 'react';
import styled, { withTheme } from 'styled-components';
import theme from './theme.js';
import { Content } from './common/Layout';
import PropTypes from 'prop-types';

import SectionHeader from './SectionHeader';
import Skill from './Skill';

const Container = styled.div`
    background: ${props => props.theme.black};
    color: ${props => props.theme.gray};
    padding: 75px 0 75px 0;
`;

const SkillsContainer = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    font-size: .95em;
    margin: 20px -5px 0;
    & > *{
        margin: 5px;
    }
`;

const About = props => <Container>
    <Content>
        <SectionHeader
            title='ABOUT'
            color='white'
            underLineColor={theme.accent2}
        />
        
        {props.data.bio.map((paragraph, index) => <p key={`bio${index}`}>{paragraph}</p>)}

        <h3>Technologies I currently work with the most</h3>

        <SkillsContainer>
            {props.data.tech.map(skill => <Skill key={skill}>{skill}</Skill>)}
        </SkillsContainer>
    </Content>
</Container>;

About.propTypes = {
    data: PropTypes.shape({
        bio: PropTypes.array.isRequired,
        tech: PropTypes.array.isRequired,
    }),
};

export default withTheme(About);