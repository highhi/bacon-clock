export default {
  simulate( el ) {
    const event = new Event( 'click' );
    el.dispatchEvent( event );
  }
};