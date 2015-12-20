import assert from "power-assert"
import timer from '../src/js/timer';

describe( 'timer', () => {

  it( 'totalEs', () => {
    const el1 = document.createComment( 'div' );
    const el2 = document.createComment( 'div' );
    const testTime = {
      getHours() {
        return 23;
      },
      getMinutes() {
        return 59
      },
      getSeconds() {
        return 59
      }
    };
    timer( el1, el2, testTime ).totalEs.onValue( ( data ) => {
      const [ hour, minutes, seconds ] = data;
      setTimeout( () => {
        assert( `${ hour }${ minutes }${ seconds }` === '000000' );
      }, 1000 );
    });
  });

});