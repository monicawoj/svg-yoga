import React from "react";
import {
  SVGPathData,
  encodeSVGPath,
} from "svg-pathdata";
// import getBounds from 'svg-path-bounds';
import { getScaledPathData } from 'utils';
import "./styles.scss";

// normalize the path to get everything in bezier curves!!
// why?
// tweening? animation?
// https://www.npmjs.com/package/normalize-svg-path

const withoutLetters = str => str.replace(/[^0-9-., ]/g, "");

const getPathData = (segment, i, allSegments) => {
  // check the current segment's parent command (where it came from)
  const currentCommand = encodeSVGPath(segment);
  const dCurrentCommand = currentCommand.split(" ");

  if (i === 0) {
    return currentCommand;
  }

  const parent = encodeSVGPath(allSegments[i - 1]);
  const dParent = parent.split(" ");

  if (dParent.length === 1) {
    const grandparent = encodeSVGPath(allSegments[i - 2]);
    const dGrandparent = grandparent.split(" ");
    // if it has a V: use the number as the Y value for our end position, and look to grandparent to get our X position...
    if (dParent[0].includes("V")) {
      const x = withoutLetters(dGrandparent.slice(dGrandparent.length - 2)[0]);
      const y = withoutLetters(dParent[0]);

      return `M${x} ${y} ${currentCommand}`;
    }
    // if it has a H: use the number as our X value for our end position, and look to the grandparent for our Y position...
    if (dParent[0].includes("H")) {
      const x = withoutLetters(dParent[0]);
      const y = withoutLetters(dGrandparent.slice(dGrandparent.length - 2)[1]);

      return `M${x} ${y} ${currentCommand}`;
    }
  }

  const x = withoutLetters(dParent.slice(dParent.length - 2)[0]);
  const y = withoutLetters(dParent.slice(dParent.length - 2)[1]);

  if (currentCommand.includes("S")) {
    // need to define a start control point x1 y1 for all type 'S' x2 y2 x y
    // in essence, need to transform it into a 'C' x1 y1 x2 y2 x y
    const x1 = withoutLetters(dParent[2]);
    const y1 = withoutLetters(dParent[3]);
    const startX = withoutLetters(dParent[4]);
    const startY = withoutLetters(dParent[5]);
    const [x2, y2, endX, endY] = dCurrentCommand;
    const xReflection = 2 * startX - x1;
    const yReflection = 2 * startY - y1;
    return `M${startX} ${startY} C${xReflection} ${yReflection} ${withoutLetters(
      x2
    )} ${y2} ${endX} ${endY}`;
  }

  // in the default case, the end position will always be the last two numbers in the curve
  return `M${x} ${y} ${currentCommand}`;
};

const getSegments = ({ data, selectedCommand, highlightedCommand, onMouseOver, onMouseOut, onClick }) => {
  return new SVGPathData(data)
    .commands.map((segment, i, allSegments) => {
      const d = getPathData(segment, i, allSegments);
      const id = i;

      return (
        <path
          onMouseOver={() => onMouseOver(i)}
          onMouseOut={onMouseOut}
          onClick={() => console.log(i, selectedCommand) || onClick(i)}
          id={id}
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
          key={id}
        />
      );
    });
}
  

const SegmentedPath = ({ data, scale = 1, selectedCommand, highlightedCommand, onMouseOver, onMouseOut, onClick }) => {
  const scaledPathData = getScaledPathData(data, scale);

  return (
        <svg width={"100%"} height={"100%"}>
          {getSegments({ data: scaledPathData, selectedCommand, highlightedCommand, onMouseOver, onMouseOut, onClick })}
        </svg>
  );
}

export default SegmentedPath;
