import React, { useState, useRef, useEffect } from "react";
import { SVGPathData, encodeSVGPath } from "svg-pathdata";
import Draggable from "react-draggable";
import { getScaledPathData } from 'utils';

import "./styles.scss";

// our goal: click + drag points that adjust our path

// what we need:
// start with path data (absolute)
// need to get all commands
// for each command, need to get the (x,y) points from that
// render circles for each of those points (ideally diff color/size for control vs. regular points)
// make the circle draggable using react-draggable
// https://github.com/mzabriskie/react-draggable
// H can only be dragged horizontally
// V can only be dragged vertically
// as the user drags, need to update the path command that created this point with the new X and Y values
// whenever the data updates, need to rerender (hold data in state)



// we have a path segment

const EditablePathWithPoints = ({ data, dimensions }) => {
  const [pathData, setPathData] = useState(data);
  const [viewBox, setViewBox] = useState(`0 0 100 100`);
  const [arePointsVisible, setPointsVisibility] = useState(false);
  const pathRef = useRef(null);

  const getPoints = pathData => {
    const pathCommands = new SVGPathData(pathData).toAbs().commands;
    const points = pathCommands.map((segment, i, allSegments) => {
      const { type, x, y, x1, y1, x2, y2 } = segment;
      const getXValue = x => {
        if (!x) {
          return allSegments[i - 1].x;
        }
        return x;
      };
      const getYValue = y => {
        if (!y) {
          return allSegments[i - 1].y;
        }
        return y;
      };

      const handleDrag = (e, position) => {
        const currentIndex = i;
        const { x: posX, y: posY } = position;
        const newPathCommands = pathCommands.map((segment, i) => {
          if (i === currentIndex) {
            return { ...segment, x: posX, y: posY };
          }
          return segment;
        });
        const newPathData = encodeSVGPath(newPathCommands);
        setPathData(newPathData);
      };

      const getDragAxis = type => {
        switch (type) {
          case SVGPathData.HORIZ_LINE_TO: {
            return "x";
          }
          case SVGPathData.VERT_LINE_TO: {
            return "y";
          }
          default:
            return "both";
        }
      };

      const position = {
        x: getXValue(x),
        y: getYValue(y)
        // x1: x1 ? getXValue(x1) : '',
        // y1: y1getYValue(y1),
        // x2: getXValue(x2),
        // y2: getYValue(y2)
      };

      return (
        <Draggable
          axis={getDragAxis(type)}
          defaultClassNameDragging="dragging"
          // defaultPosition={position}
          position={{ x: position.x, y: position.y }}
          positionOffset={{ x: -position.x, y: -position.y }}
          // grid={[25, 25]}
          // scale={1}
          // onStart={(e, data) => console.log(data)}
          // onStop={handleDrag}
          onDrag={handleDrag}
        >
          <circle
            fill="blue"
            stroke="black"
            opacity="0.5"
            r={2}
            cx={getXValue(x)}
            cy={getYValue(y)}
          />
        </Draggable>
      );
    });
    return points;
  };

  return (
    <>
      <div>
        <svg viewBox={viewBox} preserveAspectRatio='xMidYMid meet' width={dimensions.width} height={dimensions.height}>
          <g>
            <path ref={pathRef} fill="none" stroke="black" d={pathData} />
            {arePointsVisible ? getPoints(pathData) : null}
          </g>
        </svg>
      </div>
      <div className="actions">
        <button className="button" onClick={() => setPointsVisibility(!arePointsVisible)}>
          {arePointsVisible ? "hide points" : "show points"}
        </button>
        <textarea className="textarea" rows={10} value={pathData} onChange={e => setPathData(e.target.value)} placeholder="enter path data :)"></textarea>
      </div>
    </>
  );
};

export default EditablePathWithPoints;