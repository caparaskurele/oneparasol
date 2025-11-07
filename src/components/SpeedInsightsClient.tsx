"use client";

import dynamic from "next/dynamic";

// Dynamically import the SpeedInsights component on the client only
const SpeedInsights = dynamic(
  () => import("@vercel/speed-insights/next").then((m) => m.SpeedInsights),
  { ssr: false }
);

export default function SpeedInsightsClient() {
  return <SpeedInsights />;
}