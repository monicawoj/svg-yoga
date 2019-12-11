export const pathCommandTypes = {
  CLOSE_PATH: 'CLOSE_PATH',
  MOVE_TO: 'MOVE_TO',
  HORIZ_LINE_TO: 'HORIZ_LINE_TO',
  VERT_LINE_TO: 'VERT_LINE_TO',
  LINE_TO: 'LINE_TO',
  CURVE_TO: 'CURVE_TO',
  SMOOTH_CURVE_TO: 'SMOOTH_CURVE_TO',
  QUAD_TO: 'QUAD_TO',
  SMOOTH_QUAD_TO: 'SMOOTH_QUAD_TO',
  ARC: 'ARC',
};

const { CLOSE_PATH, MOVE_TO, HORIZ_LINE_TO, VERT_LINE_TO, LINE_TO, CURVE_TO, SMOOTH_CURVE_TO, QUAD_TO, SMOOTH_QUAD_TO, ARC} = pathCommandTypes;

export const getPathCommandType = number => {
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
    throw new Error('the given path command type is not recognized');
  }
}