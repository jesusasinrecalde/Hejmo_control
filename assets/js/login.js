
var token;
var user;
var g_user;
var g_pass;
var Pwd;

window.onload = function() 
{
	 g_user=localStorage["hjm_usr"];
     g_pass=localStorage["hjm_pass"];
  
	
	if(g_user==null || g_pass==null)
	{
			
			$('#formulario').show();
	}
	else
	{
		user=g_user;
		Pwd=g_pass;
		ObtenerClave(g_user , g_pass);
	}
}

function clickRegister(obj)
{
	var tabla = null;
		 
	tabla = document.forms[0];
	user=tabla.elements[0].value;
	Pwd= hex_md5(tabla.elements[1].value).toLowerCase();
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
	token=datosREST.authorization;
	localStorage["hjm_usr"] = user;
	localStorage["hjm_pass"] = Pwd;
	g_user=user;
	g_pwd=Pwd;
	
	ObtenerConfiguracion(datosREST.authorization);
	
}

function ObtenerConfiguracion( _token )
{
	debugger;
	$.ajax({
	beforeSend: function(xhrObj){
		xhrObj.setRequestHeader("Content-Type","application/json");
        xhrObj.setRequestHeader("Accept","application/json");
        xhrObj.setRequestHeader("authorization",_token);
           	
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
	alert(datosREST);
	window.open ('tabla.html','_self',false);
	debugger; // se almacena en el sesion storage  y se redirecciona. 
	
}

function BorrarInformacion()
{
	var tabla = null;
		 
	tabla = document.forms[0];
	tabla.elements[0].value="";
	tabla.elements[1].value="";
	localStorage.removeItem("hjm_usr");
	localStorage.removeItem("hjm_pass");
	g_user="";
	g_pwd="";
	user="";
	Pwd="";
	
}