import React from 'react';
import ReactDiffViewer from "react-diff-viewer";

const DiffViewer = ({ oldValue, newValue }) => {
  return (
    <ReactDiffViewer oldValue={oldValue} newValue={newValue} splitView={true} />
  );
};

export default DiffViewer;