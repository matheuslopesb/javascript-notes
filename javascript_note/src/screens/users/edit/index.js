import React, { Fragment, useState } from 'react';
import UserEditHeader from '../../../components/user_edit/header';
import { Column, Section, Title, Container, Card } from "rbx";
import logoImage from '../../../assets/images/logo.png';
import "../../../styles/auth.scss";
import UserEditForm from '../../../components/user_edit/form';

const UserEditScreen = () => {
    const [headerName, setHeaderName] = useState('');

    return (
        <Fragment>
            <UserEditHeader headerName={headerName}/>
            <Section size="medium" className="auth">
                <Container>
                    <Column.Group centered>
                        <Column className="user-edit-column" size={3}>
                            <Card>
                                <Card.Content>
                                    <Section>
                                        <Column.Group centered>
                                            <Column size={12}>
                                                <img src={logoImage} alt=""/>
                                            </Column>
                                        </Column.Group>
                                        <Column.Group>
                                            <Column size={12}>
                                                <Title size={6} className="has-text-grey has-text-centered">
                                                    Your notes on the cloud
                                                </Title>
                                            </Column>
                                        </Column.Group>
                                        <UserEditForm headerName={headerName} setHeaderName={setHeaderName}/>
                                    </Section>
                                </Card.Content>
                            </Card>
                        </Column>
                    </Column.Group>
                </Container>
            </Section>
        </Fragment>
    )
};

export default UserEditScreen;