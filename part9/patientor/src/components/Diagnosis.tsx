import React from 'react';

import { useStateValue } from '../state';

const Diagnosis = ({ code }: { code: string }) => {
    const [{ diagnoses }] = useStateValue();

    // eslint-disable-next-line
    const diagnosis = diagnoses.find(diagnosis => diagnosis.code === code);

    if(!diagnosis) {
        return <></>;
    }

    return (
        <>
            {diagnosis.name}
        </>
    );
};

export default Diagnosis;