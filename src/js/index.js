import {Bacon} from 'baconjs';
import font from './font';
import timer from './timer';
import util from './util';

const IDENT_TIME  = 'time';
const IDENT_COLOR = 'color';
const IDENT_BOARD = 'board';
const IDENT_NEXT  = 'next';
const IDENT_PREV  = 'prev';

const ICON_ARROW_LEFT  = 'fa fa-chevron-left';
const ICON_ARROW_RIGHT = 'fa fa-chevron-right';

const FONTS = [ '"Roboto Mono"', '"Source Code Pro"', '"Cousine"' ];

document.body.insertAdjacentHTML( 'beforeend', `
  <div id="${ IDENT_BOARD }">
    <div id="${ IDENT_TIME }"></div>
    <div id="${ IDENT_COLOR }"></div>
  </div>
  <div id="${ IDENT_NEXT }"><i class="${ ICON_ARROW_RIGHT }"></i></div>
  <div id="${ IDENT_PREV }"><i class="${ ICON_ARROW_LEFT }"></i></div>
` );

timer( util.getById( IDENT_TIME ), util.getById( IDENT_COLOR ) );

const fontControl = font( FONTS );
fontControl.prevBus.plug( Bacon.fromEvent( util.getById( IDENT_PREV ), 'click' ) );
fontControl.nextBus.plug( Bacon.fromEvent( util.getById( IDENT_NEXT ), 'click' ) );