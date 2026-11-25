// The logo's dune on its own: the ridge stops before it climbs into the lotus stem,
// and settles into a second, lower dune instead, so the line rests on the ground.
import { art } from './logo-art';
const CUT = '1500.2 2056.5';
const i = art.ridge.indexOf(CUT);
export const duneRidge = art.ridge.slice(0, i + CUT.length) +
  'C1540 2030 1590 2006 1650 1999C1720 1992 1790 2014 1860 2046C1920 2074 1990 2094 2080 2104';
export const duneFold = art.dune;
// crests where a star can rest at night
export const duneCrests: [number, number][] = [[1056.8, 1986.6], [1650, 1999], [391.4, 2278.8]];
export const duneView = '340 1930 1790 400';
