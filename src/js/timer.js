import {Bacon} from 'baconjs';

export default ( timeEl, colorEl, date = new Date() ) => {
  const hour    = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const hourBus    = new Bacon.Bus;
  const minutesBus = new Bacon.Bus;

  const secondsProp = Bacon.interval( 1000, 1 ).scan( seconds, countNumberOfSeconds );
  const minutesProp = secondsProp
    .sampledBy( minutesBus )
    .filter( carry )
    .scan( minutes, countNumberOfMinutes );
  const hourProp = minutesProp
    .sampledBy( hourBus )
    .filter( carry )
    .scan( hour, countNumberOfHour );
  const totalEs = Bacon.combineAsArray( hourProp, minutesProp, secondsProp ).map( shapeNumbers );

  minutesBus.plug( secondsProp );
  hourBus.plug( minutesProp );

  totalEs.onValue( ( data ) => {
    const [ hour, minutes, seconds ] = data;

    timeEl.textContent  = `${ hour }:${ minutes }:${ seconds }`;
    colorEl.textContent = `#${ hour }${ minutes }${ seconds }`;
    document.body.style.backgroundColor = `#${ hour }${ minutes }${ seconds }`;
  });

  return {
    totalEs : totalEs
  };
}

function countNumberOfSeconds( current, number ) {
  const total = current + number;
  return total >= 60 ? 0 : total;
}

function countNumberOfMinutes( current ) {
  const total = current + 1;
  return total >= 60 ? 0 : total;
}

function countNumberOfHour( current ) {
  const total = current + 1;
  return total >= 24 ? 0 : total;
}

function carry( number ) {
  return number === 0;
}

function shapeNumbers( numbers ) {
  return numbers.map( number => {
    return ( '0' + number ).slice( -2 );
  }); 
}