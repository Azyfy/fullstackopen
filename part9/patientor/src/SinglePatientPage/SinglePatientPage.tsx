import React from "react";
import axios from "axios";
import { useParams } from "react-router";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";

import SinglePatient from "../components/SinglePatient";

 import { useStateValue } from "../state";


const SinglePatientPage = () => {
  const { id } = useParams<{ id: string }>();

  const [{ patient } , dispatch] = useStateValue();

    
    React.useEffect(() => {

        const fetchSinglePatient = async () => {
        try {
            console.log("fetch");
            const { data: singlePatientFromApi } = await axios.get<Patient>(
              `${apiBaseUrl}/patients/${id}`
            );
            dispatch({ type: "SET_SINGLE_PATIENT", payload: singlePatientFromApi });

          } catch (e) {
            console.error(e);
          }
        };
        void fetchSinglePatient();

    }, [dispatch]);

    return(
        <>
        {(patient[0])?
        <SinglePatient patient={patient[0]} />
        : <></>
        }
        </>
    );
};

export default SinglePatientPage;