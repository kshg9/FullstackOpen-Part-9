import { calculateExercise } from "./exerciseCalculator";

const passArguments = (args: Array<string>): void => {
  const target = Number(args[args.length - 1]);
  const dailyExercise = args.slice(0, args.length - 1).map(Number);
  console.log(dailyExercise, target);
  const result = calculateExercise(dailyExercise, target);
  console.log(result);
};

if (require.main === module) {
  passArguments(process.argv.slice(2));
}
