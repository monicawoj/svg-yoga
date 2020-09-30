import { SVGPathData, encodeSVGPath, SVGPathDataTransformer } from "svg-pathdata";

export const getScaledPathData = (d, scale) => new SVGPathData(d)
    .toAbs()
    .scale(scale, scale)
    .encode();

export const pathCommandTypes = {
  CLOSE_PATH: "CLOSE_PATH",
  MOVE_TO: "MOVE_TO",
  HORIZ_LINE_TO: "HORIZ_LINE_TO",
  VERT_LINE_TO: "VERT_LINE_TO",
  LINE_TO: "LINE_TO",
  CURVE_TO: "CURVE_TO",
  SMOOTH_CURVE_TO: "SMOOTH_CURVE_TO",
  QUAD_TO: "QUAD_TO",
  SMOOTH_QUAD_TO: "SMOOTH_QUAD_TO",
  ARC: "ARC",
};

const {
  CLOSE_PATH,
  MOVE_TO,
  HORIZ_LINE_TO,
  VERT_LINE_TO,
  LINE_TO,
  CURVE_TO,
  SMOOTH_CURVE_TO,
  QUAD_TO,
  SMOOTH_QUAD_TO,
  ARC,
} = pathCommandTypes;

export const getPathCommandType = (number) => {
  switch (number) {
    case 1:
      return CLOSE_PATH;
    case 2:
      return MOVE_TO;
    case 4:
      return HORIZ_LINE_TO;
    case 8:
      return VERT_LINE_TO;
    case 16:
      return LINE_TO;
    case 32:
      return CURVE_TO;
    case 64:
      return SMOOTH_CURVE_TO;
    case 128:
      return QUAD_TO;
    case 256:
      return SMOOTH_QUAD_TO;
    case 512:
      return ARC;
    default:
      console.log(number);
      throw new Error("the given path command type is not recognized");
  }
};

export const getPathCommands = pathData =>
    new SVGPathData(pathData).toAbs().transform(SVGPathDataTransformer.ROUND(4)).commands;

export const getEncodedPathCommands = (pathData) =>
  new SVGPathData(pathData)
    .toAbs()
    .transform(SVGPathDataTransformer.ROUND(4))
    .commands.map((command) => encodeSVGPath(command));

  const L_TO_C = () => {
    return SVGPathDataTransformer.INFO((command, prevX, prevY) => {
      if (command.type & SVGPathData.LINE_TO) {
        command.type = SVGPathData.CURVE_TO;
        command.x1 = (Number(command.x) + Number(prevX)) / 2;
        command.y1 = (command.y + prevY) / 2;
        command.x2 = (command.x + prevX) / 2;
        command.y2 = (command.y + prevY) / 2;
      }
      return command;
    });
  };

export const WITH_PREV_POINT = () => {
  return SVGPathDataTransformer.INFO((command, prevX, prevY) => {
    command.prevX = prevX;
    command.prevY = prevY;
    return command;
  });
};

export const getPathCommandsWithPreviousPoint = pathData => new SVGPathData(pathData).transform(WITH_PREV_POINT()).commands;

export const getPathCommandsAsCubicCurves = (pathData) => {
  // NORMALIZE_HVZ() = Convert H, V, Z and A with rX = 0 to L
  // L_TO_C() - create my own transform function that converts L to C where C1 = C2 = midpoint of L points
  // NORMALIZE_ST() - Transforms smooth curves and quads to normal curves and quads (SsTt to CcQq)
  // A_TO_C() - Convert arc commands to curve commands
  // QT_TO_C() - A quadratic bézier curve can be represented by a cubic bézier curve which has the same end points as the quadratic and both control points in place of the quadratic"s one.
  // This transformer replaces QqTt commands with Cc commands respectively
  return new SVGPathData(pathData)
    .toAbs()
    .transform(SVGPathDataTransformer.NORMALIZE_HVZ())
    .transform(L_TO_C())
    .transform(SVGPathDataTransformer.NORMALIZE_ST())
    .transform(SVGPathDataTransformer.A_TO_C())
    .transform(SVGPathDataTransformer.QT_TO_C())
    .encode();
};

export const getRoundedAbsolutePathData = pathData => new SVGPathData(pathData)
  .toAbs()
  .transform(SVGPathDataTransformer.ROUND(4))
  .encode();

export const getFromBetween = {
    results: [],
    string: "",
    getFromBetween: function (sub1, sub2) {
        if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
        var SP = this.string.indexOf(sub1) + sub1.length;
        var string1 = this.string.substr(0, SP);
        var string2 = this.string.substr(SP);
        var TP = string1.length + string2.indexOf(sub2);
        return this.string.substring(SP, TP);
    },
    removeFromBetween: function (sub1, sub2) {
        if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
        var removal = sub1 + this.getFromBetween(sub1, sub2) + sub2;
        this.string = this.string.replace(removal, "");
    },
    getAllResults: function (sub1, sub2) {
        // first check to see if we do have both substrings
        if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return;

        // find one result
        var result = this.getFromBetween(sub1, sub2);
        // push it to the results array
        this.results.push(result);
        // remove the most recently found one from the string
        this.removeFromBetween(sub1, sub2);

        // if there's more substrings
        if (this.string.indexOf(sub1) > -1 && this.string.indexOf(sub2) > -1) {
            this.getAllResults(sub1, sub2);
        }
        else return;
    },
    get: function (string, sub1, sub2) {
        this.results = [];
        this.string = string;
        this.getAllResults(sub1, sub2);
        return this.results;
    }
};

