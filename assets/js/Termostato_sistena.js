function TermostatoSistena(idTerm)
{
	"use strict";
	

	debugger;
	ObjectoGenerico.call(this,idTerm,0,"Termostato"+idTerm,"Termostato",true,"#838DFF","#C4DDF9","#555BA8","#669");
	this.Id=idTerm;
	this.parametros={temperatura:35.5, modo:0,temperaturaAmbiente:30.5,ValvulaAbierta:0}; // datos que se recibe del servicio pass
	this.configuracion={temperatura:35.5, modo:0, Caption:""}; // datos que se envia al servicio pass , son los que se modifican graficamente
	
		
	var clone = ObjectoGenerico.prototype.ClonaGenerico.call(this,'#termostato_tipo_2');
	
	// Elementos graficos propios del objeto
	clone.getElementById("tempAmbiente").id="tempAmbiente"+idTerm;
	
	clone.getElementById("marco_temp").id  ="marco_temp"+this.Id;
	clone.getElementById("btn_mas").id     ="btn_mas"+this.Id;
	clone.getElementById("temp_grande").id ="temp_grande"+this.Id;
	clone.getElementById("temp_peque").id  ="temp_peque"+this.Id;
	clone.getElementById("btn_menos").id   ="btn_menos"+this.Id;
	
	$("#contenedor").append(clone); // se añade el objeto al documento DOM dentro del elemento contenedor ...
	
	
	document.getElementById("btn_mas"+this.Id).setAttribute( "IdTerm",this.Id.toString());
	document.getElementById("btn_menos"+this.Id).setAttribute( "IdTerm",this.Id.toString());
	
	ObjectoGenerico.prototype.ClonaGenerico_2.call(this);// ... una vez definido el objeto grafico al completo lo incluimos en la pagina 
	
	
	this.Actualizar();// Situamos la visualizacion al mismo nivel que el estado del objeto
	
};

TermostatoSistena.prototype = Object.create(ObjectoGenerico.prototype); 


TermostatoSistena.prototype.get=function(atributo)
{
	switch(atributo)
	{
		case "temperatura":
			return this.configuracion.temperatura;
		default:
            return ObjectoGenerico.prototype.get.call(this,atributo); 
			break;	
			
	}

};

TermostatoSistena.prototype.set=function(atributo,valor)
{
	switch(atributo)
	{
		case "temperatura" :
			this.configuracion.temperatura=valor;
			break;
		case "modo" :
			this.configuracion.modo=valor;
			break;
		
		
		default :
			ObjectoGenerico.prototype.set.call(this,atributo,valor);
			break;
	}
	this.Actualizar();
};

TermostatoSistena.prototype.HayDatosCambiados=function()
{
	var bRetorno=false;
	if((this.parametros.modo != this.configuracion.modo)|| (this.parametros.temperatura != this.configuracion.temperatura))
	{
		bRetorno=true;
	}
	return bRetorno;
};
/** Funcion de procesamiento de datos recibido, 
*/
TermostatoSistena.prototype.ProcesaDatos=function(Parametros)
{
	debugger;
	var temperatura=Parametros.data[this.Id+'_dat1'];
	if(temperatura==null)
		return;
	var floatTemperatura = parseFloat(temperatura);
	this.parametros.temperatura=floatTemperatura;
	this.CambioTemperatura();
	
	return;
}

/** Pulsacion del boton despliegue/repliegue de la pestaña principal, cambio maximizado/minizado 
*/
TermostatoSistena.prototype.Desplegar=function()
{
	debugger;
	ObjectoGenerico.prototype.Desplegar.call(this);
}

TermostatoSistena.prototype.CambioOnOff=function()
{
	ObjectoGenerico.prototype.CambioOnOff.call(this);
	this.Actualizar(this);
}

/** centraliza en una una funcion todas los cambios que se produce en el objeto 
*/

TermostatoSistena.prototype.Actualizar=function()
{
	switch ( this.Estado)
	{
		case "ENCENDIDO" :
			$('#btn_mas'+this.Id).show();
			$('#btn_menos'+this.Id).show();
			if(this.parametros.temperatura != this.configuracion.temperatura)
				$('#temp_peque'+this.Id).show();
			else	
				$('#temp_peque'+this.Id).hide();
			break;
		case "APAGADO" :
			$('#btn_mas'+this.Id).hide();
			$('#btn_menos'+this.Id).hide();
			$('#temp_peque'+this.Id).hide();
			break;
	}
	
	
	ObjectoGenerico.prototype.Actualizar.call(this);
	
	if(this.HayDatosCambiados())
		ActivarTemporizadorCambio();
}

/** Evento de subir temperatura 
*/
TermostatoSistena.prototype.SubirTemp=function()
{
	this.parametros.temperatura+=0.5;
	this.CambioTemperatura();
	
}

/** Evento de bajar temperatura 
*/
TermostatoSistena.prototype.BajarTemp=function()
{
	this.parametros.temperatura-=0.5;
	this.CambioTemperatura();
	
}

/** Funcion generica de caambio de temperatura 
*/
TermostatoSistena.prototype.CambioTemperatura=function()
{
	ObjectoGenerico.prototype.ParpadeoGrafico.call(this,"btn_mas"+this.Id);
	var elem1=document.getElementById('temp_grande'+this.Id);
    elem1.innerHTML=this.parametros.temperatura;
	
	this.Actualizar(this);
	
}

/** Funcion de accion grafica en el caso de cambio de datos  del objeto,  
	
*/
TermostatoSistena.prototype.AccionCambioDatos=function()
{
	if(this.parametros.temperatura != this.configuracion.temperatura && $( '#temp_grande'+this.Id ).show)// si hay un cambio de temp. y el objeto es visible 
	{
		if(this.iluminadoModo)
		{
		
			$( '#temp_grande'+this.Id ).fadeTo( 'slow',.3 );
		}
		else
		{
			$( '#temp_grande'+this.Id ).fadeTo( 'slow',1 );
		}
	}
	
	
	ObjectoGenerico.prototype.AccionCambioDatos.call(this);
}

/** Acciones a realizar cuando no se necesita visualmente indicar un cambio de datos , se vuelve al valor original
*/
TermostatoSistena.prototype.DesactivaTemporizadorCambio=function()
{
	if(!this.iluminadoModo)
	{
		if($( '#temp_grande'+this.Id ).show)
			$( '#temp_grande'+this.Id ).fadeTo( 'slow',1 );
	}
	
	ObjectoGenerico.prototype.DesactivaTemporizadorCambio.call(this);
}