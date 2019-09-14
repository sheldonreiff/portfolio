import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { Content } from './common/Layout';
import { transparentize } from 'polished';

import Project from './Project/Project';
import List, { ListItem } from './common/List';


const Container = styled.div`
    margin-top: 40px;
`;

const Company = styled.h2`
    background: ${props => transparentize(.5, props.theme.gray)};
    color: white;
    padding: 20px 0;
`;

const MainContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: -10px;
    width: 100%;
`;

const TitleContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    margin: 0;
    & > * {
        margin: 10px;
    }
`;

const Description = styled.p`
    color: ${props => props.theme.gray};
    max-width: 600px;
`;

const Experience = props => {

    const { name, description, title, stay, projects, bullets } = props;

    return <Container>
        <Company>
            <Content>
                {name}
            </Content>
        </Company>
        <Content>
            <MainContainer>
                <TitleContainer>
                    {description &&
                        <Description>{description}</Description>
                    }
                </TitleContainer>

                <TitleContainer>
                    {title &&
                        <h5>{title}</h5>
                    }
                    {stay &&
                        <p>{stay}</p>
                    }
                </TitleContainer>
            </MainContainer>

            {bullets &&
                <List>
                    {bullets.map(item => <ListItem key={item}>{item}</ListItem>)}
                </List>
            }
            
            {projects.map(project => <Project
                key={project.name}
                {...project}
            />)}
        </Content>
    </Container>;
}

Experience.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    projects: PropTypes.array.isRequired,
    bullets: PropTypes.array,
}

export default withTheme(Experience);