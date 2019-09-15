import React from 'react';
import styled, { withTheme } from 'styled-components';
import { Formik, Form } from 'formik';
import { object, string } from 'yup';
import { Input, Button, Error, Message } from './common/Form';
import axios from 'axios';
import { Content } from './common/Layout';
import theme from './theme.js';

import SectionHeader from './SectionHeader';

const Container = styled.div`
    background: ${props => props.theme.black};
    color: ${props => props.theme.gray};
    padding: 75px 0 75px 0;
    overflow: hidden;
`;

const Main = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: -20px;

    @media (max-width: 750px) {
        flex-direction: column;
    }
`;

const IconsContainer = styled.div`
    margin: 25px 10px;
`;

const IconLink = styled.a`
    margin: 10px;
    text-decoration: none;
`;

const Icon = styled.span`
    font-size: 4rem;
    color: white;

    &:hover{
        color: ${props => props.theme.accent2};
    }
`;

const StyledForm = styled(Form)`
    max-width: 800px;
    flex-grow: 2;
    margin: 20px;
    flex-shrink: 1;
    flex-basis: 0;

    @media (max-width: 750px) {
        order: 2;
    }
`;

const InputContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    margin: 15px auto;
`;

const InputGroup = styled.div`
    display: flex;
    align-content: center;
    flex-wrap: wrap;
    margin: -10px;
    & > * {
        margin: 10px;
    }
`;

const StyledInput = styled(Input)`
    background: ${props => props.theme.black};
`;

const StyledButton = styled(Button)`
    margin: 25px 10px 0;
    align-self: flex-start;
`;

const StyledMessage = styled(Message)`
    margin: 25px 10px;
    align-self: flex-start;
    flex-grow: 1;
    flex-basis: 0;
`;


const yupSchema = object().shape({
    name: string()
        .min(2)
        .max(100)
        .required(),
    email: string()
        .email()
        .required(),
    subject: string()
        .min(4)
        .max(500)
        .required(),
    message: string()
        .min(10)
        .max(5000)
        .required(),
  });

class Contact extends React.Component{
    constructor(){
        super();

        this.state = {
            sending: false,
            error: null,
            submittedOnce: false,
        }
    }

    sendMessage = (values, { setSubmitting, setStatus, resetForm }) => {
        setStatus(null);
        this.setState({ submittedOnce: true });
        axios.post(`${process.env.API_URL}/contact`, values)
            .then(() => {
                resetForm();
                setStatus('SUCCESS');
            }).catch(() => {
                setStatus('ERROR');
                setSubmitting(false);
            });
    }

    render(){
        return <Container>
            <Content>
                <SectionHeader
                    title='CONTACT'
                    color='white'
                    underLineColor={theme.accent2}
                />

                <Main>
                    <Formik
                        initialStatus={null}
                        initialValues={{ name: '', email: '', subject: '', message: '' }}
                        validationSchema={yupSchema}
                        onSubmit={this.sendMessage}
                    >
                        {({ isSubmitting, status, errors, touched }) => {
                            const statusMessage = status === 'SUCCESS'
                            ? 'Thanks for reaching out!'
                            : (status === 'ERROR'
                                ? 'Oops, there was an error! If this persists, please reach me on LinkedIn instead!'
                                : null
                            );
                            return <StyledForm>
                                <InputGroup>
                                    <InputContainer>
                                        <label htmlFor='name'>Name</label>
                                        <StyledInput
                                            id='name'
                                            type="text"
                                            name="name"
                                            placeholder='Your name' 
                                        />
                                        <Error
                                            errors={errors}
                                            touched={touched}
                                            name='name'
                                        />
                                    </InputContainer>
                                    <InputContainer>
                                        <label htmlFor='email'>Email</label>
                                        <StyledInput
                                            id='email'
                                            type="email"
                                            name="email"
                                            placeholder='Your email'
                                        />
                                        <Error
                                            errors={errors}
                                            touched={touched}
                                            name='email'
                                        />
                                    </InputContainer>
                                </InputGroup>

                                <InputContainer>
                                    <label htmlFor='subject'>Subject</label>
                                    <StyledInput
                                        id='subject'
                                        type="text"
                                        name="subject"
                                        placeholder='Subject of your message'
                                    />
                                    <Error
                                        errors={errors}
                                        touched={touched}
                                        name='subject'
                                    />
                                </InputContainer>

                                <InputContainer>
                                    <label htmlFor='message'>Message</label>
                                    <StyledInput
                                        id='message'
                                        name="message"
                                        placeholder='Your message'
                                        component='textarea'
                                        rows={5}
                                    />
                                    <Error
                                        errors={errors}
                                        touched={touched}
                                        name='message'
                                    />
                                </InputContainer>
                                
                                <InputGroup>
                                    <StyledButton type="submit" loading={isSubmitting}>
                                        {isSubmitting ? 'Sending' : 'Send'}
                                    </StyledButton>

                                    <StyledMessage
                                        success={status === 'SUCCESS'}
                                        pose={status ? 'visible' : 'hidden'}
                                    >
                                        {statusMessage}
                                    </StyledMessage>
                                </InputGroup>
                            </StyledForm>
                        }}
                    </Formik>

                    <IconsContainer>
                        <IconLink href='https://github.com/sheldonreiff' target='_blank'>
                            <Icon className='icon-github'/>
                        </IconLink>
                        <IconLink href='https://www.linkedin.com/in/sheldon-reiff' target='_blank'>
                            <Icon className='icon-linkedin'/>
                        </IconLink>
                    </IconsContainer>

                </Main>
            </Content>
        </Container>
    }
}

export default withTheme(Contact);