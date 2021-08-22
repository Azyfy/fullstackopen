function calculateBmi (height: number, mass: number): string {
    const bmi = mass / ((height/100) ** 2);
    const roundBmi = Math.round(bmi*10)/10;
    console.log("bmi", roundBmi );

    if(roundBmi < 18.5) {
        return "Underweight";
    }
    else if( 18.5 <= roundBmi && roundBmi <= 24.9) {
        return "Normal weight";
    }
    else if( 25 <= roundBmi && roundBmi <= 29.9) {
        return "Overweight";
    }
    else if(roundBmi >= 30) {
        return "Obesity";
    }
    else{
        return "Error";
    }
}

if(process.argv.length === 4) {
    const height = Number(process.argv[2]);
    const mass = Number(process.argv[3]);

    if( isNaN(height) || isNaN(mass)) {
        console.log("Wrong input. Numbers required");
    }

    console.log(calculateBmi(height, mass));
}
else{
    console.log("npm run calculateBmi <height> <mass> ; replace the last two with numbers");
}

export { calculateBmi };