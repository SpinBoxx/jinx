import { cn } from "@/lib/utils";
import React from "react";
import { useGauge } from "use-gauge";

interface ArcedProps {
  value: number;
}

const START_ANGLE = 45;
const END_ANGLE = 315;
const MIN_VALUE = 0;
const MAX_VALUE = 100;

export function Gauge(props: ArcedProps) {
  const { value } = props;
  const gauge = useGauge({
    domain: [0, 100],
    startAngle: START_ANGLE,
    endAngle: END_ANGLE,
    numTicks: 21,
    diameter: 180,
  });

  const needle = gauge.getNeedleProps({
    value,
    baseRadius: 12,
    tipRadius: 2,
    offset: 15,
  });

  return (
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
          <path
            {...gauge.getArcProps({
              offset: 30,
              startAngle: START_ANGLE,
              endAngle: gauge.valueToAngle(value),
            })}
            fill="none"
            className={cn(
              value <= 20 && "stroke-red-500",
              value > 20 && value < 80 && "stroke-blue-400",
              value >= 80 && value <= MAX_VALUE && "stroke-green-500"
            )}
            strokeLinecap="round"
            strokeWidth={24}
          />
        </g>
        <g id="ticks">
          {gauge.ticks.map((angle) => {
            const asValue = gauge.angleToValue(angle);
            const showText = asValue % 20 === 0;

            return (
              <React.Fragment key={`tick-group-${angle}`}>
                <line
                  className={cn(
                    asValue <= 20 && "stroke-red-500",
                    asValue > 20 && asValue < 80 && "stroke-blue-500",
                    asValue >= 80 && asValue <= MAX_VALUE && "stroke-green-500"
                  )}
                  strokeWidth={2}
                  {...gauge.getTickProps({ angle, length: showText ? 12 : 6 })}
                />
                {showText && (
                  <text
                    className={cn(
                      asValue <= 20 && "stroke-red-500",
                      asValue > 20 && asValue < 80 && "stroke-blue-500",
                      asValue >= 80 &&
                        asValue <= MAX_VALUE &&
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
      <p className="text-center font-semibold">{value}/100</p>
    </div>
  );
}
