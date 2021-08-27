import React from 'react';

import { Entry } from '../types';
import { Icon } from 'semantic-ui-react';

const EntryComponent = ({ entry }: { entry: Entry }) => {

    return (
        <>
            <span> { entry.date } 
                {(entry.type === "HealthCheck")? <Icon name="doctor" size="large" /> : null }
                {(entry.type === "OccupationalHealthcare")? <Icon name="stethoscope"  size="large" /> : null }
                {(entry.type === "Hospital")? <Icon name="hospital"  size="large" /> : null }
            </span>
            <p> { entry.description } </p>
            {(entry.type === "HealthCheck")? <p>Health Check Rating: {entry.healthCheckRating} </p> : null }
            {(entry.type === "Hospital")? <p> Discharge: {entry.discharge.date}, criteria: {entry.discharge.criteria} </p>: null }
            {(entry.type === "OccupationalHealthcare")?
                <div>
                    <p> Employer Name: {entry.employerName} </p>
                    <p> {(entry.sickLeave) ? `Sick Leave: ${entry.sickLeave?.startDate} to ${entry.sickLeave?.endDate}` : null }  </p> 
                </div>
                 : null }

        </>
    );
};

export default EntryComponent;