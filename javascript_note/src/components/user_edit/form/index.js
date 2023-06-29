import React, { Fragment, useState } from 'react';
import { Title, Field, Control, Input, Column, Help, Label } from "rbx";
import { useNavigate } from "react-router-dom";
import UsersService from '../../../services/users';
import PasswordForm from './password_form';
import DeleteForm from './delete_form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import '../../../styles/users.scss';

function UserEditForm(props) {
    let user;
    
    const [id, setId] = useState('');

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    
    const [nameIcon, setNameIcon] = useState(faPen);
    const [emailIcon, setEmailIcon] = useState(faPen);

    const [timer, setTimer] = useState(true);

    const [success, setSuccess] = useState(false);
    const [successName, setSuccessName] = useState('');
    const [error, setError] = useState(false);

    const [redirectToNotes, setRedirectToNotes] = useState(false); 
    const [redirectToHome, setRedirectToHome] = useState(false); 
    const navigate = useNavigate();

    const [deleteAccountField, setDeleteAccountField] = useState(false);

    if(redirectToNotes)
        navigate('/notes');

    if(redirectToHome)
        navigate('/');

    const deleteUser = async () => {
        let response = await UsersService.delete();
        const { data } = response;
        if(data.success) {
            alert('Your account was deleted successfully!'); 
            localStorage.removeItem('user', null);
            localStorage.removeItem('token', null);
            setRedirectToHome(true);
        }
    }

    setTimeout(function() {
        if(timer){
            user = JSON.parse(localStorage.getItem('user'));
            if(user){
                setName(user.name);
                props.setHeaderName(user.name);
                setEmail(user.email);
                setId(user._id);
            } else {console.log('aqui')}
        }
        setTimer(false);
    }, 2000)

    const editIcon = (e, id) => {
        e.preventDefault();
        user = JSON.parse(localStorage.getItem('user'));
        let element = document.getElementById(id);
        let icon = element.getAttribute('data-icon')

        if(icon=='pen') {
            if(id=='name-icon') 
                setNameIcon(faCheck);
            else 
                setEmailIcon(faCheck);
        } else {
            if(id=='name-icon') {
                if(name!=user.name) {
                    props.setHeaderName(name);
                }
                setNameIcon(faPen);
            } else {
                setEmailIcon(faPen);
            };
            updateUser({name: name, email: email});
        }
    }

    const updateUser = async (params) => {
        try {
            await UsersService.update(params);
            setSuccess(true);
            setSuccessName(name)
            setError(false);
        } catch (error) {
            setError(true);
        }
    }

    return (
        <Fragment>
            <br />
            <Title size={6} className="has-text-custom-grey has-text-centered">
                Your Credentials
            </Title>
            <Column.Group id="user-edit-column-group" centered>
                <Column size={12}>
                    <Field>
                        <Column.Group className="is-vcentered" breakpoint="mobile">
                            <Column size="11">
                                <Label size="small">Name:</Label>
                                <Control>
                                    <Input type="name" value={name} onChange={e => {
                                        setName(e.target.value);
                                    }} required name="name" disabled={nameIcon==faPen}/>
                                </Control>
                            </Column>
                            <Column className="icon-btn-column" mobile={2} size={1}>
                                <a href="#" className={`icon-btn button is-outlined" ${nameIcon==faCheck ? "is-success has-text-success" : ""}`} onClick={(e) => {editIcon(e, "name-icon")}}>
                                    <FontAwesomeIcon
                                        icon={nameIcon}
                                        color="grey"
                                        className="is-pulled-left" 
                                        id="name-icon"
                                    />
                                </a>
                            </Column>
                        </Column.Group>
                    </Field>
                    <Field>
                        <Column.Group className="is-vcentered" breakpoint="mobile">
                            <Column size="11">
                                <Label size="small">Email:</Label> <Control>
                                    <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required name="email" disabled={emailIcon==faPen}/>
                                </Control>
                            </Column>
                            <Column className="icon-btn-column" mobile={2} size={1}>
                                <a href="#" className={`icon-btn button is-outlined" ${emailIcon==faCheck ? "is-success has-text-success" : ""}`} onClick={(e) => {editIcon(e, "email-icon")}}>
                                    <FontAwesomeIcon
                                        icon={emailIcon}
                                        color="grey"
                                        className="is-pulled-left" 
                                        id="email-icon"
                                    />
                                </a>
                            </Column>
                        </Column.Group>
                    </Field>
                    { success && <Help color="success">{successName}, your profile was modified successfully!</Help> }
                    { error && <Help color="danger">Happened an error modifying your profile, please try again!</Help> }
                    <Field>
                        <PasswordForm editIcon={editIcon} id={id} userName={name}/>
                    </Field>
                    <br/>
                    {
                        deleteAccountField
                        ?   <DeleteForm deleteUser={deleteUser} setDeleteAccountField={setDeleteAccountField}/>
                        :   <Field> 
                                <Control> 
                                    <Column.Group breakpoint="mobile" id="user-btns-column-group"> 
                                        <Column> 
                                            <a onClick={() => setRedirectToNotes(true)} className="button is-white has-text-custom-purple">
                                                Back to Your Notes or
                                            </a> 
                                        </Column> 
                                        <Column> 
                                            <a onClick={() => setDeleteAccountField(true)} className="button is-outlined is-danger">
                                                Delete Account
                                            </a> 
                                        </Column> 
                                    </Column.Group> 
                                </Control> 
                            </Field> 
                    }
                </Column>
            </Column.Group>
        </Fragment>
    )
}

export default UserEditForm;