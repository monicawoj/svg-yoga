import React, { useRef, useEffect, useState } from "react";
// import randomColor from 'randomcolor';
import { SVGPathData, encodeSVGPath } from "svg-pathdata";
import { scaleLinear } from "d3-scale";

import { getScaledPathData } from './utils';
import "./styles.scss";

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

const SegmentedPath = ({ data, scaleX, scaleY }) => {
  const [pathCount, setPathCount] = useState(0);
  const [refPathData, setRefPathData] = useState(
    getScaledPathData(data, scaleX, scaleY)
  );
  const interactivePathRef = useRef(null);
  useEffect(() => {
    getReferencePath(scaleX, scaleY);
    getSegments(scaleX, scaleY);
  }, [refPathData]);

  const getReferencePath = (scaleX, scaleY) => (
    <path fill="none" stroke="black" d={refPathData} />
  );

  const getSegments = (scaleX, scaleY) =>
    new SVGPathData(refPathData)
      .toAbs()
      .scale(scaleX, scaleY)
      .commands.map((segment, i, allSegments) => {
        const colorScale = scaleLinear()
          .domain([0, allSegments.length - 1])
          .range(["green", "red"]);
        // our full path data = the intial moveTo and our current path
        const d = getPathData(segment, i, allSegments);

        // add an onClick (or onHover) command to make this interactive
        return (
          <path
            onClick={() => console.log(`type-${segment.type}-${i}`)}
            id={`type-${segment.type}-${i}`}
            d={d}
            stroke={colorScale(i)}
            strokeWidth="2px"
            fill="none"
          />
        );
        // 1. get it as a random color (randomColor())
        // 2. render step by step
        // 3. combine the two steps above, render with color gradient
        // 4. show the full text of the reference path in an input field that allows you to modify the path
        // 5. somehow highlight what it is you are changing (diff)
      });

  return (
    <div className="container">
      <div>
        <button onClick={() => setPathCount(pathCount + 1)}>
          get next path
        </button>
      </div>
      {/* <div className="code"> */}
        {/* <label>
          Path data:
          <textarea
            type="text"
            id="code"
            name="code"
            value={refPathData}
            onChange={e => setRefPathData(e.target.value)}
          />
        </label> */}
        <div class="field">
          <div class="control">
            <textarea class="textarea is-info" value={refPathData} onChange={e => setRefPathData(e.target.value)} placeholder="enter path data :)"></textarea>
          </div>
        </div>
      {/* </div> */}
      <div className="visual">
        <svg width={"100%"} height={"200px"}>
          {getReferencePath(scaleX, scaleY)}
        </svg>
        <svg width={"100%"} height={"200px"} ref={interactivePathRef}>
          {/* {getSegments(scaleX,scaleY).filter((d,i) => i <= pathCount)} */}
          {getSegments(scaleX, scaleY)}
        </svg>
      </div>
    </div>
  );
}

export default SegmentedPath;
