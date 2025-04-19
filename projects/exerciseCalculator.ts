interface ExerciseInfo {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercise = (
  dailyExercise: number[],
  target: number
): ExerciseInfo => {
  const periodLength = dailyExercise.length;
  const trainingDays = dailyExercise.filter((day) => day > 0).length;
  const average = dailyExercise.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  const rating = Math.floor((average / target) * 3);

  const ratingDescription =
    rating === 3
      ? "Excellent! Keep up the good work!"
      : rating === 2
      ? "Good job! You're on the right track!"
      : rating === 1
      ? "You can do better! Try to increase your activity level."
      : "You need to work harder! Don't give up!";

  const exerciseInfo: ExerciseInfo = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };

  return exerciseInfo;
};

if (require.main === module) {
  const dailyExercise = [3, 0, 2, 4.5, 0, 3, 1];
  const target = 2;

  console.log(calculateExercise(dailyExercise, target));
}
