function calculateBmi (height: number, mass: number): string {
    const bmi = mass / ((height/100) ** 2) 
    const roundBmi = Math.round(bmi*10)/10
    console.log("bmi", roundBmi )

    if(roundBmi < 18.5) {
        return "Underweight"
    }
    else if( 18.5 <= roundBmi && roundBmi <= 24.9) {
        return "Normal weight"
    }
    else if( 25 <= roundBmi && roundBmi <= 29.9) {
        return "Overweight"
    }
    else if(roundBmi >= 30) {
        return "Obesity"
    }
    else{
        return "Error"
    }
}

console.log(calculateBmi(180, 74))
