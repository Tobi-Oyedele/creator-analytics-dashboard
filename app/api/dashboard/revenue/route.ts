import { NextResponse } from "next/server";

export async function GET() {
  const data = [
    { type: "Videos", revenue: 4200 },
    { type: "Shorts", revenue: 1800 },
    { type: "Live Streams", revenue: 3100 },
    { type: "Memberships", revenue: 2400 },
    { type: "Sponsorships", revenue: 5200 },
  ];
  return NextResponse.json(data);
}
