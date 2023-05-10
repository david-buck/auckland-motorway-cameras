import { NextResponse } from "next/server";

const aucklandCameras = [
  { SortGroup: "SH1-Southern", name: "SH1 Southern Motorway" },
  { SortGroup: "SH1-Northern", name: "SH1 Northern Motorway" },
  { SortGroup: "SH16-North-Western", name: "SH16 North Western" },
  { SortGroup: "SH20-South-Western", name: "SH20 South Western" },
  { SortGroup: "SH20A", name: "SH20a Airport Motorway" },
  { SortGroup: "SH20A-South-Western", name: "SH20A South Western" },
  { SortGroup: "SH20B", name: " SH20B" },
  { SortGroup: "SH18-Upper-Harbour", name: "SH18 Upper Harbour Motorway" },
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

  const output = {};

  data.features.forEach((camera) => {
    const {
      LastEdited,
      Created,
      ExternalId,
      Name,
      Description,
      Offline,
      UnderMaintenance,
      ImageUrl,
      Latitude,
      Longitude,
      Direction,
      SortGroup,
      TasJourneyId,
      RegionID,
      TasRegionId,
      uniq,
      lastUpdated,
    } = camera.properties;

    const cameraInfo = {
      LastEdited,
      Created,
      ExternalId,
      Name,
      Description,
      Offline,
      UnderMaintenance,
      ImageUrl,
      Latitude,
      Longitude,
      Direction,
      SortGroup,
      TasJourneyId,
      RegionID,
      TasRegionId,
      uniq,
      lastUpdated,
    };

    const groupName = aucklandCameras.find(
      (group) => group.SortGroup === SortGroup
    )?.name;

    if (groupName) {
      if (!output[groupName]) {
        output[groupName] = [];
      }
      output[groupName].push(cameraInfo);
    }
  });

  return NextResponse.json(output);
}
