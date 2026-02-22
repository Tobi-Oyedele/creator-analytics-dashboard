import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    summary: {
      totalRevenue: 16700,
      avgMonthly: 2783,
      bestMonth: 5200,
      sourcesCount: 5,
    },
    breakdown: [
      { type: "Videos", revenue: 4200 },
      { type: "Shorts", revenue: 1800 },
      { type: "Live Streams", revenue: 3100 },
      { type: "Memberships", revenue: 2400 },
      { type: "Sponsorships", revenue: 5200 },
    ],
    trend: [
      { month: "Sep", revenue: 8200 },
      { month: "Oct", revenue: 9800 },
      { month: "Nov", revenue: 11400 },
      { month: "Dec", revenue: 13900 },
      { month: "Jan", revenue: 15200 },
      { month: "Feb", revenue: 16700 },
    ],
    transactions: [
      {
        id: "1",
        source: "YouTube AdSense",
        amount: 1240,
        date: "2026-02-01",
        status: "Paid",
      },
      {
        id: "2",
        source: "Brand Deal - Nike",
        amount: 3500,
        date: "2026-02-05",
        status: "Paid",
      },
      {
        id: "3",
        source: "Channel Memberships",
        amount: 870,
        date: "2026-02-08",
        status: "Paid",
      },
      {
        id: "4",
        source: "Affiliate Commission",
        amount: 420,
        date: "2026-02-12",
        status: "Pending",
      },
      {
        id: "5",
        source: "Brand Deal - Apple",
        amount: 4800,
        date: "2026-02-15",
        status: "Paid",
      },
      {
        id: "6",
        source: "Merch Sales",
        amount: 650,
        date: "2026-02-18",
        status: "Pending",
      },
    ],
  };
  return NextResponse.json(data);
}
