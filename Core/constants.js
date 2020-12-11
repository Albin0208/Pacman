/* Spökets konstanter */
const CHASE = "chase";
const SCATTER = "scatter";
const SCARED = "scared";
const EATEN = "eaten";
const CHASESPEED = 2;
const SCATTERSPEED = CHASESPEED;
const SCAREDSPEED = 1;
const EATENSPEED = 3;

const BLINKYPROPERTIES = {
  scatterPos: { x: 1, y: 19 },
  startPos: { x: 9, y: 7 },
  color: "red",
};
const INKYPROPERTIES = {
  scatterPos: { x: 17, y: 19 },
  startPos: { x: 8, y: 9 },
  color: "aqua",
};
const PINKYPROPERTIES = {
  scatterPos: { x: 1, y: 1 },
  startPos: { x: 9, y: 9 },
  color: "pink",
};
const CLYDEPROPERTIES = {
  scatterPos: { x: 17, y: 1 },
  startPos: { x: 10, y: 9 },
  color: "orange",
};

/* Pacman konstanter */
const PACMANSPEED = 2;

/* Spelplans konstanter */
const WALL = "wall";
const GATE = "gate";
const PATH = "path";
const GHOSTHOME = "ghostHome";
const VOID = "void";
const PACMANPOS = "pacmanPos";

/* Mat konstanter */
const POWERPILL = "powerPill";
const NORMAL = "normal";

/* Övriga konstanter */
const SCL = 30;
const COLS = 19;
const ROWS = 21;
