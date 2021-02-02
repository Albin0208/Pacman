//#region Spökets konstanter
const CHASE = "chase";
const SCATTER = "scatter";
const SCARED = "scared";
const EATEN = "eaten";
const CHASESPEED = 2;
const SCATTERSPEED = CHASESPEED;
const SCAREDSPEED = 1;
const EATENSPEED = 3;
const SCAREDCOLOR = "blue";
const GHOSTHOMEPOSITION = { x: 9, y: 9 };
const BLINKCOLOR = "white";
const BLINKTIME = 28;
const EATENCOLOR = "gray";

//#region Spökenas egenskaper

const BLINKYPROPERTIES = {
  scatterPos: { x: 16, y: 1 },
  startPos: { x: 9, y: 7 },
  color: "red",
};
const INKYPROPERTIES = {
  scatterPos: { x: 16, y: 19 },
  startPos: { x: 8, y: 9 },
  color: "aqua",
};
const PINKYPROPERTIES = {
  scatterPos: { x: 2, y: 1 },
  startPos: { x: 9, y: 9 },
  color: "pink",
};
const CLYDEPROPERTIES = {
  scatterPos: { x: 2, y: 19 },
  startPos: { x: 10, y: 9 },
  color: "orange",
};

//#endregion
//#endregion

//#region Pacman konstanter
const PACMANSPEED = 2;
const PACMANCOLOR = "yellow";
const PACMANSTARTPOS = { x: 9, y: 15 };

//#endregion

//#region Spelplans konstanter

const WALL = "wall";
const GATE = "gate";
const PATH = "path";
const GHOSTHOME = "ghostHome";
const VOID = "void";
const PACMANPOS = "pacmanPos";

//#endregion

//#region Mat konstanter

const POWERPILL = "powerPill";
const NORMAL = "normal";

//#endregion

//#region Övriga konstanter
const SCL = 30;
const COLS = 19;
const ROWS = 21;

//#endregion
