"use client";

import { cn } from "@/lib/utils";
import { meetingVoteMaxValue, meetingVoteMinValue } from "@/types/meeting";
import React, { useEffect, useState } from "react";
import { useGauge } from "use-gauge";
import { getMeetingVotes } from "@/actions/getMeetingVote";
import { Skeleton } from "@nextui-org/react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface ArcedProps {
  meetingId: number;
}

const START_ANGLE = 45;
const END_ANGLE = 315;

export function Gauge(props: ArcedProps) {
  const [value, setValue] = useState<number | null>(null);
  const gauge = useGauge({
    domain: [meetingVoteMinValue, meetingVoteMaxValue],
    startAngle: START_ANGLE,
    endAngle: END_ANGLE,
    numTicks: 11,
    diameter: 180,
  });

  console.log(value);

  const votes = useQuery(api.meetingVote.getMeetingVotes, {
    meetingId: props.meetingId,
  });

  useEffect(() => {
    if (votes) {
      const currentValue = votes.reduce((res, vote) => (res += vote.note), 0);
      setValue(Math.round((currentValue / votes.length) * 10) / 10 ?? 0);
    }
  }, [votes]);

  var needle = gauge.getNeedleProps({
    value: value ?? 0,
    baseRadius: 12,
    tipRadius: 2,
    offset: value ? (value % 2 === 0 ? 30 : 15) : 15,
  });

  return (
    <Skeleton isLoaded={value !== null}>
      <div className="h-full p-12">
        <svg className="w-full overflow-visible p-2" {...gauge.getSVGProps()}>
          <g id="arcs">
            <path
              {...gauge.getArcProps({
                offset: 30,
                startAngle: START_ANGLE,
                endAngle: END_ANGLE,
              })}
              fill="none"
              className="stroke-gray-200"
              strokeLinecap="round"
              strokeWidth={24}
            />
            {value !== null && (
              <path
                {...gauge.getArcProps({
                  offset: 30,
                  startAngle: START_ANGLE,
                  endAngle: gauge.valueToAngle(value),
                })}
                fill="none"
                className={cn(
                  value <= 2 && "stroke-red-500",
                  value > 2 && value < 8 && "stroke-blue-400",
                  value >= 8 &&
                    value <= meetingVoteMaxValue &&
                    "stroke-green-500"
                )}
                strokeLinecap="round"
                strokeWidth={24}
              />
            )}
          </g>
          <g id="ticks">
            {gauge.ticks.map((angle) => {
              const asValue = gauge.angleToValue(angle);
              const showText = asValue % 2 === 0;

              return (
                <React.Fragment key={`tick-group-${angle}`}>
                  <line
                    className={cn(
                      asValue <= 2 && "stroke-red-500",
                      asValue > 2 && asValue < 8 && "stroke-blue-500",
                      asValue >= 8 &&
                        asValue <= meetingVoteMaxValue &&
                        "stroke-green-500"
                    )}
                    strokeWidth={2}
                    {...gauge.getTickProps({
                      angle,
                      length: showText ? 12 : 6,
                    })}
                  />
                  {showText && (
                    <text
                      className={cn(
                        asValue <= 2 && "stroke-red-500",
                        asValue > 2 && asValue < 8 && "stroke-blue-500",
                        asValue >= 8 &&
                          asValue <= meetingVoteMaxValue &&
                          "stroke-green-500"
                      )}
                      {...gauge.getLabelProps({ angle, offset: 20 })}
                    >
                      {asValue}
                    </text>
                  )}
                </React.Fragment>
              );
            })}
          </g>
          <g id="needle">
            <circle className="fill-gray-300" {...needle.base} r={20} />
            <circle className="fill-gray-700" {...needle.base} />
            <circle className="fill-gray-700" {...needle.tip} />
            <polyline className="fill-gray-700" points={needle.points} />
            <circle className="fill-white" {...needle.base} r={4} />
          </g>
        </svg>
        <p className="text-center font-semibold">
          {value ? value + "/" + meetingVoteMaxValue : "0 votes"}
        </p>
      </div>
    </Skeleton>
  );
}
