import React from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';

import { Content } from './common/Layout';
import SectionHeader from './SectionHeader';
import Experience from './Experience';


const Container = styled.div`

`;

const Experiences = props => <Container>
    <Content>
    <SectionHeader title='WORK'></SectionHeader>
    </Content>
    {props.data.map(experience => <Experience {...experience} key={experience.name} />)}
</Container>;

Experiences.propTypes = {
    data: PropTypes.array.isRequired,
}

export default withTheme(Experiences);