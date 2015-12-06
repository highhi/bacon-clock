import {Bacon} from 'baconjs';

export default ( timeEl, colorEl ) => {
    let date    = new Date();
    let hour    = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    let hourBus = new Bacon.Bus;
    let minutesBus = new Bacon.Bus;

    let secondsProp = Bacon.interval( 1000, 1 ).scan( seconds, countNumberOfSeconds );
    let minutesProp = secondsProp
        .sampledBy( minutesBus )
        .filter( carry )
        .scan( minutes, countNumberOfMinutes );
    let hourProp = minutesProp
        .sampledBy( hourBus )
        .filter( carry )
        .scan( hour, countNumberOfHour );
    let totalEs = Bacon.combineAsArray( hourProp, minutesProp, secondsProp );

    minutesBus.plug( secondsProp );
    hourBus.plug( minutesProp );

    totalEs.onValue( ( data ) => {
        let hour    = shapeTime( data[0] );
        let minutes = shapeTime( data[1] );
        let seconds = shapeTime( data[2] );

        timeEl.textContent = `${ hour }:${ minutes }:${ seconds }`;
        colorEl.textContent = `#${ hour }${ minutes }${ seconds }`;
        document.body.style.backgroundColor = `#${ hour }${ minutes }${ seconds }`;
    });

}

function countNumberOfSeconds( current, number ) {
    let total = current + number;
    return total >= 60 ? 0 : total;
}

function countNumberOfMinutes( current ) {
    let total = current + 1;
    return total >= 60 ? 0 : total;
}

function countNumberOfHour( current ) {
    let total = current + 1;
    return total >= 24 ? 0 : total;
}

function carry( number ) {
    return number === 0;
}

function shapeTime( time ) {
    return ( ( '0' + time ).slice( -2 ) );
}