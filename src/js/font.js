import {Bacon} from 'baconjs';

const STRAGE_NAME = 'baconClockFont';

export default () => {
    let fonts = ['Roboto Mono', 'Source Code Pro', 'Cousine'];

    let nextBus = new Bacon.Bus;
    let prevBus = new Bacon.Bus;
    let hashBus = new Bacon.Bus;

    let hashProp = hashBus
        .map( loopOfNumber( fonts.length ) )
        .toProperty( localStorage.getItem( STRAGE_NAME ) | 0 || 0 );

    let nextEs  = hashProp.sampledBy( nextBus ).map( val => val + 1 );
    let prevtEs = hashProp.sampledBy( prevBus ).map( val => val - 1 );

    hashBus.plug( nextEs.merge( prevtEs ) );

    hashProp.onValue( number => {
        location.hash = number + 1;
        localStorage.setItem( STRAGE_NAME, number );
        document.body.style.fontFamily = fonts[number];
    });

    return {
        nextBus : nextBus,
        prevBus : prevBus
    };
}

function loopOfNumber( length ) {
    return ( number ) => {
        return number >= length ? 0 : number < 0 ? length - 1 : number;
    };
}