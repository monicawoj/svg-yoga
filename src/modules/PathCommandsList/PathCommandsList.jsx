import React, { useState, useEffect } from "react";
import { encodeSVGPath } from "svg-pathdata";
import EasyEdit, { Types } from "react-easy-edit";
import { getPathCommands, getEncodedPathCommands, getPathCommandType } from 'utils';

import './styles.scss';
import "App.scss";

const PathCommandsList = ({ pathData, selectedCommand, highlightedCommand, onMouseOver, onMouseOut, onSave, isShowingEncodedPathCommands }) => {    
    const [pathCommands, setPathCommands] = useState(getPathCommands(pathData));
    const [encodedPathCommands, setEncodedPathCommands] = useState(getEncodedPathCommands(pathData));

    const refs = pathCommands.reduce((acc, value, i) => {
    acc[i] = React.createRef();
    return acc;
  }, {});

    useEffect(() => { 
        if (
          highlightedCommand &&
          refs[highlightedCommand].current
        ) {
          refs[highlightedCommand].current.scrollIntoViewIfNeeded({
            behavior: "smooth",
              block: "start",
              inline: "nearest"
          });
        }
        
    }, [highlightedCommand, refs]);

    

    const handleSaveCommandEdit = ({ index, value, key }) => {
        let newPathData;
        if (key) {
            const newCommands = pathCommands.map((command, i) => {
                if (i === index) {
                    return { ...command, [key]: value }
                } else {
                    return command;
                }
            });
            setPathCommands(newCommands);
            newPathData = encodeSVGPath(newCommands);
        } else {
            const newCommands = encodedPathCommands.map((command, i) => {
                if (i === index) {
                    return value;
                } else {
                    return command;
                }
            });
            setEncodedPathCommands(newCommands);
            newPathData = newCommands.join('');
        }
        return onSave(newPathData);
    };

  return (
      <div>
        {isShowingEncodedPathCommands
          ? encodedPathCommands.map((command, i) => {
              return (
                <div
                  key={i}
                  className="board-item"
                  onMouseOver={() => onMouseOver(i)}
                  onMouseOut={onMouseOut}
                  ref={refs[i]}
                >
                  <div
                    className={`board-item-content ${
                      i === selectedCommand
                        ? "is-selected"
                        : i === highlightedCommand
                        ? "is-highlighted"
                        : ""
                    }`}
                  >
                    <EasyEdit
                      type={Types.TEXT}
                      onSave={(value) =>
                        handleSaveCommandEdit({ value, index: i })
                      }
                      saveButtonLabel="Save"
                      cancelButtonLabel="Cancel"
                      attributes={{ id: i }}
                      value={command}
                    />
                  </div>
                </div>
              );
            })
          : pathCommands.map((command, i) => {
              return (
                <div
                  key={i}
                  className="board-item"
                  onMouseOver={() => onMouseOver(i)}
                  onMouseOut={onMouseOut}
                  ref={refs[i]}
                >
                  <div
                    className={`board-item-content ${
                      i === selectedCommand
                        ? "is-selected"
                        : i === highlightedCommand
                        ? "is-highlighted"
                        : ""
                    }`}
                  >
                    <p>{getPathCommandType(command.type)}</p>
                    {Object.entries(command)
                      .filter(
                        (entry) =>
                          entry[0] !== "type" && entry[0] !== "relative"
                      )
                      .map((entry) => (
                        <>
                          <p key={`${entry[0]}-${entry[1]}`}>{entry[0]}</p>
                          <EasyEdit
                            type={Types.TEXT}
                            onSave={(value) =>
                              handleSaveCommandEdit({
                                key: entry[0],
                                value,
                                index: i,
                              })
                            }
                            saveButtonLabel="Save"
                            cancelButtonLabel="Cancel"
                            attributes={{
                              id: `input-${entry[0]}-${entry[1]}`,
                            }}
                            value={entry[1]}
                          />
                        </>
                      ))}
                  </div>
                </div>
              );
            })}
      </div>
  );
};

export default PathCommandsList;