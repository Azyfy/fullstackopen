import React from 'react';

import {  Header, Container } from "semantic-ui-react";

const SinglePatient = ({ patient }: {patient: any}) => {

    return(
        <Container>
            <Header as="h2">
                {patient.name} 
            </Header>
            <Container>
                <p>{patient.name} </p>
                <p>{patient.ssn} </p>
                <p>{patient.occupation} </p>
            </Container>

        </Container>
    );
};

export default SinglePatient;