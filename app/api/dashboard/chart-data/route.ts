import { NextResponse } from "next/server";

export async function GET() {
  const chartData = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    return {
      date: `2026-02-${String(day).padStart(2, "0")}`,
      views: Math.floor(Math.random() * (10000 - 3000 + 1)) + 3000,
    };
  });

  return NextResponse.json(chartData);
}
