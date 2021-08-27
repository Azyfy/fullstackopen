import React from 'react';
import Diagnosis from './Diagnosis';

import {  Header, Container } from "semantic-ui-react";
import { Entry, Patient } from '../types';

const SinglePatient = ({ patient }: {patient: Patient}) => {

    return(
        <Container>
            <Header as="h2">
                {patient.name} 
            </Header>
            <Container>
                <p>{patient.name} </p>
                <p>{patient.ssn} </p>
                <p>{patient.occupation} </p>
                <Container>
                    <Header as="h4">
                        Entries
                    </Header>
                        {(patient.entries) ?
                            <Container>
                            { patient.entries.map((entry: Entry) => {
                                return(
                                    <Container key={entry.id}>
                                        <p> { entry.date } { entry.description } </p>
                                        {(entry.diagnosisCodes) ?
                                        <ul>
                                        { entry.diagnosisCodes.map(code => {
                                            return (
                                                <li key={code} >{code}  
                                                    <Diagnosis code={code} />
                                                </li>
                                            );
                                        }) }
                                        </ul> 
                                        : <></>
                                    }
                                    </Container>
                                );
                            }) }
                            </Container>
                            : <></> }
                </Container>
            </Container>

        </Container>
    );
};

export default SinglePatient;