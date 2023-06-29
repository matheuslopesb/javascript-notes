import React, { Fragment, useState } from 'react';
import { Title, Column } from "rbx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';

const DeleteForm = (props) => {
    return (
        <Fragment>
            <Title size={6}>Please confirm your action: </Title>
            <Column.Group>
                <Column id="delete-cancel-btn-column" size="6">
                    <a href="#" onClick={() => props.setDeleteAccountField(false)} className="icon-btn button is-outlined is-danger">
                        <FontAwesomeIcon
                            icon={faXmark}
                            color="grey"
                            className="is-pulled-left"
                        />
                    </a>
                </Column>
                <Column id="delete-confirm-btn-column" size="6">
                    <a href="#" onClick={() => props.deleteUser()} className="icon-btn button is-outlined is-success">
                        <FontAwesomeIcon
                            icon={faCheck}
                            color="grey"
                            className="is-pulled-left"
                        />
                    </a>
                </Column>
            </Column.Group>
        </Fragment>
    )
};

export default DeleteForm;