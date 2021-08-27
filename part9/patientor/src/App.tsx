import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Patient, DiagnosesEntry } from "./types";

import PatientListPage from "./PatientListPage";
import SinglePatientPage from "./SinglePatientPage/SinglePatientPage";

import { patientList, diagnosesList } from "./state";

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(patientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    const fetchDiagnoses = async () => {
      try {
        const { data: diagnosestListFromApi } = await axios.get<DiagnosesEntry[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(diagnosesList(diagnosestListFromApi));
      } catch (e) {
          console.error(e);
      }
    };

    void fetchPatientList();
    void fetchDiagnoses();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/:id" >
              <SinglePatientPage />
            </Route>
            <Route path="/">
              <PatientListPage />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
