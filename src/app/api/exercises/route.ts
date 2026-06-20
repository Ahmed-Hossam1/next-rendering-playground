import { exercises, nextId } from "@/data";
import { NextRequest, NextResponse } from "next/server";

// GET /api/exercises - Get all exercises (optional filtering by bodyPart query param)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const bodyPart = searchParams.get("bodyPart");
  try {
    if (bodyPart) {
      const filtered = exercises.filter(
        (ex) =>
          ex.bodyPart.toLowerCase() === bodyPart.toLowerCase()
      );
      return NextResponse.json(filtered, { status: 200 });
    }
    return NextResponse.json(exercises, { status: 200 });
  } catch (error) {
    console.error("GET exercises error:", error);
    return NextResponse.json(
      { error: "Failed to fetch exercises" },
      { status: 500 },
    );
  }
}

// POST /api/exercises - Create a new exercise
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, bodyPart, equipment, sets, reps } = body;

    // Validation
    if (!name || !bodyPart || !equipment) {
      return NextResponse.json(
        { error: "Missing required fields: name, bodyPart, equipment" },
        { status: 400 }
      );
    }

    const newExercise = {
      id: nextId(),
      name,
      bodyPart,
      equipment,
      sets: sets ? Number(sets) : undefined,
      reps: reps ? Number(reps) : undefined,
    };

    exercises.push(newExercise);

    return NextResponse.json(newExercise, { status: 201 });
  } catch (error) {
    console.error("POST exercise error:", error);
    return NextResponse.json(
      { error: "Failed to create exercise" },
      { status: 500 }
    );
  }
}
