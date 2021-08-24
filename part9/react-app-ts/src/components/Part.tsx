import React from "react";

interface ContentProps {
    type: string;
    description?: string;
    groupProjectCount?: number;
    exerciseSubmissionLink?: string;
    requirements?: string[];
}

const Part = ({ courseParts }: {courseParts: ContentProps}) => {

    return(
        <>
        {(courseParts.description) ?  <p>{courseParts.description}</p> : <></> }
        {(courseParts.groupProjectCount) ?  <p>{courseParts.groupProjectCount}</p> : <></> }
        {(courseParts.exerciseSubmissionLink) ?  <p>{courseParts.exerciseSubmissionLink}</p> : <></> }
        {(courseParts.requirements) ?  <p>Required skills: {courseParts.requirements!.toString()}</p> : <></> }
        </>
    );
};

export default Part;