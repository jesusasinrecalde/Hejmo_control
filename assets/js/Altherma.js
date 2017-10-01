var TextoMeteo ;

function Altherma(idTerm)
{
	"use strict";
	

	debugger;


	ObjectoGenerico.call(this,idTerm,2,"Altherma CB LT","Altherma"+idTerm,false,"#35A127","#D6FFD1","#8B70EE"/*"#370EC8"*/,"#669");
	
	this.Id=idTerm;
	
	/*
	[1] I0021 Unit ERROR 0..1 (0:No Error, 1:Error)
	[2] I0022 Unit ERROR Code RTD ASCII Format*
	[3] I0023 Unit ERROR Sub Code 0-99
	[4] I0028 Emergency Operation 0..1 (0:Off, 1:On)
	[5] I0029 ADD Zone Running 0..1 (0:Off, 1:On) ( NO SE MUESTRA)
	[6] I0030 Circulation pump operation 0..1 (0:Off, 1:On)
	[7] I0031 Compressor Run 0..1 (0:Off, 1:On)
	[8] I0032 Booster Heater Run� 0..1 (0:Off, 1:On)
	[9] I0033 Disinfection operation 0..1 (0:Off, 1:Busy) ( NO SE MUESTRA)
	[10] I0034 Backup Heater Level 1,2� 0..2 (0:Off, 1,2: Level)
	[11] I0035 Defrost/start up mode 0..1 (0:Off, 1:Busy)
	[12] I0036 Hot Start 0..1 (0:Off, 1:Busy)
	[13] I0037 3-Way Valve 0..1 (0:Space Heat/Cool, 1: DHW)
	[14] I0040 Leaving Water Temperature �C x100 Temperature
	[15] I0041 Leaving Water Temperature PHE �C x100 Temperature
	[16] I0042 Inlet Water Temperature �C x100 Temperature
	[17] I0043 Domestic Hot Water Temperature�
	[18] I0044 Outside Air Temperature �C x100 Temperature ( SE MUESTRA EN EL CAPTION)
	[19] I0045 Liquid Refrigerant Temperature �C x100 Temperature
	[20] I0046 Current Leaving Water Temperature MAIN Setpoint �C x100 Temperature
	[21] I0047 Current Leaving Water Temperature ADD Setpoint� �C x100 Temperature ( NO SE MUESTRA)
	[22] I0048 External Sensor �C x100 Temperature ( NO SE MUESTRA)
	[23] I0049 Flow Rate litre/s x100
	[24] I0050 Measured Room Temperature �C x100 Temperature ( NO SE MUESTRA)
	[25] I0051 Current DHW Setpoint �C x100 Temperature

	HOLDING REGISTER ====================================================================

	[26] Punto de ajuste PRINCIPAL del agua de salida en modo calefacci�n* 25-55�C
	[27] Punto de ajuste PRINCIPAL del agua de salida en modo refrigeraci�n* 5-22�C
	[28] Modo de funcionamiento 0..2 (0=autom�tico, 1=calefacci�n, 2=refrigeraci�n)
	[29] Calefacci�n/refrigeraci�n de espacio encendida/apagada 0..1 (0:apagada, 1:encendida)
*/	
	this.parametros={dat1:0, dat2:0 ,dat3: 0,dat4: 0,dat5: 0,dat6:0
						   , dat7: 0,dat8: 0,dat9: 0,dat10:0,dat11:0,dat12:0,dat13:0
					       , dat14:0,dat15:0,dat16:0,dat17:0
					       , dat18:0,dat19:0,dat20:0,dat21:0,dat22:0,dat23:0,dat24:0,dat25:0
						   , dat26:0,dat27:0,dat28:0,dat29:0}; // datos que se recibe del servicio pass
	//this.configuracion={temperatura:35.5, modo:0, Caption:""}; // datos que se envia al servicio pass , son los que se modifican graficamente
	//this.ConsumoHora=new Array(6);

	// parametros a grabar 
	/*
		grb1: on off , encendido clima , se relaciona con el parametro dat5 
	*/
	this.grabacion={StdClima:0, ModoClima:0,TempClima:0,StdACS:0,TempACS:0};
		
	var clone = ObjectoGenerico.prototype.ClonaGenerico.call(this,'#Altherma');
	debugger;
	
	
	// Elementos graficos propios del objeto
	clone.getElementById("TempExterior").id ="TempExterior"+this.Id;
	clone.getElementById("marco_principal").id  ="marco_principal"+this.Id;
	
	clone.getElementById("accordion").id ="accordion"+this.Id;
	
	//Elementos que van los datos de consumo
	
	
	clone.getElementById("dat4").id ="dat4"+this.Id;
	clone.getElementById("dat8").id ="dat8"+this.Id;
	clone.getElementById("dat6").id ="dat6"+this.Id;
	clone.getElementById("dat7").id ="dat7"+this.Id;
	clone.getElementById("dat10").id ="dat10"+this.Id;
	clone.getElementById("dat12").id ="dat12"+this.Id;
	clone.getElementById("dat13").id ="dat13"+this.Id;
	clone.getElementById("dat14").id ="dat14"+this.Id;

	clone.getElementById("dat15").id ="dat15"+this.Id;
	clone.getElementById("dat16").id ="dat16"+this.Id;
	clone.getElementById("dat17").id ="dat17"+this.Id;
	clone.getElementById("dat19").id ="dat19"+this.Id;
	clone.getElementById("dat20").id ="dat20"+this.Id;
	clone.getElementById("dat23").id ="dat23"+this.Id;
	clone.getElementById("dat25").id ="dat25"+this.Id;
	
	clone.getElementById("dat28").id ="dat28"+this.Id;
	
	//clone.getElementById("icono_warning").id ="icono_warning"+this.Id;
	
	clone.getElementById("configuracion").id ="configuracion"+this.Id;
	
	
	
	$("#contenedor").append(clone); // se a�ade el objeto al documento DOM dentro del elemento contenedor ...
	
	
	ObjectoGenerico.prototype.ClonaGenerico_2.call(this);// ... una vez definido el objeto grafico al completo lo incluimos en la pagina 
	
	document.getElementById("configuracion"+this.Id).setAttribute("ObjID",this.Id);
	
	//llamarServicioCarriotsNummObjt(this.Id,6);
	$('.accordion'+this.Id).collapse();
	this.Actualizar();// Situamos la visualizacion al mismo nivel que el estado del objeto

};

Altherma.prototype = Object.create(ObjectoGenerico.prototype); 

/** centraliza en una una funcion todas los cambios que se produce en el objeto 
*/

Altherma.prototype.Actualizar=function()
{
	//var elem1=document.getElementById('dat1'+this.Id);
    //elem1.innerHTML=this.parametros.dat1+" V";
	
	//elem1=document.getElementById('dat2'+this.Id);
    //elem1.innerHTML=this.parametros.dat2+" A";
	
	////elem1=document.getElementById('dat3'+this.Id);
    ////elem1.innerHTML=this.parametros.dat3;
	
	////elem1=document.getElementById('dat4'+this.Id);
    ////elem1.innerHTML=this.parametros.dat4+ " W";
	
	//elem1=document.getElementById('dat5'+this.Id);
    //elem1.innerHTML=this.parametros.dat5 + " W";
	
	debugger;
	
	
	//var Consumo=this.parametros.dat9 / 0.399;
	elem1=document.getElementById('icono_warning'+this.Id);
	if(this.parametros.dat9==0 && this.parametros.dat10==0)
	{	
		$('#icono_warning'+this.Id).hide();
		
	}
	else
	{
		$('#icono_warning'+this.Id).show();
	}
	
	
	elem1=document.getElementById('TempExterior'+this.Id);
    elem1.innerHTML=this.parametros.dat12+" &deg;C";
	
	//elem1=document.getElementById('dat9'+this.Id);
    //elem1.innerHTML=Consumo.toFixed(2) + " KgCO2";
	debugger;
	//this.EvaluaElmBullet(document.getElementById('dat4'+this.Id),this.parametros.dat4);
	elem1=document.getElementById('dat4'+this.Id);
	if(this.parametros.dat4==0)
		elem1.src="assets/img/icons/ACS_OFF.png";
	else
		elem1.src="assets/img/icons/ACS.png";
	

	if(this.parametros.dat5==0)
		this.set("Estado","APAGADO");
	else
		this.set("Estado","ENCENDIDO");



	this.EvaluaElmBullet(document.getElementById('dat8'+this.Id),this.parametros.dat1);
	elem1=document.getElementById('dat6'+this.Id);
	if(this.parametros.dat17==0)
		elem1.src="assets/img/icons/pump_off.png";
	else
		elem1.src="assets/img/icons/pump.png";
	//this.EvaluaElmBullet(document.getElementById('dat7'+this.Id),this.parametros.dat7);
	elem1=document.getElementById('dat7'+this.Id);
	if(this.parametros.dat18==0)
		elem1.src="assets/img/icons/compressor_off.png";
	else
		elem1.src="assets/img/icons/compressor.png";

	this.EvaluaElmBullet(document.getElementById('dat10'+this.Id),this.parametros.dat2);
	//this.EvaluaElmBullet(document.getElementById('dat11'+this.Id),this.parametros.dat11);
	
	elem1=document.getElementById('dat12'+this.Id);
    elem1.innerHTML=this.parametros.dat3 + " ºC";
	
	//this.EvaluaElmBullet(document.getElementById('dat12'+this.Id),this.parametros.dat12);
	/*elem1=document.getElementById('dat12'+this.Id);
	if(this.parametros.dat12==0)
		elem1.src="./graph/icons/hotstart_off.png";
	else
		elem1.src="./graph/icons/hotstart.png";
	*/
	elem1=document.getElementById('dat13'+this.Id);
	elem1.innerHTML=this.parametros.dat7 + " ºC";
	
	
	this.EvaluaElmBullet(document.getElementById('dat14'+this.Id),this.parametros.dat8);
	
	elem1=document.getElementById('dat15'+this.Id);
    elem1.innerHTML=this.parametros.dat11 + " &deg;C";
	
	elem1=document.getElementById('dat16'+this.Id);
    elem1.innerHTML=this.parametros.dat13 + " &deg;C";
	
	elem1=document.getElementById('dat17'+this.Id);
    elem1.innerHTML=this.parametros.dat14 + " &deg;C";

	elem1=document.getElementById('dat19'+this.Id);
    elem1.innerHTML=this.parametros.dat15 + " &deg;C";

	elem1=document.getElementById('dat20'+this.Id);
    elem1.innerHTML=this.parametros.dat16 + " &deg;C";

	elem1=document.getElementById('dat23'+this.Id);
    elem1.innerHTML=this.parametros.dat21 + " l/h";

	
	elem1=document.getElementById('dat28'+this.Id);
	switch(this.parametros.dat6	)
	{
		case "0" :
			elem1.src="assets/img/icons/frio.png";
			break;
		case "1" :
			elem1.src="assets/img/icons/calor.png";
			break;
		default :
			elem1.src="assets/img/icons/automatico.png";
			break;
		
	}
		
	
	ObjectoGenerico.prototype.Actualizar.call(this);
	
	
}

Altherma.prototype.EvaluaElmBullet=function( elemento , dato)
{
	
	var t_elem1 =elemento;
	switch(dato )
	{
		case "0" :
			t_elem1.src="assets/img/bullet_grey.png";
			break;
		case "1" :
			t_elem1.src="assets/img/bullet_green.png";
			break;
		case "2" :
		default :
			t_elem1.src="assets/img/bullet_yellow.png";
			break;
	}
		
	
	return;
}

/** Funcion de procesamiento de datos recibido, 
*/
Altherma.prototype.ProcesaDatos=function(Parametros,ParametrosTresHoras,flgpPrimeraVez)
{
	console.log("Actualizar datos Obj tipo 2 Id"+this.Id+"\n");
	
		
	var indice =0;
	
	dato=Parametros.data[this.Id+'_dat1'];
	if(dato!=null)
	{
		console.log("Altherma ["+this.Id+"] Dat1 :"+Parametros.data[this.Id+'_dat1']+"\n");
		this.parametros.dat1=dato;
	}
	dato=Parametros.data[this.Id+'_dat2'];
	if(dato!=null)
	{
		console.log("Altherma ["+this.Id+"] Dat2 :"+ Parametros.data[this.Id+'_dat2']+"\n");
		this.parametros.dat2=dato;
	}
	dato=Parametros.data[this.Id+'_dat3'];
	if(dato!=null)
	{
		console.log("Altherma ["+this.Id+"] Dat3 :" +Parametros.data[this.Id+'_dat3']+"\n");
		this.parametros.dat3=dato;
	}
	dato=Parametros.data[this.Id+'_dat4'];
	if(dato!=null)
	{
		console.log("Altherma ["+this.Id+"] Dat4 :" +Parametros.data[this.Id+'_dat4']+"\n");
		this.parametros.dat4=dato;
	}
	dato=Parametros.data[this.Id+'_dat5'];
	if(dato!=null)
	{
		console.log("Altherma ["+this.Id+"] Dat5 :"+ Parametros.data[this.Id+'_dat5']+"\n");
		this.parametros.dat5=dato;
	}
	
	dato=Parametros.data[this.Id+'_dat6'];
	if(dato!=null)
	{
		console.log("Altherma ["+this.Id+"] Dat6 :" +Parametros.data[this.Id+'_dat6']+"\n");
		this.parametros.dat6=dato;
	}
	
	dato=Parametros.data[this.Id+'_dat7'];
	if(dato!=null)
	{
		console.log("Altherma ["+this.Id+"] Dat7 :"+ Parametros.data[this.Id+'_dat7']+"\n");
		this.parametros.dat7=dato;
	}
	
		dato=Parametros.data[this.Id+'_dat8'];
	if(dato!=null)
	{
		console.log("Altherma ["+this.Id+"] Dat8 :"+ Parametros.data[this.Id+'_dat8']+"\n");
		this.parametros.dat8=dato;
	}
	dato=Parametros.data[this.Id+'_dat10'];
	if(dato!=null)
	{
		console.log("Altherma ["+this.Id+"] Dat10 :"+ Parametros.data[this.Id+'_dat10']+"\n");
		this.parametros.dat10=dato;
	}
	
	dato=Parametros.data[this.Id+'_dat11'];
	if(dato!=null)
	{
		console.log("Altherma ["+this.Id+"] Dat11:"+ Parametros.data[this.Id+'_dat11']+"\n");
		this.parametros.dat11=dato;
	}
	
	dato=Parametros.data[this.Id+'_dat12'];
	if(dato!=null)
	{
		console.log("Altherma ["+this.Id+"] Dat12 :"+ Parametros.data[this.Id+'_dat12']+"\n");
		this.parametros.dat12=dato;
	}
	
	dato=Parametros.data[this.Id+'_dat13'];
	if(dato!=null)
	{
		console.log("Altherma ["+this.Id+"] Dat13 :"+ Parametros.data[this.Id+'_dat13']+"\n");
		this.parametros.dat13=dato;
	}
	dato=Parametros.data[this.Id+'_dat14'];
	if(dato!=null)
	{
		console.log("Altherma ["+this.Id+"] Dat14 :"+ Parametros.data[this.Id+'_dat14']+"\n");
		this.parametros.dat14=parseFloat(dato);
	}
	
	dato=Parametros.data[this.Id+'_dat15'];
	if(dato!=null)
	{
		console.log("Altherma ["+this.Id+"] Dat15 :"+ Parametros.data[this.Id+'_dat15']+"\n");
		this.parametros.dat15=parseFloat(dato);
	}
	
	dato=Parametros.data[this.Id+'_dat16'];
	if(dato!=null)
	{
		console.log("Altherma ["+this.Id+"] Dat16 :"+ Parametros.data[this.Id+'_dat16']+"\n");
		this.parametros.dat16=parseFloat(dato);
	}

	dato=Parametros.data[this.Id+'_dat17'];
	if(dato!=null)
	{
		console.log("Altherma ["+this.Id+"] Dat17 :"+ Parametros.data[this.Id+'_dat17']+"\n");
		this.parametros.dat17=parseFloat(dato);
	}
	
	dato=Parametros.data[this.Id+'_dat18'];
	if(dato!=null)
	{
		console.log("Altherma ["+this.Id+"] Dat18 :"+ Parametros.data[this.Id+'_dat18']+"\n");
		this.parametros.dat18=parseFloat(dato);
	}

	dato=Parametros.data[this.Id+'_dat19'];
	if(dato!=null)
	{
		console.log("Altherma ["+this.Id+"] Dat19 :"+ Parametros.data[this.Id+'_dat19']+"\n");
		this.parametros.dat19=parseFloat(dato);
	}
	
	dato=Parametros.data[this.Id+'_dat20'];
	if(dato!=null)
	{
		console.log("Altherma ["+this.Id+"] Dat20 :"+ Parametros.data[this.Id+'_dat20']+"\n");
		this.parametros.dat20=parseFloat(dato);
	}
	
	dato=Parametros.data[this.Id+'_dat21'];
	if(dato!=null)
	{
		console.log("Altherma ["+this.Id+"] Dat21 :"+ Parametros.data[this.Id+'_dat21']+"\n");
		this.parametros.dat21=parseFloat(dato);
	}
	dato=Parametros.data[this.Id+'_dat23'];
	if(dato!=null)
	{
		console.log("Altherma ["+this.Id+"] Dat23 :"+ Parametros.data[this.Id+'_dat23']+"\n");
		this.parametros.dat23=parseFloat(dato);
	}
	
	dato=Parametros.data[this.Id+'_dat25'];
	if(dato!=null)
	{
		console.log("Altherma ["+this.Id+"] Dat25 :"+ Parametros.data[this.Id+'_dat25']+"\n");
		this.parametros.dat25=parseFloat(dato);
	}
	
	dato=Parametros.data[this.Id+'_dat26'];
	if(dato!=null)
	{
		console.log("Altherma ["+this.Id+"] Dat26 :"+ Parametros.data[this.Id+'_dat26']+"\n");
		this.parametros.dat26=dato;
	}
	
	dato=Parametros.data[this.Id+'_dat27'];
	if(dato!=null)
	{
		console.log("Altherma ["+this.Id+"] Dat27 :"+ Parametros.data[this.Id+'_dat27']+"\n");
		this.parametros.dat27=dato;
	}
	
	dato=Parametros.data[this.Id+'_dat28'];
	if(dato!=null)
	{
		console.log("Altherma ["+this.Id+"] Dat28 :"+ Parametros.data[this.Id+'_dat28']+"\n");
		this.parametros.dat28=dato;
	}
	
	
	dato=Parametros.data[this.Id+'_dat29'];
	if(dato!=null)
	{
		console.log("Altherma ["+this.Id+"] Dat29 :"+ Parametros.data[this.Id+'_dat29']+"\n");
		this.parametros.dat29=dato;
		
		//if(this.parametros.dat29==0)
		//	ObjectoGenerico.prototype.set.call(this,"Estado","APAGADO");
		//else
		//	ObjectoGenerico.prototype.set.call(this,"Estado","ENCENDIDO");
	}
	
	if(flgpPrimeraVez=='true')
	{
		
		this.grabacion.StdClima=this.parametros.dat5;
		this.grabacion.ModoClima=this.parametros.dat6;
		this.grabacion.TempClima=this.parametros.dat7;
		this.grabacion.StdACS=this.parametros.dat1;
		this.grabacion.TempACS=this.parametros.dat3;
		debugger;
	}

	this.Actualizar();
	
	return;
}


/** Funcion generica para mostrar el grafico , sin sobrecargar no muestra el formulario
*/
Altherma.prototype.MostrarGraph=function()
{
	window.open ('graph.html?type=1&id='+this.Id,'_self',false);
}


Altherma.prototype.ProcesaDatosPeticion=function(ListaResultado)
{

	return;
}



/** Funcion para mostrar una ventana modal , muestra la ventana de configuracion
*/

Altherma.prototype.MostrarVentanaModal=function()
{
	debugger;
	var elem2=document.getElementById('valor3');
     elem2.innerHTML=this.grabacion.TempClima;
	 
	 var elem3=document.getElementById('valor2');
     elem3.innerHTML=this.grabacion.TempACS;
	
	SetBotonColor("#clima",this.grabacion.StdClima);
	SetBotonColor("#ACS",this.grabacion.StdACS);
	
	SetModo("#modo", this.grabacion.ModoClima);
	
	    
	$("#AlthermaConf").attr('elm',this.Id);
	$('#AlthermaConf').modal('show');
}



Altherma.prototype.FinalizarVentanaModal=function()
{
	debugger;

	this.grabacion.StdClima=GetBotonColor("#clima");
	this.grabacion.StdACS=GetBotonColor("#ACS");
	this.grabacion.ModoClima=GetBotonColor("#modo");

	var elem2=document.getElementById('valor3');
     this.grabacion.TempClima=parseFloat(elem2.innerHTML);
	 
	 var elem3=document.getElementById('valor2');
     this.grabacion.TempACS=parseFloat(elem3.innerHTML);
}

/** Funcion para Tener un evento en la ventana modal  , por defecto no muestra nada 
*/

Altherma.prototype.EventoVentanaModal=function(Evento)
{
	if(Evento==1) // recarga de la ventana 
	{
		var elem2=document.getElementById('valor3');
		elem2.innerHTML=this.grabacion.TempClima;
	 
		var elem3=document.getElementById('valor2');
		elem3.innerHTML=this.grabacion.TempACS;
	
		SetBotonColor("#clima",this.grabacion.StdClima);
		SetBotonColor("#ACS",this.grabacion.StdACS);
	
		SetModo("#modo", this.grabacion.ModoClima);
	}
	return ;
}

/** Funcion generica que indica si hay datos modificado, 
*/
Altherma.prototype.HayDatosCambiados=function()
{
	var retorno="true";
	debugger;
	if(this.grabacion.StdClima==parseInt(this.parametros.dat5) && 
		this.grabacion.ModoClima==parseInt(this.parametros.dat6 )&&
		this.grabacion.TempClima==parseFloat(this.parametros.dat7)&&
		this.grabacion.StdACS==parseInt(this.parametros.dat1) &&
		this.grabacion.TempACS==parseFloat(this.parametros.dat3))
		retorno="false";
	return retorno;
}


/** Funcion para dar los parametros a grabar , por defecto no da ninguno 
*/
Altherma.prototype.DarDatosAGrabar=function()
{
	var salida="\""+this.Id+"_dat1\""+":\""+this.grabacion.StdACS+"\""+
				",\""+this.Id+"_dat3\""+":\""+this.grabacion.TempACS+"\""+
				",\""+this.Id+"_dat4\""+":\""+this.grabacion.StdClima+"\""+
				",\""+this.Id+"_dat5\""+":\""+this.grabacion.ModoClima+"\""+
				",\""+this.Id+"_dat6\""+":\""+this.grabacion.TempClima+"\"";
				
	return salida ;
}


function GetBotonColor(obj)
{
		var retorno=parseInt($(obj).attr("estado"));
		
		return retorno;

}





