import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // TODO: Integrate with insurance provider APIs
    // For now, return mock response
    return NextResponse.json({
      success: true,
      quotes: [],
      message: "Quote API endpoint ready. Integrate with provider APIs.",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}
