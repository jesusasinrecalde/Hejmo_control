var TextoMeteo ;

function DatosGenerico(idTerm)
{
	"use strict";
	

	debugger;


	ObjectoGenerico.call(this,idTerm,1,"Consumo","Consumo"+idTerm,false,"#91FF83","#D6FFD1","#63AD5A","#669");
	
	this.Id=idTerm;
	this.parametros={dat1:35.5, dat2:0,dat3:30.5,dat4:0,dat5:0,dat6:0,dat7:0,dat8:0,dat9:0,valor1:"",valor2:0,periodo1:"",consumo2:0,periodo2:"",consumo3:0,periodo3:""}; // datos que se recibe del servicio pass
	//this.configuracion={temperatura:35.5, modo:0, Caption:""}; // datos que se envia al servicio pass , son los que se modifican graficamente
	this.ConsumoHora=new Array(6);
		
	var clone = ObjectoGenerico.prototype.ClonaGenerico.call(this,'#DatosGenerico');
	
	
	// Elementos graficos propios del objeto
	clone.getElementById("CarbonEmitidos").id   ="CarbonEmitidos"+this.Id;
	clone.getElementById("marco_principal").id  ="marco_principal"+this.Id;
	
	clone.getElementById("icono_graph").id ="icono_graph"+this.Id;
	clone.getElementById("icono_consumo").id ="icono_consumo"+this.Id;
	clone.getElementById("consumo_main").id ="consumo_main"+this.Id;
	clone.getElementById("icono_consumo_main").id ="icono_consumo_main"+this.Id;
	clone.getElementById("periodo_main").id ="periodo_main"+this.Id;
	clone.getElementById("coste").id ="coste"+this.Id;
	clone.getElementById("emision").id ="emision"+this.Id;
	clone.getElementById("tension").id ="tension"+this.Id;
	clone.getElementById("corriente").id ="corriente"+this.Id;
	
	clone.getElementById("consumo2").id ="consumo2"+this.Id;
	clone.getElementById("periodo2").id ="periodo2"+this.Id;
	
	clone.getElementById("consumo3").id ="consumo3"+this.Id;
	clone.getElementById("periodo3").id ="periodo3"+this.Id;
	
	
	$("#contenedor").append(clone); // se a�ade el objeto al documento DOM dentro del elemento contenedor ...
	
	document.getElementById("icono_graph"+this.Id).setAttribute( "IdTerm",this.Id.toString());
	
	ObjectoGenerico.prototype.ClonaGenerico_2.call(this);// ... una vez definido el objeto grafico al completo lo incluimos en la pagina 
	
	//llamarServicioCarriotsNummObjt(this.Id,6);
	
	this.Actualizar();// Situamos la visualizacion al mismo nivel que el estado del objeto
	
};

DatosGenerico.prototype = Object.create(ObjectoGenerico.prototype); 

/** centraliza en una una funcion todas los cambios que se produce en el objeto 
*/

DatosGenerico.prototype.Actualizar=function()
{
	//var elem1=document.getElementById('dat1'+this.Id);
    //elem1.innerHTML=this.parametros.dat1+" V";
	
	var elem1=document.getElementById('tension'+this.Id);
    elem1.innerHTML=this.parametros.dat1+" V";
	
	//elem1=document.getElementById('dat2'+this.Id);
    //elem1.innerHTML=this.parametros.dat2+" A";
	
	elem1=document.getElementById('corriente'+this.Id);
    elem1.innerHTML=this.parametros.dat2+" A";
	
	var Consumo=this.parametros.dat9 / 0.399;
	
	elem1=document.getElementById('CarbonEmitidos'+this.Id);
    elem1.innerHTML=this.parametros.dat9.toFixed(2) + " KwH";
	
	elem1=document.getElementById('consumo_main'+this.Id);
    elem1.innerHTML=this.parametros.dat9.toFixed(2) + " KwH";
	
	
	//elem1=document.getElementById('dat9'+this.Id);
    //elem1.innerHTML=Consumo.toFixed(2) + " KgCO2";
	
	elem1=document.getElementById('emision'+this.Id);
    elem1.innerHTML=Consumo.toFixed(2) + " Kg";
	
	var coste = this.parametros.dat9 * 0.12;
	//elem1=document.getElementById('datCoste'+this.Id);
    //elem1.innerHTML=coste.toFixed(2) + " �";
	
	elem1=document.getElementById('coste'+this.Id);
    elem1.innerHTML=coste.toFixed(2) + " &#8364";
	
	elem1=document.getElementById('periodo_main'+this.Id);
    elem1.innerHTML=this.parametros.periodo1;
	//elem1=document.getElementById('dat6'+this.Id);
    //elem1.innerHTML=this.parametros.dat6 +" var";
	
	
	
	//elem1=document.getElementById('dat7'+this.Id);
    //elem1.innerHTML=this.parametros.dat7+ " VA";
	
	//elem1=document.getElementById('dat8'+this.Id);
    //elem1.innerHTML=this.parametros.dat8 +" VA";
	var nivelConsumo = document.getElementById('icono_consumo'+this.Id);
	var nivelConsumo_main = document.getElementById('icono_consumo_main'+this.Id);

	switch(this.parametros.valor2)
	{
		case 0 :
			nivelConsumo.src=     "assets/img/igual.png";
			nivelConsumo_main.src="assets/img/igual.png";
			break;
		
		case 1 :
			nivelConsumo.src=     "assets/img/up.png";
			nivelConsumo_main.src="assets/img/up.png";
			break;
		
		case 2 :
			nivelConsumo.src=     "assets/img/down.png";
			nivelConsumo_main.src="assets/img/down.png";
			break;
		
		default :
			nivelConsumo.src=     "assets/img/igual.png";
			nivelConsumo_main.src="assets/img/igual.png";
			break;
	}
	
	
	elem1=document.getElementById('consumo2'+this.Id);
    elem1.innerHTML=this.parametros.consumo2.toFixed(2) + " KwH";
	
	elem1=document.getElementById('periodo2'+this.Id);
    elem1.innerHTML=this.parametros.periodo2;

	elem1=document.getElementById('consumo3'+this.Id);
    elem1.innerHTML=this.parametros.consumo3.toFixed(2) + " KwH";
	
	elem1=document.getElementById('periodo3'+this.Id);
    elem1.innerHTML=this.parametros.periodo3;

	
	ObjectoGenerico.prototype.Actualizar.call(this);
	
	
}


/** Funcion de procesamiento de datos recibido, 
*/
DatosGenerico.prototype.ProcesaDatos=function(Parametros,ParametrosTresHoras,flgPrimeraVez)
{
	console.log("* Actualizar datos Obj tipo 1 Id"+this.Id+"\n");
	
	var dato=Parametros.data[this.Id+'_dat1'];
	if(dato!=null)
	{
		this.parametros.dat1=parseFloat(dato);
	}
	
	dato=Parametros.data[this.Id+'_dat2'];
	if(dato!=null)
	{
		this.parametros.dat2=parseFloat(dato);
	}

	
/*	dato=Parametros.data[this.Id+'_dat3'];
	if(dato!=null)
	{
		this.parametros.dat3=parseFloat(dato);
	}
*/	
/*
	dato=Parametros.data[this.Id+'_dat4'];
	if(dato!=null)
	{
		this.parametros.dat4=parseFloat(dato);
	}
*/	
	dato=Parametros.data[this.Id+'_dat5'];
	if(dato!=null)
	{
		this.parametros.dat5=parseFloat(dato);
	}
	
	dato=Parametros.data[this.Id+'_dat9'];
	//alert ("recibido " +dato);

	if(dato!=null)
	{
		//var valorInicial=parseFloat(dato);
		var valorInicial=ParametrosTresHoras[0].data[this.Id+'_dat9'];
		var valorfinal1=ParametrosTresHoras[9].data[this.Id+'_dat9'];
		var valorfinal2=ParametrosTresHoras[19].data[this.Id+'_dat9'];
		var valorfinal3=ParametrosTresHoras[29].data[this.Id+'_dat9'];
		var hora1 =DarStringHora(ParametrosTresHoras[0].at);
		var hora2 =DarStringHora(ParametrosTresHoras[9].at);
		var hora3 =DarStringHora(ParametrosTresHoras[19].at);
		var hora4 =DarStringHora(ParametrosTresHoras[29].at);
		//var valorfinal=
		this.parametros.dat9=parseFloat(valorInicial)-parseFloat(valorfinal1);
		var fperiodo1=parseFloat(valorfinal1)-parseFloat(valorfinal2);
		var fperiodo2=parseFloat(valorfinal2)-parseFloat(valorfinal3);
		
		console.log("[0]"+dato+"[1]"+valorfinal1+"[2]"+valorfinal2+"[3]"+valorfinal3+"\n");
		console.log("Consumo"+this.Id+"["+hora1+" "+this.parametros.dat9+"] ["+hora2+" "+fperiodo1+"] ["+hora3+" "+fperiodo2+"]\n");
		this.parametros.valor1=hora1+" "+this.parametros.dat9.toFixed(2)+" "+hora2+" "+fperiodo1.toFixed(2)+" "+hora3+" "+fperiodo2.toFixed(2);
	
		this.parametros.consumo2=fperiodo1;
		this.parametros.periodo2=hora3+" - "+hora2;
	
		this.parametros.consumo3=fperiodo2;
		this.parametros.periodo3=hora4+" - "+hora3;
	
		this.parametros.periodo1=hora2+" - "+hora1;
		if(this.parametros.dat9>fperiodo1)
			this.parametros.valor2=1;
		
		else if(this.parametros.dat9<fperiodo1)
			this.parametros.valor2=2;
		else
			this.parametros.valor2=0;

	//alert ("recibido 1 " +this.parametros.dat9);
	/*	var hora ;
		var dato;
		
		for(var indice=0;indice < 30 ; indice ++)
		{
			dato=ParametrosTresHoras[indice].data[this.Id+'_dat9'];
			hora=DarStringHora(ParametrosTresHoras[indice].at);
			console.log(" "+indice+" "+hora+" "+dato+"\n");
			
		}
	*/
	}
	
	
	
/*	
	dato=Parametros.data[this.Id+'_dat6'];
	if(dato!=null)
	{
		this.parametros.dat6=parseFloat(dato);
	}
*/
/*	
	dato=Parametros.data[this.Id+'_dat7'];
	if(dato!=null)
	{
		this.parametros.dat7=parseFloat(dato);
	}
	
	dato=Parametros.data[this.Id+'_dat8'];
	if(dato!=null)
	{
		this.parametros.dat8=parseFloat(dato);
	}
*/	
	this.Actualizar();
	
	return;
}


/** Funcion generica para mostrar el grafico , sin sobrecargar no muestra el formulario
*/
DatosGenerico.prototype.MostrarGraph=function()
{
	window.open ('graph.html?type=1&id='+this.Id,'_self',false);
}


DatosGenerico.prototype.ProcesaDatosPeticion=function(ListaResultado)
{
	var indice =0;
	var numdatos = ListaResultado.result.length;
	var nodo;
	var dato;
	debugger;
	for(indice=0;indice<numdatos;indice++)
	{
		nodo=ListaResultado.result[indice];
		dato=nodo.data[this.Id+'_dat9'];
		if(dato!=null)
		{
			this.ConsumoHora[indice]=parseFloat(dato);
		}
	}
	
	this.parametros.dat9=this.ConsumoHora[0]-this.ConsumoHora[5];
	this.Actualizar();
	//alert("recibidor :"+ListaResultado.total_documents);
	debugger;
	return;
}

function DarStringHora(fechaCarriots)
{
	var mesok=new Array(12);
	mesok[0]="Enero";
	mesok[1]="Febrero";
	mesok[2]="Marzo";
	mesok[3]="Abril";
	mesok[4]="Mayo";	
	mesok[5]="Junio";
	mesok[6]="Julio";
	mesok[7]="Agosto";
	mesok[8]="Septiembre";
	mesok[9]="Octubre";
	mesok[10]="Noviembre";
	mesok[11]="Diciembre";
    // imprimir fecha y hora 
	var d = new Date (fechaCarriots*1000);
	//return  d.getDate()+' '+mesok[d.getMonth()]+'  '+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes();
	var m=("0" + d.getMinutes()).slice (-2);
	var h=("0" + d.getHours()).slice (-2);
	return  h+':'+m;

}

DatosGenerico.prototype.OnMinimizado=function()
{

		
	$('#icono_consumo'+this.Id).fadeIn(400);	
	$('#CarbonEmitidos'+this.Id).fadeIn(400);
	
	
}

DatosGenerico.prototype.OnMaximizado=function()
{
	$('#icono_consumo'+this.Id).fadeOut(400);
	$('#CarbonEmitidos'+this.Id).fadeOut(400);
}