export const calculateBmi = (weight: number, height: number): string => {
  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);

  if (bmi >= 40) return "Obese Class III";
  if (bmi >= 35) return "Obese Class II";
  if (bmi >= 30) return "Obese Class I";
  if (bmi >= 25) return "Overweight";
  if (bmi >= 18.5) return "Normal weight";
  if (bmi >= 16) return "Underweight";
  return "Severely underweight";
};

if (require.main === module) {
  const weight = parseFloat(process.argv[2]);
  const height = parseFloat(process.argv[3]);
  const bmi = calculateBmi(weight, height);
  console.log(`Your BMI is ${bmi}`);
}
