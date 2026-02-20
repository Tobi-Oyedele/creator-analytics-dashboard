import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    totalViews: 100000,
    subscribers: 5000,
    revenue: 20000,
    engagementRate: 7.5,
  };
  return NextResponse.json(data);
}
