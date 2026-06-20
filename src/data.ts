export type Exercise = {
  id: number;
  name: string;
  bodyPart: string;
  equipment: string;
  sets?: number;
  reps?: number;
};

// Mutable in-memory store (resets on server restart — perfect for learning CRUD)
export const exercises: Exercise[] = [
  { id: 1, name: "Bench Press", bodyPart: "Chest", equipment: "Barbell", sets: 4, reps: 8 },
  { id: 2, name: "Pull Up", bodyPart: "Back", equipment: "Body Weight", sets: 3, reps: 10 },
  { id: 3, name: "Squat", bodyPart: "Legs", equipment: "Barbell", sets: 4, reps: 6 },
  { id: 4, name: "Overhead Press", bodyPart: "Shoulders", equipment: "Barbell", sets: 3, reps: 8 },
  { id: 5, name: "Deadlift", bodyPart: "Back", equipment: "Barbell", sets: 3, reps: 5 },
  { id: 6, name: "Bicep Curl", bodyPart: "Arms", equipment: "Dumbbell", sets: 3, reps: 12 },
  { id: 7, name: "Tricep Dip", bodyPart: "Arms", equipment: "Body Weight", sets: 3, reps: 12 },
  { id: 8, name: "Leg Press", bodyPart: "Legs", equipment: "Machine", sets: 4, reps: 10 },
];

/** Returns the next available id */
export function nextId(): number {
  return exercises.length > 0 ? Math.max(...exercises.map((e) => e.id)) + 1 : 1;
}