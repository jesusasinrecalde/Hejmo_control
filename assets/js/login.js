
var token;
var user;
var g_user;
var g_pass;
var g_instalacion;
var Pwd;
var instalacion;

window.onload = function() 
{
	 g_user=localStorage["hjm_usr"];
     g_pass=localStorage["hjm_pass"];
	 g_instalacion=localStorage["hjm_instalacion"];
	
	if(g_user==null || g_pass==null ||g_instalacion == null)
	{
			
			$('#formulario').show();
	}
	else
	{
		user=g_user;
		Pwd=g_pass;
		instalacion=g_instalacion;
		ObtenerClave(g_user , g_pass);
	}
}

function clickRegister(obj)
{
	var tabla = null;
		 
	tabla = document.forms[0];
	user=tabla.elements[0].value;
	Pwd= hex_md5(tabla.elements[1].value).toLowerCase();
	instalacion=tabla.elements[2].value;
	ObtenerClave(tabla.elements[0].value,
				 hex_md5(tabla.elements[1].value).toLowerCase());
}

function ObtenerClave(usr , pwd)
{
	debugger;
	$.ajax({
	beforeSend: function(xhrObj){
		xhrObj.setRequestHeader("Content-Type","application/json");
        xhrObj.setRequestHeader("Accept","application/json");
        xhrObj.setRequestHeader("pwd",pwd);
           	
		},
    type : "GET",
    url: "http://shrouded-reef-92089.herokuapp.com/api/usr/"+usr,
	//url: "http://localhost:8080/api/usr/"+usr,
    success: recepcionServicioToken,
    error : falloServicioToken
	});
	

}



function falloServicioToken (jqXHR, status)
{
	debugger;
	BorrarInformacion();
	$('#formulario').show();
	
	
}
function  recepcionServicioToken (datosREST)
{
debugger;
	token=datosREST.Authorization;
	localStorage["hjm_usr"] = user;
	localStorage["hjm_pass"] = Pwd;
	localStorage["hjm_instalacion"]=instalacion;
	g_user=user;
	g_pwd=Pwd;
	
	ObtenerConfiguracion(datosREST.Authorization);
	
}

function ObtenerConfiguracion( _token )
{
	debugger;
	$.ajax({
	beforeSend: function(xhrObj){
		xhrObj.setRequestHeader("Content-Type","application/json");
		xhrObj.setRequestHeader("Accept","application/json");
		xhrObj.setRequestHeader("Authorization",_token);
           	
		},
    type : "GET",
    url: "http://shrouded-reef-92089.herokuapp.com/api/config/"+user,
	//url: "http://localhost:8080/api/config/"+user,
    success: recepcionServicioConfiguracion,
    error : falloServicioConfiguracion
	});
}

function falloServicioConfiguracion (jqXHR, status)
{
	debugger;
	BorrarInformacion();
	$('#formulario').show();
}
function  recepcionServicioConfiguracion (datosREST)
{
	
	sessionStorage.setItem('configuracion', JSON.stringify(datosREST));
	ObtenerInstalacion(instalacion);
	//window.open ('tabla.html','_self',false);
	//debugger; // se almacena en el sesion storage  y se redirecciona. 
	
}


function ObtenerInstalacion(instalacion)
{
	$.ajax({
		beforeSend: function(xhrObj){
			xhrObj.setRequestHeader("Content-Type","application/json");
			xhrObj.setRequestHeader("Accept","application/json");
			xhrObj.setRequestHeader("Authorization",token);
				   
			},
		type : "GET",
		url: "http://shrouded-reef-92089.herokuapp.com/api/instalacion/"+instalacion,
		//url: "http://localhost:8080/api/instalacion/"+instalacion,
		success: recepcionServicioInstalacion,
		error : falloServicioInstalacion
		});

}

function  recepcionServicioInstalacion (datosREST)
{
	
	sessionStorage.setItem('instalacion', JSON.stringify(datosREST));
	window.open ('tabla.html','_self',false);
	//debugger; // se almacena en el sesion storage  y se redirecciona. 
	
}

function falloServicioInstalacion (jqXHR, status)
{
	debugger;
	BorrarInformacion();
	$('#formulario').show();
}

function BorrarInformacion()
{
	var tabla = null;
		 
	tabla = document.forms[0];
	tabla.elements[0].value="";
	tabla.elements[1].value="";
	localStorage.removeItem("hjm_usr");
	localStorage.removeItem("hjm_pass");
	localStorage.removeItem("hjm_instalacion");
	g_user="";
	g_pwd="";
	g_instalacion="";
	user="";
	Pwd="";
	instalacion="";
	
}