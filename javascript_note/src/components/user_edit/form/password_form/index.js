import React, { Fragment, useEffect, useState } from 'react';
import { Control, Input, Column, Help, Label } from "rbx";
import UsersService from '../../../../services/users';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPen, faArrowTurnDown } from '@fortawesome/free-solid-svg-icons';

const PasswordForm = (props) => {
    const [oldPassword, setOldPassword] = useState('');
    const [firstTitle, setFirstTitle] = useState('Password: ');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordField, setNewPasswordField] = useState(null);
    const [icon, setIcon] = useState(faPen);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const [timer, setTimer] = useState(true);

    let user;
    let id;

    const editIcon = () => {
        setIcon(faArrowTurnDown);
        setFirstTitle('Your Actual Password: ');
    };

    const generateNewPasswordField = (e) => {
        e.preventDefault();
        setNewPasswordField(true);
    };

    const updatePassword = async (e) => {
        e.preventDefault();

        try {
            await UsersService.verifyPassword({oldPassword: oldPassword, newPassword: newPassword});
            await UsersService.updatePassword(newPassword);
            setError(false);
            setSuccess(true);
            setNewPasswordField(null);
            setIcon(faPen);
            setOldPassword('');
        } catch (error) {
            setError(true);
        }
    };

    setTimeout(()=>{
        if(timer) {
            user = JSON.parse(localStorage.getItem('user'));
            if(user) {
                id = user._id;
            }
        }
        setTimer(false);
    }, 2000)

    return (
        <Fragment>
            <Column.Group className="is-vcentered" breakpoint="mobile">
                <Column size="11">
                    <Label size="small">{firstTitle}</Label> <Control>
                        <Input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required name="password"
                            disabled={icon == faPen} />
                    </Control>
                </Column>
                <Column className="icon-btn-column" mobile={2} size={1}>
                    <a href="#" className={"icon-btn button is-outlined"} onClick={(e) => { icon==faPen ? editIcon(e) : generateNewPasswordField(e) }}>
                        <FontAwesomeIcon
                            icon={icon}
                            color="grey"
                            className="is-pulled-left"
                        />
                    </a>
                </Column>
            </Column.Group>
            { success && <Help color="success">{props.userName}, your password was modified successfully!</Help> }
            { error && <Help color="danger">Password invalid!</Help> }
            {newPasswordField && 
                <Fragment>
                    <br/>
                    <Column.Group className="is-vcentered" breakpoint="mobile">
                        <Column size="11">
                            <Label size="small">New Password:</Label> <Control>
                                <Input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required name="password"/>
                            </Control>
                        </Column>
                        <Column className="icon-btn-column" mobile={2} size={1}>
                            <a href="#" className="icon-btn button is-outlined is-success has-text-success" onClick={(e) => { updatePassword(e) }}>
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    color="grey"
                                    className="is-pulled-left"
                                />
                            </a>
                        </Column>
                    </Column.Group>
                </Fragment>
            }
        </Fragment>
    )
};

export default PasswordForm;