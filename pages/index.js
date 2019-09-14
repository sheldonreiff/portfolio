import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';

import theme from '../components/theme.js';
import '../styles.css';

import Experiences from '../components/Experiences';
import About from '../components/About';
import Contact from '../components/Contact';
import { Content } from '../components/common/Layout';

const SplashContainer = styled.div`
	min-height: 100vh;
	position: relative;
`;

const Splash = styled.div`
	min-height: calc(100vh - 65px);
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
	padding-bottom: 75px;

	background: url(./static/images/code_pattern.svg);
`;

const Greeting = styled.span`
	font-family: Lexend Deca;
	color: ${props => props.theme.mainLight};
	font-size: 17vw;
	padding: 30px;
	align-self: flex-start;
	margin-left: 20px;
	background: white;

	@media (min-width: 600px) {
    	padding: 40px;
		font-size: 6rem;
	}

	position: relative;
	border: solid 7px ${props => props.theme.mainLight};
  	border-radius: .4em;

	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		width: 0;
		height: 0;
		border: 35px solid transparent;
		border-top-color: ${props => props.theme.mainLight};
		border-bottom: 0;
		border-right: 0;
		margin-left: -17.5px;
		margin-bottom: -35px;
	}
`;

const NameContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	flex-direction: column;
	max-width: 1000px;
	margin-top: -40px;
	width: 100%;
`;

const PreName = styled.span`
	font-size: .5em;
	color: ${props => props.theme.mainLight};
`;

const Name = styled.div`
	color: ${props => props.theme.mainDark};
	font-family: Lexend Deca;
  font-size: 17vw;
	margin-right: 20px;

	@media (min-width: 600px) {
		font-size: 6rem;
	}

	@media (min-width: 750px) {
		font-size: 7rem;
		margin-right: 20%;
	}
			
	margin-top: 20px;
	flex-grow: 1;
	position: relative;
	line-height: .8;
	align-self: flex-end;
`;

const Title = styled.h1`
	font-family: Lexend Deca;
	color: white;
	background: ${props => props.theme.accent2};
	display: block;
	margin: 50px;
	margin-left: 7.5%;
	font-size: 7vw;
	padding: 25px;
	max-width: 750px;
	position: relative;
	align-self: flex-end;
	max-width: 510px;

	@media (min-width: 650px) {
		font-size: 3rem;
	}
`;

const TitleShadow = styled.div`
	width: 100%;
	height: 100%;
	border: solid 5px ${props => props.theme.accent2};
	top: 10px;
	right: 10px;
	position: absolute;

	@media (min-width: 500px) {
		top: 20px;
		right: 20px;
	}
`;

const DownArrowContainer = styled(Content)`
	width: 90%;
`;

const DownArrowArrangment = styled.span`
	color: ${props => props.theme.accent2};
	font-size: 3rem;
	position: relative;
	margin: auto;
`;

const DownArrow1 = styled.span`
	position: absolute;
	bottom: -50px;
	left: 0;
	
`;

const DownArrow2 = styled.span`
	position: absolute;
	bottom: -30px;
	left: 0;
`;

const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const SectionDivider = styled.div`
	height: 75px;
`;


function App({ data }) {
	return <ThemeProvider theme={theme}>
		<React.Fragment>
			<SplashContainer>
				<Splash>
					<NameContainer>
						<Greeting>Hi!</Greeting>
						<Name>
							<PreName>I&apos;M</PreName>
							<br/>SHELDON<br/>REIFF
						</Name>
					</NameContainer>
					
					<Title>I solve problems with great software <TitleShadow /></Title>

					<DownArrowContainer>
						<DownArrowArrangment>
							<DownArrow1 className='icon-chevron-down' />
							<DownArrow2 className='icon-chevron-down' />
						</DownArrowArrangment>
					</DownArrowContainer>
				</Splash>
			</SplashContainer>
		
			<ContentContainer>
				<About data={data.about} />
				<SectionDivider/>
				<Experiences data={data.experiences}/>
				<SectionDivider/>
				<Contact />
			</ContentContainer>
		</React.Fragment>
	</ThemeProvider>;
}

App.propTypes = {
	data: PropTypes.object,
}

App.getInitialProps = async () => {
	const res = await fetch(process.env.DATA_URL);
	const data = await res.json();
	return { data };
};

export default App;
