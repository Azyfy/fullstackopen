function calculateExercises( trainingHoursPerDay : number[], targetHours :number ) {
    const numberOfDays: number = trainingHoursPerDay.length
    
    const trainingDays: number = (trainingHoursPerDay.filter(training => training>0)).length

    const target: number = targetHours

    const averageTraining: number = trainingHoursPerDay.reduce((sum, n) => sum+n) / trainingHoursPerDay.length

    const targetReached: boolean = (averageTraining > target) ? true : false

    let rating :number
    let ratingDescription :string
    
    if(averageTraining < target) {
        rating = 1
        ratingDescription = "Below intended value, more training "
    }
    else if (averageTraining === target) {
        rating = 2
        ratingDescription = "Intended value met, increase training "
    }
    else if (averageTraining > target) {
        rating = 3
        ratingDescription = "Above intended value, increase target hours "
    }
    else {
        //error
        rating = 0
    }

    return {
        periodLength: numberOfDays,
        trainingDays: trainingDays,
        success: targetReached,
        rating,
        ratingDescription,
        target,
        average: averageTraining,
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))