var tabla_valores;
var actualizar_datos; // flag para indicar si hay datos modificados o no
var timer_actualizar_datos; // temporizador utilizado para realizar el parpadeo en el caso que actualizar_datos sea true
var Tem1;
var tabla_objetos;
var tabla_datos_tres_horas;
var timer_interval_modo;
var timer_interval_lectura_datos;
var IdObjetoGlobal; // variable usada para pasar el IdObjeto atraves de funciones callback

var g_key;
var g_device;
var global_conf;
var contadorElementos;
var global_elementos;
// Variables de control de visualizacion de errores 
var NumeroErroresFaldon;

window.onload = function() 
{

	InicializaVisError();
	
	if(sessionStorage.getItem('configuracion')==null)
	{
		// se redirige a la pantalla de login directamente 
		window.open ('login.html','_self',false);
	}
	else
	{
		debugger;
		global_conf=$.parseJSON(sessionStorage.getItem('configuracion'));
		global_elementos=$.parseJSON(sessionStorage.getItem('instalacion'));
		if(global_conf.apikey!=null && global_conf.device !=null && global_elementos != null)
		{
			//g_key=global_conf.apikey;
			//g_device=global_conf.device ;
			g_key=global_elementos.apikey;
			g_device=global_elementos.device ;
					
			LanzamientoHejmo();
		}
		else
		{
			
			localStorage.removeItem("hjm_usr");
			localStorage.removeItem("hjm_pass");
			localStorage.removeItem("hjm_instalacion");
			sessionStorage.removeItem("configuracion");
			sessionStorage.removeItem("instalacion");
			window.open ('login.html','_self',false);
		}
	}

}// window.onload

function LanzamientoHejmo()
{

	if(tabla_objetos==null)
	{
		tabla_valores = new Array();
		tabla_objetos = new Array();
		tabla_datos_tres_horas = new Array();
		
	}
	// solo se monstrara el mensaje de bienvenida la primera vez que se entra 
	if(sessionStorage.getItem('NombreInstalacion')==null)
	{
		var bienvenidaMsg;
		if(global_conf.name!=null)
		{
			bienvenidaMsg="Bienvenido " +global_conf.name+" a <b>Hejmo</b> - sistema de control a distancia de dispositivos."
		}
		else
		{
			bienvenidaMsg="Bienvenido a <b>Hejmo</b> - sistema de control a distancia de dispositivos.";
		}
		$.notify({
				icon: 'pe-7s-gift',
			message: bienvenidaMsg

				},{
					type: 'info',
					timer: 3000
		});
	}

	if(tabla_objetos.length==0) // si no se ha creadoobjetos entonces creamos y los metemos en la tabla 
	{
		debugger;
		CreacionElementos_new(global_elementos.ELEM);
			
	}
	
	llamarServicioDatosDispositivo(); // obtener datos del dispositivo

	


}// LanzamientoHejmo


function llamarServicioCarriotsPrimeravez()
{
	

	var carriotsURL = 'http://api.carriots.com/devices/'+g_device+'/streams/?order=-1&max=30';
		
	
	$("#loading").removeClass('hide'); 
	$.ajax({
	beforeSend: function(xhrObj){
        xhrObj.setRequestHeader("Content-Type","application/json");
        xhrObj.setRequestHeader("Accept","application/json");
        xhrObj.setRequestHeader("carriots.apikey",g_key);
        

		},
    type : "GET",
    url: carriotsURL,
    success: recepcionServicioRESTPrimeravez,
    error : function(jqXHR, status) { 
		MostrarErrorFaldon("GENERAL_LEC1","Fallo en la lectura del los datos de dispositivos");
		$("#loading").addClass('hide');
	}
});
}

function llamarServicioDatosDispositivo()
{
	

	var carriotsURL = 'http://api.carriots.com/devices/'+g_device;
	

	$.ajax({
	beforeSend: function(xhrObj){
        xhrObj.setRequestHeader("Content-Type","application/json");
        xhrObj.setRequestHeader("Accept","application/json");
        xhrObj.setRequestHeader("carriots.apikey",g_key);
        

		},
    type : "GET",
    url: carriotsURL,
    success: recepcionDatosDispositivo,
    error : function(jqXHR, status) { 
	
	    MostrarErrorFaldon("GENERAL_INF","Fallo en la lectura del los datos de inf. dispositivo");
		$("#loading").addClass('hide'); 
	}
});
}


function recepcionDatosDispositivo(datosREST)
{
	  BorrarErrorFaldon("GENERAL_INF");
	  if(global_elementos.INSTALLNAME!=null)
	  {
		document.getElementById("NombreInstalacion").innerHTML=global_elementos.INSTALLNAME;
		sessionStorage.setItem('NombreInstalacion', global_elementos.INSTALLNAME);
	  }
	  else
	  {
		document.getElementById("NombreInstalacion").innerHTML="";
		sessionStorage.setItem('NombreInstalacion', "");
	  }

	$('#login-modal').modal('hide');
	//$('#menu_logout').show();
	//$('#menu_login').hide();
	//$('#actualizar_dat').show();
	
	
	//g_key=localStorage["hjm_key"];
	//g_device=localStorage["hjm_device"];
	
	global_conf=$.parseJSON(sessionStorage.getItem('configuracion'));
	if(global_conf.apikey!=null && global_conf.device !=null)
	{
		g_key=global_conf.apikey;
		g_device=global_conf.device ;
	}
	
	
	if(tabla_objetos.length)
	{
		if(timer_interval_lectura_datos)
			clearInterval(timer_interval_lectura_datos);
		if(timer_interval_modo)
			clearInterval();
		
		for (x=0;x<tabla_objetos.length;x++)
		{timer_interval_modo
			console.log("Destruye objeto ["+x+"]\n");
			tabla_objetos[x].DestruyeObjetoGrafico();
		}
		
		tabla_valores.lenght=0;
		tabla_objetos.lenght=0;
		tabla_datos_tres_horas.lenght=0;
	}
	
	actualizar_datos = false;
	timer_interval_modo=null;
	timer_interval_lectura_datos=false;
	
	llamarServicioCarriotsPrimeravez();	
}

function TratamientoGPS(datos)
{
	var cadena = datos.data['gps'];
	if(cadena!=null)
	{
		sessionStorage.setItem('gps',datos.data['gps']);
	}
}

function TratamientoERROR(datos)
{
	var cadena = datos.data['error'];
	if(cadena!=null)
	{
		var texto ="";
		var codigo=parseInt(datos.data['error']);
		switch(codigo)
		{
			case 1 :
				texto="Apagado dispositivo concentrador de datos ";
				break;
			default :
				texto = "Codigo no esperado ["+datos.data['error']+"]";
		}
		MostrarErrorFaldon("ERROR_GENERAL",texto);
	}
	else
	{
		BorrarErrorFaldon("ERROR_GENERAL");
	}
}
function recepcionServicioRESTPrimeravez (datosREST)
{
	BorrarErrorFaldon("GENERAL_LEC1");
	var totalDocuments = datosREST.total_documents;
	var numdatos = datosREST.length;
    var numdatos = datosREST.result.length;
   
	var nodo=datosREST.result[0];
	var nodoTabla;

	TratamientoERROR(nodo);
	TratamientoGPS(nodo);
	var iNumElementos=parseInt(nodo.data['numElem']);
	

	

    // actualizamos el encabezado indicando la fecha de actualizacion
	var stringFecha = '         Ultimo Dato: '+DarStringFecha(nodo.at);
	var elem1=document.getElementById("fecha_actualizacion");
    elem1.innerHTML=stringFecha;
	
	
	var numero=0;
	var numeroAct=(nodo.at*1000)+900000;
	var fechaAct=new Date();
	numero=fechaAct.getTime();
	if(numero>numeroAct)
	{
		MostrarErrorFaldon("GENERAL_DATE","Datos demasiado antiguos puede que haya un fallo en el dispositivo");
	}
	else
	{
			BorrarErrorFaldon("GENERAL_DATE");
	}
	
	// a�adimos los elementos a la tabla de 3 horas en orden LIFO ya que hay que mantener que el primer elemento sea el mas reciente
	//tabla_datos_tres_horas=datosREST.result.slice();

	
//	if(iNumElementos>0)// Si no esta creado el campo numero de elementos no se continua con la creacion de objetos
//	{
//		if(tabla_objetos.length==0) // si no se ha creadoobjetos entonces creamos y los metemos en la tabla 
//		{
//			CreacionElementos(iNumElementos, nodo);
//		
//		}
//		
//	}
	ActualizarParametrosRecibidor(nodo,datosREST.result,'true'); // actualizamos los datos con los parametros recibidos
	
	// se activa el timer de refres de informacion 
	timer_interval_lectura_datos=setInterval(llamarServicioCarriots,100000);// 10 minutos
	$("#loading").addClass('hide'); 	
}

// funcion que notifica a cada uno de los elementos existentes los datos recibidos para que se actualicen 
function ActualizarParametrosRecibidor(Parametros,ParametrosTresHoras,flgPrimeraVez)
{
	console.log("ActualizarParametrosRecibidor\n");
	//ActualizarFooter(Parametros);
	var objeto;
	for (x=0;x<tabla_objetos.length;x++)
	{
		objeto=tabla_objetos[x];
		objeto.ProcesaDatos(Parametros,ParametrosTresHoras,flgPrimeraVez);
		
	}
}

function llamarServicioCarriots()
{

//	**** var carriotsURL = 'http://api.carriots.com/devices/defaultDevice@jesusasinrecalde.jesusasinrecalde/streams/?order=-1&max=1';
//	var carriotsURL = 'http://api.carriots.com/devices/prueba@jesusasinrecalde.jesusasinrecalde/streams/?order=-1&max=1';
	var carriotsURL = 'http://api.carriots.com/devices/'+g_device+'/streams/?order=-1&max=30';
	$("#loading").removeClass('hide'); 
	
	
	$.ajax({
	beforeSend: function(xhrObj){
        xhrObj.setRequestHeader("Content-Type","application/json");
        xhrObj.setRequestHeader("Accept","application/json");
        xhrObj.setRequestHeader("carriots.apikey",g_key);
       	},
    type : "GET",
    url: carriotsURL,
    success: recepcionServicioREST,
    error : function(jqXHR, status) { 
		
		//alert(jqXHR.getAllResponseHeaders());
	alert("ERROR :"+jqXHR.responseText+" "+jqXHR.statusText)
		MostrarErrorFaldon("GENERAL_INF1","Fallo en la lectura periodica de los datos de inf. dispositivo");
		$("#loading").addClass('hide'); 
	}
	});
}

function recepcionServicioREST (datosREST)
{

	var totalDocuments = datosREST.total_documents;
	var numdatos = datosREST.length;
    var numdatos = datosREST.result.length;
   	var nodo=datosREST.result[0];
	
	BorrarErrorFaldon("GENERAL_INF1");
	
	TratamientoERROR(nodo);
	TratamientoGPS(nodo);

    // actualizamos el encabezado indicando la fecha de actualizacion
	var stringFecha = '         Ultimo Dato: '+DarStringFecha(nodo.at);
	var elem1=document.getElementById("fecha_actualizacion");
    elem1.innerHTML=stringFecha;
	
	var numero=0;
	var numeroAct=(nodo.at*1000)+900000;
	var fechaAct=new Date();
	numero=fechaAct.getTime();
	if(numero>numeroAct)
	{
		MostrarErrorFaldon("GENERAL_DATE","Datos demasiado antiguos puede que haya un fallo en el dispositivo");
	}
	else
	{
			BorrarErrorFaldon("GENERAL_DATE");
	}
		
	ActualizarParametrosRecibidor(nodo,datosREST.result,'false'); // actualizamos los datos con los parametros recibidos
	
	
	$("#loading").addClass('hide'); 
	
}
function CreacionElementos(iNumElementos, nodo )
{
	var valor;
	var Tem1;
	contadorElementos=0;
	
	for(var indice=0;indice<iNumElementos;indice++)
	{
		valor = nodo.data['ID_'+indice];
		if(valor!=null)
		{
			var TipoElemento=nodo.data['ID_'+indice];
			switch(TipoElemento)
			{
			/*	case "0" : // termostato sistema
				    console.log("Crea elm Termostato sistema ["+indice+"]\n");
					Tem1= new TermostatoSistena(indice);
					Tem1.set("Visible",true);
					tabla_objetos.push(Tem1);
					InsertaOpcionMenuElementos(indice);
					break;*/
				case "1" : // datos genericos
						console.log("Crea elm contador ["+indice+"]\n");
						Tem1=new DatosGenerico(indice);
						tabla_objetos.push(Tem1);
						InsertaOpcionMenuElementos(indice);
									break;
				
				case "2" : // Altherma
						console.log("Crea elm TAltherma ["+indice+"]\n");
						Tem1=new Altherma(indice);
						tabla_objetos.push(Tem1);
						InsertaOpcionMenuElementos(indice);
						break;
					
				case "3" : // Trane
					console.log("Crea elm Trane ["+(contadorElementos+4)+"]\n");
					Tem1=new Trane(contadorElementos+4);
					tabla_objetos.push(Tem1);
					InsertaOpcionMenuElementos(contadorElementos+4);
					break;
				
				default :
					break;
			}
		}
		else// si no hay mas elementos se para la creacion del bucle independiente del valor de contador que figure
			break;
	}
	console.log("se han creado "+iNumElementos+" elementos");
}


function CreacionElementos_new (elementos )
{
	var valor;
	var Tem1;
	debugger;
	for(var indice=0;indice<elementos.length;indice++)
	{
		var TipoElemento=elementos[indice].tipo;
		switch(TipoElemento)
		{
			/*	case "0" : // termostato sistema
				    console.log("Crea elm Termostato sistema ["+indice+"]\n");
					Tem1= new TermostatoSistena(indice);
					Tem1.set("Visible",true);
					tabla_objetos.push(Tem1);
					InsertaOpcionMenuElementos(indice);
					break;*/
				case "1" : // datos genericos
						console.log("Crea elm contador ["+elementos[indice].id_hejmo+"]\n");
						Tem1=new DatosGenerico(elementos[indice].id_hejmo,elementos[indice].name);
						tabla_objetos.push(Tem1);
						InsertaOpcionMenuElementos(elementos[indice].id_hejmo);
									break;
				
				case "2" : // Altherma
						console.log("Crea elm TAltherma ["+elementos[indice].id_hejmo+"]\n");
						Tem1=new Altherma(elementos[indice].id_hejmo,elementos[indice].name,elementos[indice].mode);
						tabla_objetos.push(Tem1);
						InsertaOpcionMenuElementos(elementos[indice].id_hejmo);
						break;
					
				case "3" : // Trane
					console.log("Crea elm Trane ["+(contadorElementos+4)+"]\n");
					Tem1=new Trane(contadorElementos+4);
					tabla_objetos.push(Tem1);
					InsertaOpcionMenuElementos(contadorElementos+4);
					break;
				
				default :
					break;
		}
		
	}
	console.log("se han creado "+elementos.length+" elementos");
}

// funcion para insertar una opcion en el menu de elementos
function InsertaOpcionMenuElementos(IdElem )
{
	var obj=DarObjeto(IdElem);
	$("#menu_elementos").append("<li><a href=\"#\" "
	+"Elemento=\""+IdElem+"\""
	+"Estado=\"1\""
	+" Id=\"check"+IdElem +"\">" 
	+obj.get("Caption")  
	+"</a></li>");
	
	$("#check"+IdElem).click(  MenuElementoCheck);
	
	// � tiene registro asociado la opcion de menu ?
	var EstadoElemento=localStorage["hjm_elm"+IdElem];
	if(EstadoElemento==null)
	{
		// no existe se crea el elemento
		EstadoElemento="1";
		localStorage["hjm_elm"+IdElem]=EstadoElemento;
	}
	if(EstadoElemento=="0") // El estado es no visible
	{
		$("#Elemento"+IdElem).attr("Estado","0");
		$("#check"+IdElem).css("color","#DFE0DF");
		obj.set("Visible",false);
	}
	else // Estado Visible
	{
		$("#Elemento"+IdElem).attr("Estado","1");
	}
}

function About ( obj )
{
	$('#about').modal('show');
	
}

// Funcion para deslogarse del sistema , se borra el registro y se redirige a la pagina de login 
function EvntLogout ( obj)
{

	
	localStorage.removeItem("hjm_usr");
	localStorage.removeItem("hjm_pass");
	sessionStorage.removeItem("configuracion");
    window.open ('login.html','_self',false);

}


/** Funcion que da el objeto que corresponde al identificativo que se le pasa por parametro
*@IdTerm Identificativo de objeto
*@return objeto con ese identificativo, en caso de no encontralo da null
*/
function DarObjeto(IdTerm)
{
	var objeto=null;
	for (x=0;x<tabla_objetos.length;x++)
	{
		if(tabla_objetos[x].get("Id")== IdTerm)
		{
			objeto=tabla_objetos[x];
			break;
		}
	}
	return objeto;
	
}


// funcion para insertar una opcion en el menu de elementos
function InsertaOpcionMenuElementos(IdElem )
{
	var obj=DarObjeto(IdElem);
	$("#menu_elementos").append("<li><a href=\"#\" "
	+"Elemento=\""+IdElem+"\""
	+"Estado=\"1\""
	+" Id=\"check"+IdElem +"\">" 
	+obj.get("Caption")  
	+"</a></li>");
	
	$("#check"+IdElem).click(  MenuElementoCheck);
	
	// � tiene registro asociado la opcion de menu ?
	var EstadoElemento=localStorage["hjm_elm"+IdElem];
	if(EstadoElemento==null)
	{
		// no existe se crea el elemento
		EstadoElemento="1";
		localStorage["hjm_elm"+IdElem]=EstadoElemento;
	}
	if(EstadoElemento=="0") // El estado es no visible
	{
		$("#Elemento"+IdElem).attr("Estado","0");
		$("#check"+IdElem).css("color","#DFE0DF");
		obj.set("Visible",false);
	}
	else // Estado Visible
	{
		$("#Elemento"+IdElem).attr("Estado","1");
	}
}

// Funcion que recibe el evento de pulsar el check de visibilidad del elemento
function MenuElementoCheck(objeto)
{

	var IdObjeto=$(this).attr('Elemento');
	var Estado=localStorage["hjm_elm"+IdObjeto];
	var color;
	var obj=DarObjeto(IdObjeto);
	if(Estado=="1")
		{
			Estado="0";
			color="#DFE0DF";
			obj.set("Visible",false);
			
		}
		else
		{
			Estado="1";
			color="#000000";
			obj.set("Visible",true);
			
		}
		
		localStorage["hjm_elm"+IdObjeto]=Estado;
		$(this).attr("Estado",Estado);
		$("#check"+IdObjeto).css("color",color);
		
	
	
}

function EvntBtwDespliegue(obj)
{
	var id_term=parseInt(obj.getAttribute('IdTerm'));
	var obj=DarObjeto(id_term);
	if(obj)
		obj.Desplegar();

}

function EvntBtnOn_off(obj)
{
	var id_term=parseInt(obj.getAttribute('IdTerm'));
	var obj=DarObjeto(id_term);
	if(obj)
	{
		obj.CambioOnOff();
		obj.Actualizar();
	}
	
}

function ActualizarDatos(obj)
{	
		llamarServicioCarriots();
}

function EvntBtnAlthermConf(obj)
{
	var objeto;
	var contador=0;
	$(obj).fadeTo(100, 0.1).fadeTo(200, 1.0);
	
	Id=obj.getAttribute('objid');
	
	var obj=DarObjeto(Id);
	if(obj)
	{
		obj.MostrarVentanaModal();
	}
	
}
function EvntBtngraph(obj)
{
	var id_term=parseInt(obj.getAttribute('IdTerm'));
	var obj=DarObjeto(id_term);
	if(obj)
		obj.MostrarGraph();
}
function EvntBtnFINAlthermConf(boton,obj)
{
	
	
	$(boton).fadeTo(100, 0.1).fadeTo(200, 1.0);
	
	var ObjId=obj.getAttribute('elm');
	var objeto=DarObjeto(ObjId);
	
	if(objeto)
	{
		objeto.FinalizarVentanaModal();	
		$(obj).modal('toggle'); // se cierra la ventana 
	}
	
	
	EnviarDatos(); // se envia los datos independientemente de si cambian o no sera la raspberri quien sepa si cambian o no 
	
	if(DetectarDatosCambiados()=="true")
	{
		ActivarVisualizacionCambio();
	}
	else
	{
		DesactivaVisualizacionCambio();
	}
	
}	

function EvnReload(boton,obj)
{
	
	var objeto;
	var contador=0;
	$(boton).fadeTo(100, 0.1).fadeTo(200, 1.0);

	var ObjId=obj.getAttribute('elm');
	var objeto=DarObjeto(ObjId);
	
	if(objeto)
	{
		objeto.EventoVentanaModal(1);	
	}

}


function DetectarDatosCambiados()
{
	var retorno="false";
	var objeto;
	
	for (x=0;x<tabla_objetos.length && retorno == "false" ;x++)
	{
		objeto=tabla_objetos[x];
		retorno=objeto.HayDatosCambiados();
	
	}	
	return retorno;
}

function ActivarVisualizacionCambio()
{
	if(timer_interval_modo==null)	
	{
			// se crea el temporizador parar destacar el cambio de modo
		timer_interval_modo=setInterval(func_inteval_modo,1000);
	}
}

function DesactivaVisualizacionCambio()
{
	if(timer_interval_modo)
	{
			clearInterval(timer_interval_modo);
			timer_interval_modo=null;
	}
	
	var objeto=null;
	for (x=0;x<tabla_objetos.length;x++)
	{
		tabla_objetos[x].DesactivaTemporizadorCambio();
		
		
	}
	
}

function EnviarDatos(obj)
{
	if(DetectarDatosCambiados()=="true")
	{
		var textoEnviar="";
	
	
		var objeto=null;
		for (x=0;x<tabla_objetos.length;x++)
		{
			var cadena=	tabla_objetos[x].DarDatosAGrabar();
			if(cadena!=null)
				textoEnviar+=cadena;
		
		}
	//var cadena="\"valor\":\"dato\"";
	
		llamarCarriotsMetodoPOST(textoEnviar);
	}
	
}


// ..................................................................................
// FUNCIONES DE VISUALIZACION DE ERRORES 
// ..................................................................................
function InicializaVisError()
{
	$('#errorfaldon').hide();
	NumeroErroresFaldon=0;
}


function MostrarErrorFaldon(Identificativo,texto)
{
	if(document.getElementById( Identificativo )==null)
	{
		if(NumeroErroresFaldon==0)
		{
			$("#errorfaldon").show();
		}
		NumeroErroresFaldon++;
		$("#errorfaldon").append("<div id=\""+Identificativo+ "\">"
								+texto
								+"</div>");
		
		
		$.notify({
			icon: 'fa fa-exclamation-triangle',
			message: texto

		},{
			type: 'danger',
			timer: 3000,
			placement: {
				from: 'bottom',
				align: 'center'
            }
			
		});
		// La mostramos
		//notificacion.show();
	}
}

function BorrarErrorFaldon(Identificativo)
{
	if(document.getElementById( Identificativo ))
	{
		
		NumeroErroresFaldon--;
		var element = document.getElementById(Identificativo);
		element.parentNode.removeChild(element);
		
		if(NumeroErroresFaldon==0)
		{
			$("#errorfaldon").hide();
		}
	}
}
function llamarCarriotsMetodoPOST(datos)
{
	var cadenaSalida="{"+"\"protocol\":\"v2\","+"\"checksum\":\"\","+"\"device\":\"In"+g_device+"\","+"\"at\":\"now\","+"\"data\":{"+datos+"}}"
	

	var carriotsURL = 'http://api.carriots.com/streams';

	$("#loading").removeClass('hide');
	$.ajax({
	/*headers : {
		"carriots.apikey": g_key,
		"Content-Type":"application/json",
        "Accept":"application/json"
	},*/
	beforeSend: function(xhrObj){
        xhrObj.setRequestHeader("Content-Type","application/json");
        xhrObj.setRequestHeader("Accept","application/json");
        xhrObj.setRequestHeader("carriots.apikey",g_key);
        

		},
	
    type : "post",
	
    url: carriotsURL,
	data:cadenaSalida,
	success: function( data, textStatus, jQxhr ){
                  
                },
    error: function( jqXhr, textStatus, errorThrown ){
                  
                }
	
		
});
}