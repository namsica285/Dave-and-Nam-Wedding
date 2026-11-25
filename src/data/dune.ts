// The logo's dune on its own: the ridge stops before it climbs into the lotus stem,
// and settles into a second, lower dune instead, so the line rests on the ground.
import { art } from './logo-art';
// The left run-off is half as long as in the logo: both lines start just before the slope steepens.
// Like the logo, the two lines meet in one fine point where the run-off ends.
// duneRun / duneFoldRun are cut from the smoothed ridge and fold in scripts/smooth-logo-art.py.
const TIP = 'M640 2200';
export const duneRidge = TIP + 'C655 2183 670 2166 ' + art.duneRun.slice(1) +
  'C1540 2030 1590 2006 1650 1999C1720 1992 1790 2014 1860 2046C1920 2074 1990 2094 2080 2104';
export const duneFold = TIP + 'C656 2194 672 2186 ' + art.duneFoldRun.slice(1);
// crests where a star can rest at night
export const duneCrests: [number, number][] = [[1056.8, 1986.6], [1650, 1999], [640, 2200]];
export const duneView = '600 1930 1530 300';
