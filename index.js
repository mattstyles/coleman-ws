/**
 * Coleman-face.
 * The public face of Coleman.
 * Copyright © 2014 Matt Styles <matt@veryfizzyjelly.com>
 * Licensed under the ISC license
 * ---
 *
 */

var fs = require( 'fs' ),
    path = require( 'path' ),

    hogan = require( 'hogan.js' );


module.exports = function( app ) {

    var coleman = app || null,
        id = 'coleman-face';

    // Pre-compile index page
    coleman.app.set( 'sockets-tmpl', hogan.compile(
        fs.readFileSync( path.join( __dirname, './lib/views/index.hjs' ), {
            encoding: 'utf8'
        })
    ));


    /**
     * Main module object
     */
    return {
        /**
         * Builds this module in to the correct place
         */
        init: function() {

            // Register with coleman
            coleman.register( this );

            // Report any clashes with existing files/folders here

        },


        /**
         * Adds a directory to the static serving express module
         */
        static: function() {

            coleman.addStaticPath( path.resolve( __dirname, './public') );
        },


        /**
         * The router for this module
         * ---
         * Called to initialise any routes in the correct place
         */
        router: function() {

            coleman.app.get( '/ws', require( './lib/routes' )( coleman ) );
        },


        /**
         * Returns the id for the core coleman module
         */
        getID: function() {
            return id;
        }
    };
};
