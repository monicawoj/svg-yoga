import { SVGPathData, encodeSVGPath, SVGPathDataTransformer } from "svg-pathdata";

export const getScaledPathData = (d, scale = 1) => new SVGPathData(d)
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

