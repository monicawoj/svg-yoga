import React, { useRef, useEffect, useState } from "react";
import EditablePathWithPoints from "modules/EditablePathWithPoints/EditablePathWithPoints";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { SVGPathData, encodeSVGPath, SVGPathDataTransformer } from "svg-pathdata";
import SegmentedPath from "modules/SegmentedPath/SegmentedPath";
import PathCommandsList from 'modules/PathCommandsList/PathCommandsList';
import DiffViewer from 'modules/DiffViewer/DiffViewer';

import "./App.scss";

// const examplePathData = "M 110,10 l 80,80 v -80 h -40";
const examplePathData =
  "M4.317,16.411c-1.423-1.423-1.423-3.737,0-5.16l8.075-7.984c0.994-0.996,2.613-0.996,3.611,0.001C17,4.264,17,5.884,16.004,6.88l-8.075,7.984c-0.568,0.568-1.493,0.569-2.063-0.001c-0.569-0.569-0.569-1.495,0-2.064L9.93,8.828c0.145-0.141,0.376-0.139,0.517,0.005c0.141,0.144,0.139,0.375-0.006,0.516l-4.062,3.968c-0.282,0.282-0.282,0.745,0.003,1.03c0.285,0.284,0.747,0.284,1.032,0l8.074-7.985c0.711-0.71,0.711-1.868-0.002-2.579c-0.711-0.712-1.867-0.712-2.58,0l-8.074,7.984c-1.137,1.137-1.137,2.988,0.001,4.127c1.14,1.14,2.989,1.14,4.129,0l6.989-6.896c0.143-0.142,0.375-0.14,0.516,0.003c0.143,0.143,0.141,0.374-0.002,0.516l-6.988,6.895C8.054,17.836,5.743,17.836,4.317,16.411";
// const examplePathData = "M2.568,7.179H8.96c1.411,0,2.557-1.145,2.557-2.557c0-1.412-1.146-2.557-2.557-2.557H8.534c-0.235,0-0.426,0.19-0.426,0.426c0,0.236,0.191,0.426,0.426,0.426H8.96c0.941,0,1.704,0.763,1.704,1.705S9.901,6.327,8.96,6.327H2.568c-0.236,0-0.426,0.19-0.426,0.426C2.142,6.988,2.333,7.179,2.568,7.179 M15.778,7.179c0-0.941-0.763-1.704-1.704-1.704h-0.427c-0.235,0-0.426,0.19-0.426,0.426c0,0.235,0.19,0.426,0.426,0.426h0.427c0.47,0,0.852,0.382,0.852,0.852c0,0.471-0.382,0.853-0.852,0.853H0.864c-0.236,0-0.426,0.19-0.426,0.426c0,0.235,0.19,0.426,0.426,0.426h13.21C15.016,8.884,15.778,8.12,15.778,7.179 M16.631,9.736H2.568c-0.236,0-0.426,0.19-0.426,0.426c0,0.236,0.19,0.426,0.426,0.426h14.062c0.94,0,1.704,0.764,1.704,1.705s-0.764,1.704-1.704,1.704h-0.427c-0.235,0-0.426,0.19-0.426,0.427c0,0.235,0.19,0.426,0.426,0.426h0.427c1.411,0,2.557-1.145,2.557-2.557S18.042,9.736,16.631,9.736 M10.665,11.44H4.273c-0.236,0-0.426,0.19-0.426,0.426c0,0.236,0.19,0.427,0.426,0.427h6.392c1.412,0,2.557,1.145,2.557,2.557s-1.146,2.557-2.557,2.557h-0.426c-0.236,0-0.426,0.19-0.426,0.426s0.19,0.427,0.426,0.427h0.426c1.883,0,3.41-1.526,3.41-3.409S12.548,11.44,10.665,11.44";

const App = () => {
  const canvasRef = useRef(null);
  const [inputPathData, setInputPathData] = useState(examplePathData);
  const [pathData, setPathData] = useState(examplePathData);
  const [scale, setScale] = useState(1);
  const [selectedCommand, setSelectedCommand] = useState(null);
  const [highlightedCommand, setHighlightedCommand] = useState(null);
  const [
    isShowingEncodedPathCommands,
    setIsShowingEncodedPathCommands,
  ] = useState(true);

  const highlightCommand = i => setHighlightedCommand(i);
  const unhighlightCommand = () => setHighlightedCommand(null);
    const selectCommand = i => setSelectedCommand(i);
    const deselectCommand = () => setSelectedCommand(null);
  const updatePathData = newData => setPathData(newData);
  const getSliderValueFromScale = scale => {
    let sliderValue;
    if (scale >= 1) {
      sliderValue = scale - 1;
    } else {
      sliderValue = -1 / scale + 1; 
    }
    return sliderValue;
  };
  const getScaleFromSliderValue = value => {
    let scale;
    if (value < 0) {
      scale = -1 / (value - 1);
    } else {
      scale = Number(value) + 1;
    }
    return scale;
  }
  const handleSliderChange = e => setScale(getScaleFromSliderValue(e.target.value));
  const handleCommandTypeToggle = () => setIsShowingEncodedPathCommands(!isShowingEncodedPathCommands);

  return (
    <>
      <section className="hero is-primary">
        <div className="hero-body">
          <h1 className="title">SVG Path Shaper</h1>
        </div>
      </section>
      <section className="section">
        <div className="columns is-centered">
          <div className="column is-half">
            <article className="message is-primary">
              <div className="message-header">
                <p>Original</p>
              </div>
              <div className="message-body box">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    return setPathData(inputPathData);
                  }}
                >
                  <textarea
                    className="textarea"
                    placeholder="paste path data here"
                    value={inputPathData}
                    onChange={(e) => setInputPathData(e.target.value)}
                  />
                  <button type="submit" className="button is-primary">
                    Submit
                  </button>
                </form>
              </div>
            </article>
          </div>
          <div className="column is-half">
            <article className="message is-secondary">
              <div className="message-header">
                <p>Modified</p>
              </div>
              <div className="message-body box">
                <textarea
                  className="textarea"
                  value={new SVGPathData(pathData)
                    .scale(1 / scale, 1 / scale)
                    .encode()}
                  readOnly
                />
                <CopyToClipboard
                  className="button is-link"
                  text={new SVGPathData(pathData)
                    .scale(1 / scale, 1 / scale)
                    .encode()}
                  // onCopy={() => setCopied(true)}
                >
                  <span>Copy to clipboard</span>
                </CopyToClipboard>
              </div>
            </article>
          </div>
        </div>
      </section>

      {pathData && (
        <>
          <section className="section">
            <div className="columns">
              <div className="column is-half">
                <div>
                  <h2 className="title">Path commands</h2>
                </div>
                <div className="control subtitle">
                  <div>
                    <input
                      type="radio"
                      checked={isShowingEncodedPathCommands}
                      name="commandType"
                      onChange={handleCommandTypeToggle}
                      className="radio"
                    />{" "}
                    Encoded
                  </div>
                  <div>
                    <input
                      type="radio"
                      checked={!isShowingEncodedPathCommands}
                      name="commandType"
                      onChange={handleCommandTypeToggle}
                      className="radio"
                    />{" "}
                    Parsed (human-friendlier)
                  </div>
                </div>
              </div>
              <div className="column flex-end">
                <h3 className="subtitle">
                  Modify the path by clicking on a path command and preview
                  results below. If the path is not visible, try zooming in or out using the slider.
                </h3>
              </div>
            </div>

            <div className="columns is-centered vertical-container">
              <div className="column box list">
                <PathCommandsList
                  pathData={pathData}
                  selectedCommand={selectedCommand}
                  highlightedCommand={highlightedCommand}
                  onMouseOver={highlightCommand}
                  onMouseOut={unhighlightCommand}
                  onSave={updatePathData}
                  isShowingEncodedPathCommands={isShowingEncodedPathCommands}
                />
              </div>
              <div className="column box" ref={canvasRef}>
                <input
                  className="slider is-fullwidth is-small is-circle"
                  step="1"
                  min="-100"
                  max="100"
                  value={getSliderValueFromScale(scale)}
                  type="range"
                  onChange={handleSliderChange}
                />
                <SegmentedPath
                  data={pathData}
                  selectedCommand={selectedCommand}
                  highlightedCommand={highlightedCommand}
                  onMouseOver={highlightCommand}
                  onMouseOut={unhighlightCommand}
                  onClick={selectCommand}
                  scale={scale}
                />
                {/* <EditablePathWithPoints dimensions={dimensions} data={pathData} /> */}
              </div>
            </div>
          </section>
          <section className="section">
            <DiffViewer
              oldValue={new SVGPathData(inputPathData)
                .toAbs()
                .transform(SVGPathDataTransformer.ROUND(4))
                .encode()}
              newValue={new SVGPathData(pathData)
                .toAbs()
                .transform(SVGPathDataTransformer.ROUND(4))
                .encode()}
            />
          </section>
        </>
      )}

      <footer className="section">
        <div className="columns is-mobile is-centered">
          <div className="field is-grouped is-grouped-multiline">
            <div className="control">Monica Wojciechowska &copy; 2020</div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;

// https://codesandbox.io/s/mystifying-wozniak-g0wbm
