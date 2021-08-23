import diagnosesData from "../../data/diagnoses.json";

import { DiagnosesEntry } from "../types";

const diagnoses: Array<DiagnosesEntry> = diagnosesData;

const getEntries = () => {
    return diagnoses;
};

export default {
    getEntries,
};