import React from 'react';
import Diagnosis from './Diagnosis';
import EntryComponent from '../components/EntryComponent';

import {  Header, Container } from "semantic-ui-react";
import { Entry, Patient } from '../types';

import { Icon } from 'semantic-ui-react';

const SinglePatient = ({ patient }: {patient: Patient}) => {

    return(
        <Container>
            <Header as="h2">
                {patient.name} {(patient.gender ==="male")? 
                            <Icon name="mars" />    
                            : <Icon name="venus" /> }
            </Header>
            <Container>
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
                                    <Container key={entry.id} style={{border: "1px solid grey", padding: "10px", borderRadius: "5px", marginBottom: "10px"}}>
                                        <EntryComponent entry={entry} />
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