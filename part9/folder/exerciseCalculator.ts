function calculateExercises( trainingHoursPerDay : number[], targetHours :number ) {
    const numberOfDays: number = trainingHoursPerDay.length;
    
    const trainingDays: number = (trainingHoursPerDay.filter(training => training>0)).length;

    const target: number = targetHours;

    const averageTraining: number = trainingHoursPerDay.reduce((sum, n) => sum+n) / trainingHoursPerDay.length;

    const targetReached: boolean = (averageTraining > target) ? true : false;

    let rating :number;
    let ratingDescription :string;
    
    if(averageTraining < target) {
        rating = 1;
        ratingDescription = "Below intended value, more training ";
    }
    else if (averageTraining === target) {
        rating = 2;
        ratingDescription = "Intended value met, increase training ";
    }
    else if (averageTraining > target) {
        rating = 3;
        ratingDescription = "Above intended value, increase target hours ";
    }
    else {
        //error
        rating = 0;
        ratingDescription = "Shouldnt happen";
    }

    return {
        periodLength: numberOfDays,
        trainingDays: trainingDays,
        success: targetReached,
        rating,
        ratingDescription,
        target,
        average: averageTraining,
    };
}

if(process.argv.length > 4) {
    const target = Number(process.argv[2]);
    const array: string[] = (process.argv.slice(3));
    const arrayNumber: number[] = array.map(n => Number(n));

    arrayNumber.forEach( n => {
        if(isNaN(n)) {
            console.log("Wrong input. Numbers required");
        }
    });
    if(  isNaN(target)) {
        console.log("Wrong input. Numbers required");
    }

    console.log(calculateExercises(arrayNumber, target));
}
else{
    console.log("npm run calculateExercises <target training hours> <training hours per day> ; replace the last two with numbers, the second one being a list of numbers");
}

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))

export { calculateExercises };