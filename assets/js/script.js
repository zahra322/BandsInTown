$( document ).ready( function () {
    const baseURL = "https://rest.bandsintown.com";
    const appId = "abc";

    $( ".btn" ).on( "click", () => {
        const artistName = $( "#artist-name" ).val().trim();
        
        if ( !isEmpty( artistName ) ) 
            getArtistInformation( artistName );
    });

    //For pressing 'enter' instead of button click
    $( "#artist-name" ).on( "keypress", ( event ) => {
        if ( event.which == 13 ) 
        {
            const artistName = $( "#artist-name" ).val().trim();
            if ( !isEmpty( artistName ) )
                getArtistInformation( artistName );
        }
    });

    //When searching for emmpty string
    function isEmpty( artistName ) {
        if ( artistName == "" ) {
            alert( "Artist Name should not empty" );
            return true;
        }
        else
            return false;
    }

    //Fetching artist information through an AJAX call
    function getArtistInformation( artistName ) {
        $.getJSON( {
            url: baseURL + "/artists/" + encodeURIComponent( artistName )+ "?app_id=" + appId,
            success: ( artist, status ) => {
                if ( status == 'success' && artist && !artist.error )
                    displayArtistInformation( artist, artistName );
                else 
                    clearTableAndShowAlert();
            }
        } ).fail( () => {
            clearTableAndShowAlert();
        } )
    }

    //Displaying the fetched artist information 
    function displayArtistInformation( artist, artistName ) {
        var body = "<tr><td><h2>Artist Details</h2></td></tr>" +
            "<tr><td id='artist-details'><img id='artist-thumbnail' src=" + artist.thumb_url + ">"+
            "<div id='artist-info'><span>Name: </span>" + artist.name;

        if ( artist.links ) {
            artist.links.forEach( ( link ) => {
                if ( link.type == 'facebook' )
                    body += "<br><span>Facebook URL: </span><a href=" + link.url + ">" + link.url + "</a></div></td></tr>";
            } );
        }

        //Button for showing artist events upon click 
        body += "<tr><td id='event-list'><input type='button' class='btn' value='Artist Events'></td></tr>";

        $( "#img-div" ).html( "<img id='artist-img' src=" + artist.image_url + ">" );
        $( "#details-and-events-table" ).html( body );

        //Handling button click for artist events
        $( "#event-list .btn" ).on( "click", () => {
            $.getJSON({
                url: baseURL + "/artists/" + encodeURIComponent( artistName ) + "/events?app_id=" + appId,
                success: ( events ) => {
                    if ( events.length != 0 ) 
                        displayEvents( events );
                    else 
                        $( "#event-list" ).html( "This artist has no Events" );
                }
            } ).fail( () => {
                $( "#event-list" ).html( "This artist has no Events" );
            } )
        } );
    }

    //Displaying fetched artist events
    function displayEvents( events ) {
        var body = "<h2>" + events.length + " upcoming events</h2>";
        
        events.forEach( ( event, index ) => {
            body += "<ul><span> EVENT DETAILS</span><hr><li>Venue: " + event.venue.name + "</li>" +
                "<li>City: " + event.venue.city + "</li>" +
                "<li>Country: " + event.venue.country + "</li>" +
                "<li>Date: " + moment( event.datetime, 'YYYY-MM-DD' ).format( "YYYY-MM-DD" ) + "</li>" +
                "</ul>";
        } );
        $( "#event-list" ).html( body );
    }

    function clearTableAndShowAlert()
    {
        $( "#img-div" ).empty();
        $( "#details-and-events-table" ).empty();
        alert( "No such Artist Found" );
    }
});




