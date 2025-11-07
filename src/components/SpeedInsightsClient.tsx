"use client";

import dynamic from "next/dynamic";
import React from "react";

// dynamic import, ssr: false so Next doesn't try to resolve/import on the server build
const SpeedInsights = dynamic(
  () => import("@vercel/speed-insights/next").then((m) => m.SpeedInsights),
  { ssr: false }
);

export default function SpeedInsightsClient(): JSX.Element {
  return <SpeedInsights />;
}