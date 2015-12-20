import {Bacon} from 'baconjs';

const STRAGE_NAME = 'baconClockFont';

export default ( fonts = ['Arial'] ) => {
  
  const nextBus = new Bacon.Bus;
  const prevBus = new Bacon.Bus;
  const hashBus = new Bacon.Bus;

  const hashProp = hashBus
    .map( loopOfNumber( fonts.length ) )
    .toProperty( localStorage.getItem( STRAGE_NAME ) | 0 || 0 );

  const nextEs = hashProp.sampledBy( nextBus ).map( val => val + 1 );
  const prevEs = hashProp.sampledBy( prevBus ).map( val => val - 1 );

  hashBus.plug( nextEs.merge( prevEs ) );

  hashProp.onValue( number => {
    location.hash = number + 1;
    localStorage.setItem( STRAGE_NAME, number );
    document.body.style.fontFamily = fonts[number];
  });

  return {
    nextBus  : nextBus,
    prevBus  : prevBus,
    hashProp : hashProp
  };
}

function loopOfNumber( length ) {
  return ( number ) => {
    let result = number;
    if ( number >= length ) {
      result = 0;
    } else if ( number < 0 ) {
      result = length - 1;
    }
    return result;
  };
}