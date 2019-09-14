import React from 'react';
import styled, { withTheme } from 'styled-components';
import { Content } from './common/Layout';

import SectionHeader from './SectionHeader';
import Experience from './Experience';


const Container = styled.div`

`;

const Experiences = props => <Container>
    <Content>
        <SectionHeader title='WORK'></SectionHeader>
    </Content>
    {props.experiences.map(experience => <Experience {...experience} key={experience.name} />)}
</Container>;

export default withTheme(Experiences);