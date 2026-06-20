import { exercises } from "@/data";
import { NextRequest, NextResponse } from "next/server";

// GET /api/exercises/[id] - Get a single exercise by ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const exerciseId = Number(id);

    if (isNaN(exerciseId)) {
      return NextResponse.json(
        { error: "Invalid exercise ID" },
        { status: 400 }
      );
    }

    const exercise = exercises.find((ex) => ex.id === exerciseId);
    if (!exercise) {
      return NextResponse.json(
        { error: "Exercise not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(exercise, { status: 200 });
  } catch (error) {
    console.error("GET exercise by ID error:", error);
    return NextResponse.json(
      { error: "Failed to fetch exercise" },
      { status: 500 }
    );
  }
}

// PUT /api/exercises/[id] - Update an exercise by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const exerciseId = Number(id);

    if (isNaN(exerciseId)) {
      return NextResponse.json(
        { error: "Invalid exercise ID" },
        { status: 400 }
      );
    }

    const index = exercises.findIndex((ex) => ex.id === exerciseId);
    if (index === -1) {
      return NextResponse.json(
        { error: "Exercise not found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { name, bodyPart, equipment, sets, reps } = body;

    // Validate fields if provided
    if (name !== undefined) exercises[index].name = name;
    if (bodyPart !== undefined) exercises[index].bodyPart = bodyPart;
    if (equipment !== undefined) exercises[index].equipment = equipment;
    if (sets !== undefined) exercises[index].sets = sets !== null ? Number(sets) : undefined;
    if (reps !== undefined) exercises[index].reps = reps !== null ? Number(reps) : undefined;

    return NextResponse.json(exercises[index], { status: 200 });
  } catch (error) {
    console.error("PUT exercise error:", error);
    return NextResponse.json(
      { error: "Failed to update exercise" },
      { status: 500 }
    );
  }
}

// DELETE /api/exercises/[id] - Delete an exercise by ID
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const exerciseId = Number(id);

    if (isNaN(exerciseId)) {
      return NextResponse.json(
        { error: "Invalid exercise ID" },
        { status: 400 }
      );
    }

    const index = exercises.findIndex((ex) => ex.id === exerciseId);
    if (index === -1) {
      return NextResponse.json(
        { error: "Exercise not found" },
        { status: 404 }
      );
    }

    const deleted = exercises.splice(index, 1)[0];

    return NextResponse.json(
      { message: "Exercise deleted successfully", deleted },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE exercise error:", error);
    return NextResponse.json(
      { error: "Failed to delete exercise" },
      { status: 500 }
    );
  }
}
