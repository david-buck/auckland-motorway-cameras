import { NextResponse } from "next/server";

const aucklandCameras = [
  { SortGroup: "SH1-Southern", name: "SH1 Southern Motorway" },
  { SortGroup: "SH1-Northern", name: "SH1 Northern Motorway" },
  { SortGroup: "SH16-North-Western", name: "SH16 North Western" },
  { SortGroup: "SH20-South-Western", name: "SH20 South Western" },
  { SortGroup: "SH20A", name: "SH20a Airport Motorway " },
];

export async function GET() {
  const res = await fetch(
    "https://www.journeys.nzta.govt.nz/assets/map-data-cache/cameras.json",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();

  return NextResponse.json({ data });
}
