import assert from "power-assert"
import {Bacon} from 'baconjs';
import font from '../src/js/font';
import click from './lib/click-event';

describe( 'font', () => {

  localStorage.clear();

  const FONTS = [ 'Roboto Mono', 'Source Code Pro', 'Cousine' ];
  const fontControl = font( FONTS );

  it( '[prev on click]', () => {
    const prevEl = document.createElement( 'div' );
    fontControl.prevBus.plug( Bacon.fromEvent( prevEl, 'click' ) );
    click.simulate( prevEl );
    fontControl.hashProp.onValue( number => {
      assert( document.body.style.fontFamily === 'Cousine' );
    });
  });

  it( '[next on click]', () => {
    const nextEl = document.createElement( 'div' );
    fontControl.nextBus.plug( Bacon.fromEvent( nextEl, 'click' ) );
    click.simulate( nextEl );
    fontControl.hashProp.onValue( number => {
      assert( document.body.style.fontFamily === 'Source Code Pro' );
    });
  });

});