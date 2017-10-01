	/** Constructor ObjetoGenerico
	*@param idTerm Identificativo Objeto 
	*@param Tipo identificativo de tipo de objeto , dato que no tiene impacto en la operacion
	*@param Caption texto que aparece en caption del objeto
	*@param Nombre Id de la plantilla html que tiene que crear
	*@param flgBTNONOFF Flag para indicar si se visualiza el boton de encendio-apagaod
	*@param SUP_ColorFondoActivo 
	*@param SUP_ColorActivo

	*@param SUP_ColorFondoInactivo
	*@param SUP_ColorInactivo
	
*/
function ObjectoGenerico(idTerm,Tipo,Caption,Nombre,bflgVerBTNONOFF,SUP_ColorFondoActivo,SUP_ColorActivo,SUP_ColorFondoInactivo,SUP_ColorInactivo)
{
	"use strict";
	this.Id=idTerm;
	this.Tipo=Tipo;
	this.iluminadoModo=false; // switch necesario para poder realizar el parpadeo de cambio 
	//this.Tipo=0;// valor identificativo de tipo 
	this.visible=true; // si el objeto ( graficamente ) esta visible o no
	this.Minimizado=true; // si el objeto ( graficamente ) esta minimizado o no
	this.flgVerBTNONOFF=bflgVerBTNONOFF;
	this.Caption=Caption;
	this.Nombre=Nombre;
	this.Estado="APAGADO"; 
	this.flgError=false;
	this.textoError="";
	this.SUP_ColorFondoActivo=SUP_ColorFondoActivo;
	this.SUP_ColorActivo=SUP_ColorActivo;
	this.SUP_ColorFondoInactivo=SUP_ColorFondoInactivo;
	this.SUP_ColorInactivo=SUP_ColorInactivo;
	
};

ObjectoGenerico.prototype.get=function(atributo)
{
	switch(atributo)
	{
		case "Id":
			return this.Id;
			break;
		case "Tipo":
			return this.Tipo;
			break;
		case "Visible":
			return this.visible;
			break;
		case "Minimizamo":
			return this.Minimizado;
		case "Caption" :
			return this.Caption;
			break;
		case "Estado":
			return this.Estado;
			break;
		case "Nombre" :
			return this.Nombre;
			break;
		default :
			return null;
			break;
	}
};

ObjectoGenerico.prototype.set=function(atributo,valor)
{
	switch(atributo)
	{
		
		case "Visible" :
			debugger;
			this.visible=valor;
		
			var MarcoSup = document.getElementById('marco_superior'+this.Id);
			if(this.visible)
			{
				var dato="#"+this.Nombre+this.Id;
				$(dato).show();
				MarcoSup.style.visibility='visible';
				//Desplegar(id_term,1);
			}
			else
			{
				$('#'+this.Nombre+this.Id).hide();

			}
			this.VisualizaError();
			break;
		case "Minimizado" :
			this.Minimizado=valor;
			break;
		case "Caption" :
			this.configuracion.caption=valor;
			break;
		case "Estado" :	
			if(valor=="ENCENDIDO" || valor =="APAGADO")
				this.Estado=valor;
			
			 console.log(" ["+this.Id+"] estado :"+this.Estado+"\n");
			break;
		default : 
			break;
	}
	
};

/** Clona una plantilla dada por parametro y modifica los elementos comunes 
	*@param NombrePlantilla Nombre de plantilla a clonar
	*@return Objeto clonado
*/
ObjectoGenerico.prototype.ClonaGenerico=function(NombrePlantilla)
{
	debugger;
	var t = document.querySelector(NombrePlantilla);
	var elemento = document.importNode(t.content, true);
	// ============= ELEMENTOS MARCO SUPERIOR ==================================
	elemento.getElementById("obj_tipo2").id=this.Nombre+this.Id;
	elemento.getElementById("marco_superior").id="marco_superior"+this.Id;
	elemento.getElementById("icono_despliegue").id="icono_despliegue"+this.Id;
	elemento.getElementById("caption").id="caption"+this.Id;
	elemento.getElementById("icono_OnOffSup").id="icono_OnOffSup"+this.Id;
	
	// ============ ELEMENTOS MARCO INFERIOR =====================================
	elemento.getElementById("marco_inf").id="marco_inf"+this.Id;
	elemento.getElementById("zona_alarma").id="zona_alarma"+this.Id;
	elemento.getElementById("btn_onoff").id="btn_onoff"+this.Id;
	elemento.getElementById("icono_OnOffInf").id="icono_OnOffInf"+this.Id;
	elemento.getElementById("icono_error").id="icono_error"+this.Id;
	
	
	
	this.GraphicName=this.Nombre+this.Id;
	
	console.log("GraphicName : "+this.GraphicName+"\n");
	
	return elemento;
}	
	
ObjectoGenerico.prototype.ClonaGenerico_2=function()
{
	document.getElementById("icono_despliegue"+this.Id).setAttribute( "IdTerm",this.Id.toString());
	document.getElementById("icono_OnOffSup"+this.Id).setAttribute("IdTerm",this.Id.toString());
	document.getElementById("btn_onoff"+this.Id).setAttribute("IdTerm",this.Id.toString());
	document.getElementById("icono_OnOffInf"+this.Id).setAttribute("IdTerm",this.Id.toString());
	var elem1=document.getElementById("caption"+this.Id);
    elem1.innerHTML=this.Caption;
	
	$('#icono_desplieguDe'+this.Id).click(this.depliegue);
}	

ObjectoGenerico.prototype.Desplegar=function()
{
	this.ParpadeoGrafico('#icono_despliegue'+this.Id);
	var icono = document.getElementById('icono_despliegue'+this.Id);
	if(this.Minimizado)// paso a maximizamo
	{
		icono.src="assets/img/arrow_up.png";
		if(this.flgVerBTNONOFF)
		{
			$('#icono_OnOffSup'+this.Id).fadeOut(400);// si se pasa de minizado a maximizado el boton de apagado del caption desaparece
		}
		this.OnMaximizado();
		
	}
	else // paso a minimizado
	{
		icono.src="assets/img/arrow_down.png";
		if(this.flgVerBTNONOFF)
		{
			$('#icono_OnOffSup'+this.Id).fadeIn(300);
		}
		this.OnMinimizado();
	}
	$('#marco_inf'+this.Id).toggle("fade");
	this.Minimizado= !this.Minimizado;
}



ObjectoGenerico.prototype.ParpadeoGrafico=function(ObjName)
{
	$(ObjName).fadeOut(100);
	$(ObjName).fadeIn(100);
}

ObjectoGenerico.prototype.CambioOnOff=function()
{

	if(this.Estado=="ENCENDIDO")
		this.Estado="APAGADO";
	else
		this.Estado="ENCENDIDO";
	
}


/** Cambia la visualizacion del objeto en funcion de los datos que lo configuran
*/
ObjectoGenerico.prototype.Actualizar=function()
{
	
	debugger;
	var MarcoSup = document.getElementById('marco_superior'+this.Id);
	var iconoOnOff = document.getElementById('icono_OnOffSup'+this.Id);
	var iconoOnOffInf = document.getElementById('icono_OnOffInf'+this.Id);
	var MarcoInf = document.getElementById('marco_inf'+this.Id);
	
	// no motramos los botones de encendido apagado y tenemos desactivado el flag. 
	if(!this.flgVerBTNONOFF)
	{
		$('#icono_OnOffSup'+this.Id).hide();
		$('#icono_OnOffInf'+this.Id).hide();
		$('#btn_onoff'+this.Id).hide();
	}
	switch ( this.Estado)
	{
		case "ENCENDIDO" :
			// ======= ELEMENTOS MARCO SUPERIOR =====================
			MarcoSup.style.backgroundColor=this.SUP_ColorFondoActivo;
			MarcoSup.style.color=this.SUP_ColorActivo;
			iconoOnOff.src="assets/img/on.png";
			
			// ======= ELEMENTOS MARCO INFERIOR
			iconoOnOffInf.src="assets/img/on.png";
			MarcoInf.style.color="#555BA8";
			MarcoInf.style.backgroundColor="#A9A8E8"
			
			break;
		
		case "APAGADO" :
			// ======== ELEMENTOS MARCO SUPERIOR =========================
			MarcoSup.style.backgroundColor=this.SUP_ColorFondoInactivo;
			MarcoSup.style.color=this.SUP_ColorInactivo;
			iconoOnOff.src="assets/img/off.png";
			
			// ======== ELEMENTOS MARCO INFERIOR ========================
			iconoOnOffInf.src="assets/img/off.png";
			MarcoInf.style.backgroundColor="#E6E9FF";
			break;
	}
	this.VisualizaError();
}

/** Funcion generica que indica si hay datos modificado, sin sobrecargar siempre da false
*/
ObjectoGenerico.prototype.HayDatosCambiados=function()
{
	return "false";
}

/** Funcion generica de procesamiento de datos recibidor, sin sobrecargar no incorpora ningun dato
*/
ObjectoGenerico.prototype.ProcesaDatos=function(Parametros,ParametrosTresHoras,flgPrimeravez)
{
	return;
}

/** Funcion generica para mostrar el grafico , sin sobrecargar no muestra el formulario
*/
ObjectoGenerico.prototype.MostrarGraph=function()
{
	return;
}
/** Funcion de accion grafica en el caso de cambio de datos  del objeto, para el objeto generico solo caption 
	
*/
ObjectoGenerico.prototype.AccionCambioDatos=function()
{
	if(this.iluminadoModo)
	{
		
		$( '#caption'+this.Id ).fadeTo( 'slow',.3 );
	}
	else
	{
		
		$( '#caption'+this.Id ).fadeTo( 'slow',1 );
	}
	this.iluminadoModo= !this.iluminadoModo;
}

/** Acciones a realizar cuando no se necesita visualmente indicar un cambio de datos , se vuelve al valor original
*/
ObjectoGenerico.prototype.DesactivaTemporizadorCambio=function()
{
	if(!this.iluminadoModo)
			$( '#caption'+this.Id ).fadeTo( 'slow',1 );
	
	this.iluminaModo=false;
}	

/** Funcion generica de evento cuando se minimiza el objeto , sin sobrecargar no hace nada 
*/
ObjectoGenerico.prototype.OnMinimizado=function()
{
	return;
}

/** Funcion generica de evento cuando se maximiza el objeto , sin sobrecargar no hace nada 
*/
ObjectoGenerico.prototype.OnMaximizado=function()
{
	return;
}

/** Funcion generica para la destruccion del objeto grafico asociado al objeto 
*/
ObjectoGenerico.prototype.DestruyeObjetoGrafico=function()
{
	debugger;
	var objeto = document.getElementById(this.GraphicName);
	if(objeto)
	{
		
		console.log("Destruye graph "+this.GraphicName+"\n");
		$("."+this.GraphicName).remove();
		//var padre= objeto.parentNode;
		//padre.removeChild(this.GraphicName);
		//contenedor.removeChild(this.GraphicName);
	}
	return;
}

/** Funcion para dar los parametros a grabar , por defecto no da ninguno 
*/
ObjectoGenerico.prototype.DarDatosAGrabar=function()
{
	return null;
}


/** Funcion para mostrar una ventana modal , por defecto no muestra nada 
*/

ObjectoGenerico.prototype.MostrarVentanaModal=function()
{
	return null;
}

/** Funcion para Finalizar una ventana modal , por defecto no muestra nada 
*/

ObjectoGenerico.prototype.FinalizarVentanaModal=function()
{
	return null;
}


/** Funcion para Tener un evento en la ventana modal  , por defecto no hace nada 
*/

ObjectoGenerico.prototype.EventoVentanaModal=function(Evento)
{
	return ;
}

// Modo de operacion de error 
ObjectoGenerico.prototype.SetError=function(Modo,texto)
{
	// Se crea un div con el nombre "err"+id
	if(Modo=="ON")
	{
		this.flgError=true;
		this.textoError=texto;
		
	}
	else
	{
		this.flgError=false;
		this.textoError="";
	}
	this.VisualizaError();
}

ObjectoGenerico.prototype.VisualizaError=function()
{
	var dato="#"+"icono_error"+this.Id;
				
	if( this.flgError==true )
	{
		var elem1=document.getElementById('zona_alarma'+this.Id);
		elem1.innerHTML=this.textoError;
		$(dato).show();
		if(this.visible==true)
		{
			BorrarErrorFaldon("err"+this.Id);
			
		}
		else
		{
			MostrarErrorFaldon("err"+this.Id,"["+this.Caption+"]  "+this.textoError);
		}
	}
	else
	{
		$(dato).hide();
		BorrarErrorFaldon("err"+this.Id);
	}

}