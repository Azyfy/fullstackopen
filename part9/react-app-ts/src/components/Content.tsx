import React from "react";
import Part from "./Part";

interface ContentProps {
    name: string;
    exerciseCount: number;
    type: string;
    description?: string;
    groupProjectCount?: number;
    exerciseSubmissionLink?: string;
}

/**
 * Helper function for exhaustive type checking
 * 
 const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
   */

const Content = ({courseParts}: {courseParts: Array<ContentProps>}) => {

    courseParts.forEach(part => {
        switch (part.type) {
            case "normal":
                break;
            case "groupProject":
                break;
            case "submission":
                break;
            case "special":
                break;
            default:
                break;
        }
    } )

    return (
        <div>
            <p>
                {courseParts[0].name} {courseParts[0].exerciseCount}
            </p>
            <Part courseParts={courseParts[0]} />
            <p>
                {courseParts[1].name} {courseParts[1].exerciseCount}
            </p>
            <Part courseParts={courseParts[1]} />
            <p>
                {courseParts[2].name} {courseParts[2].exerciseCount}
            </p>
            <Part courseParts={courseParts[2]} />
            <p>
                {courseParts[3].name} {courseParts[3].exerciseCount}
            </p>
            <Part courseParts={courseParts[3]} />
            <p>
                {courseParts[4].name} {courseParts[4].exerciseCount}
            </p>
            <Part courseParts={courseParts[4]} />
        </div>
    );
};

export default Content;