
module.exports = function( coleman ) {

    return function( req, res ) {

        res.send( coleman.app.get( 'sockets-tmpl' ).render( {
            title: 'Coleman ♥ Sockets'
        }));
    }

}
