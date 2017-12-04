window.onload = function() 
{

	debugger;
	if(sessionStorage.getItem('configuracion')==null)
	{
		// se redirige a la pantalla de login directamente 
		window.open ('login.html','_self',false);
	}
	else
	{
		global_conf=$.parseJSON(sessionStorage.getItem('configuracion'));
		if(global_conf.data.apikey!=null && global_conf.data.device !=null)
		{
			g_key=global_conf.data.apikey;
			g_device=global_conf.data.device ;
			LanzamientoMapa();
		}
		else
		{
			
			localStorage.removeItem("hjm_usr");
			localStorage.removeItem("hjm_pass");
			sessionStorage.removeItem("configuracion");
			window.open ('login.html','_self',false);
		}
	}

}// window.onload


function LanzamientoMapa()
{
	if(sessionStorage.getItem('NombreInstalacion')!=null)
	{
		document.getElementById("NombreInstalacion").innerHTML=sessionStorage.getItem('NombreInstalacion');
	}
	initGoogleMaps();
	
	
}


function initGoogleMaps(){
       // var myLatlng = new google.maps.LatLng(40.748817, -73.985428);
	   
		 var myLatlng = new google.maps.LatLng( 41.606710, -0.930054/*41.666648,-0.820828*/);
	   var mapOptions = {
          zoom: 19,
          center: myLatlng,
          scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
           mapTypeId: google.maps.MapTypeId.HYBRID,
		  styles: [{"featureType":"water","stylers":[{"saturation":43},{"lightness":-11},{"hue":"#0088ff"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":99}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},{"lightness":54}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ece2d9"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},{"featureType":"poi.park","stylers":[{"visibility":"on"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"simplified"}]}]

        }
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            title: sessionStorage.getItem('NombreInstalacion')
        });

        // To add the marker to the map, call setMap();
        marker.setMap(map);
    }