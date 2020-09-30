import React, { useState, useEffect } from "react";
import {
  SVGPathData,
  encodeSVGPath,
} from "svg-pathdata";
import { getScaledPathData } from 'utils';
import "./styles.scss";
import { getPathCommandsWithPreviousPoint, getPathCommandsAsCubicCurves } from "utils";
import Draggable from 'react-draggable';

// For our draggable path, we will convert everything we need into Cubic bezier curves! That way we can always show the same amount of points! Start, end, and two control points :)
  // WOW this is mindblowing. Because we can't represent Arcs as a single cubic bezier, but we can represent it as a series of these!

const getSingleSegmentPathData = command => {
  if (command.type & SVGPathData.CURVE_TO) {
    const { prevX, prevY, x1, y1, x2, y2, x, y } = command;
    return `M${prevX} ${prevY} C${x1} ${y1} ${x2} ${y2} ${x} ${y}`;
  } else {
    return encodeSVGPath(command);
  }
}

// const getPoints = [...getXYPoints(pathCommands), ...getX1Y1Points(pathCommands), ...getX2Y2Points(pathCommands)];
// const getX2Y2Points =
// const getX1Y1Points = []

const getSegments = ({ pathCommands, selectedCommand, highlightedCommand, onMouseOver, onMouseOut, onClick }) => pathCommands.map((command, i) => {
    const d = getSingleSegmentPathData(command);
      return (
        <path
          onMouseOver={() => onMouseOver(i)}
          onMouseOut={onMouseOut}
          onClick={() => onClick(i)}
          id={i}
          className="path-segment"
          d={d}
          stroke={
            i === selectedCommand
              ? "#e76f51"
              : i === highlightedCommand
              ? "#f4a261"
              : "lightgrey"
          }
          strokeWidth="2px"
          fill="none"
          key={i}
        />
      );
    });
  
  const getNormalizedPathCommands = (data, scale) => {
    const scaledPathData = getScaledPathData(data, scale);
    const pathDataAsCubicCurves = getPathCommandsAsCubicCurves(scaledPathData);
    return getPathCommandsWithPreviousPoint(
      pathDataAsCubicCurves
    );
  };
  
const getPoints = ({ pathCommands, onDrag, onStop, arePointsVisible, areControlPointsVisible }) => {
  const points = pathCommands.map((segment, i) => {
    const { x, y, x1, y1, x2, y2 } = segment;

    const handleDragXY = (e, position) => {
        const { x: posX, y: posY } = position;
        const newPathCommands = pathCommands.map((segment, segmentIndex) => {
          if (i === segmentIndex) {
            return { ...segment, x: posX, y: posY };
          } else if (i === segmentIndex - 1) {
            return { ...segment, prevX: posX, prevY: posY };
          }
          return segment;
        });
        return onDrag(newPathCommands);
      };

    const handleDragX1Y1 = (e, position) => {
      const { x: posX, y: posY } = position;
      const newPathCommands = pathCommands.map((segment, segmentIndex) => {
        if (i === segmentIndex) {
          return { ...segment, x1: posX, y1: posY };
        } 
        return segment;
      });
      return onDrag(newPathCommands);
    };

    const handleDragX2Y2 = (e, position) => {
      const { x: posX, y: posY } = position;
      const newPathCommands = pathCommands.map((segment, segmentIndex) => {
        if (i === segmentIndex) {
          return { ...segment, x2: posX, y2: posY };
        }
        return segment;
      });
      return onDrag(newPathCommands);
    };

    return (
      <>
        {arePointsVisible && (
          <Draggable
            axis="both"
            defaultClassNameDragging="dragging"
            position={{ x, y }}
            positionOffset={{ x: -x, y: -y }}
            onStop={onStop}
            onDrag={handleDragXY}
            key={`${i}-xy`}
          >
            <circle
              fill="green"
              opacity="0.8"
              r={5}
              cx={x}
              cy={y}
            />
          </Draggable>
        )}
        {areControlPointsVisible && (
          <>
            <Draggable
              axis="both"
              defaultClassNameDragging="dragging"
              position={{ x: x1, y: y1 }}
              positionOffset={{ x: -x1, y: -y1 }}
              onStop={onStop}
              onDrag={handleDragX1Y1}
              key={`${i}-x1y1`}
            >
              <circle
                fill="red"
                opacity="0.8"
                r={3}
                cx={x1}
                cy={y1}
              />
            </Draggable>
            <Draggable
              axis="both"
              defaultClassNameDragging="dragging"
              position={{ x: x2, y: y2 }}
              positionOffset={{ x: -x2, y: -y2 }}
              onStop={onStop}
              onDrag={handleDragX2Y2}
              key={`${i}-x2y2`}
            >
              <circle
                fill="red"
                opacity="0.8"
                r={3}
                cx={x2}
                cy={y2}
              />
            </Draggable>
          </>
        )}
      </>
    );
  });
  return points;
};

const DraggablePath = ({ data, scale = 1, selectedCommand, highlightedCommand, onMouseOver, onMouseOut, onClick, onDragEnd, arePointsVisible, areControlPointsVisible }) => {
  const [pathCommands, setPathCommands] = useState(getNormalizedPathCommands(data, scale));
  const onDrag = commands => setPathCommands(commands);
  const onStop = () => onDragEnd(new SVGPathData(encodeSVGPath(pathCommands)).scale(1/scale, 1/scale).encode());

  useEffect(() => { 
    setPathCommands(getNormalizedPathCommands(data, scale));
  }, [data, scale]);

  return (
    <svg width={"100%"} height={"100%"}>
      {getSegments({
        pathCommands,
        selectedCommand,
        highlightedCommand,
        onMouseOver,
        onMouseOut,
        onClick,
      })}
      {getPoints({ pathCommands, onDrag, onStop, arePointsVisible, areControlPointsVisible })}
    </svg>
  );
}

export default DraggablePath;
