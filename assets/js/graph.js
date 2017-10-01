 

var bDesplegable=0;
var lineChartData  = { data: []};
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
	
var tablaLlamadas = new Array();
var IterAccionActual=0;
var NumeroIterAcciones=0;
var ValorMaximo=0;
var ValorMinimo=99999999999;
var FechaValorMaximo;
var FechaValorMinimo;

var stringFechaInicio;
var stringFechaFin;


// variables necesarias para la operativa de generar informe por fecha 
var LlamadaCarriots="";
var offset=0;
var flgPrimeraVez;
var Gvalor_inicio=null;
var Gvalor_anterior=null;
var Gvalor_final=0;
var nodoInicio;

// variables necesarias para la operativa de generar informe por fecha con rangos 
var tablaFechas = new Array();
var NumeroFechaInteracciones=0;
var NumeroFechaInteraccionActual=0;

var GData=null;


var TextoGrafico;
var g_key;
var g_device;

var idHejmo=0;



var tablaValoresBruto=null;


window.onload = function() {
	
	debugger;
	
	var parametros =getUrlVars();
	if(parametros.id!=null)
	{
		idHejmo=parametros.id;
	}
	
	g_key=localStorage["hjm_key"];
	g_device=localStorage["hjm_device"];
	if(g_key==null || g_device==null)
	{
		
		$('#login-modal').modal('show');
	}
	else
	{
		
		LanzamientoHejmo();
	}

}

function LanzamientoHejmo()
 {

	$(".desplegable").hide( );
	$('#login-modal').modal('hide');	
	
 

     $('#datetimepicker_from').datetimepicker({
            format : 'YYYY-MM-DD HH:mm',
                        icons : {
               // time: "fa fa-clock-o",
               time: "glyphicon glyphicon-time",
			   // date: "fa fa-calendar",
				date: "glyphicon glyphicon-calendar",
			     up: "glyphicon glyphicon-arrow-up",
                down: "glyphicon glyphicon-arrow-down",
				 locale: 'es-ES'
				 
            },
            useCurrent: false //Important! See issue #1075
        }).on("dp.change", function (e) {
            $('#datetimepicker_to').data("DateTimePicker").minDate(e.date);
        });
        $('#datetimepicker_to').datetimepicker({
            format : 'YYYY-MM-DD HH:mm',
                        icons : {
                //time: "fa fa-clock-o",
                time: "glyphicon glyphicon-time",
				date: "fa fa-calendar",
               // date: "glyphicon glyphicon-calendar",
				up: "glyphicon glyphicon-arrow-up",
                down: "glyphicon glyphicon-arrow-down",
				 locale: 'es-ES'
            },
            useCurrent: false //Important! See issue #1075
        }).on("dp.change", function (e) {
            $('#datetimepicker_from').data("DateTimePicker").maxDate(e.date);
        });


	g_key=localStorage["hjm_key"];
	g_device=localStorage["hjm_device"];
	
    
		
	$("#btn_izddown").hide();
	$("#btn_dchdown").hide();
		
	

	$("#btn_24Horas").addClass('active');
	DarGrafico24horas();
	
}

function DarGrafico24horas()
{
	TextoGrafico="Consumo ultimas 24 horas"
	DarGraficoDiferencia(86400);
}

/* genera el grafico cuya fecha fin es la fecha actual y la fecha inicio es la diferencia expresada en segundos de la fecha fin expresada en segundos
*/
function DarGraficoDiferencia(diferencia)
{
		
	var DateActual = new Date();
		
	var fechaCarriotsFin=Math.abs(DateActual.getTime()/1000);
	var fechaCarriotsInit=fechaCarriotsFin-diferencia;
	
	if(tablaValoresBruto==null)
	{
		tablaValoresBruto=new Array();
	}
	else
		tablaValoresBruto.length=0; // borramos la tabla en bruto
	
	LlamadaCarriots='https://api.carriots.com/streams/?device='+g_device+'&order=-1&created_at_from='+fechaCarriotsInit+'&created_at_to='+fechaCarriotsFin;
	offset=0;
	flgPrimeraVez=1;
	llamarServicioCarriotsFecha();
}

function DarGrafico48Horas()
{
	TextoGrafico="Consumo ultimas 48 horas"
	DarGraficoDiferencia(86400*2);
}

function DarGrafico7dias()
{
	TextoGrafico="Consumo ultimas 48 horas"
	DarGraficoDiferencia(86400*7);
}

function CalculoIterAcciones(numeroIter)
{
	// Inicializacion de las variables globales
	tablaLlamadas.length =0;  // tabla de definicion de iteacciones
	IterAccionActual=0; 
	NumeroIterAcciones=0;
	var division = numeroIter / 1000;
	var parteEntera = parseInt(division);
	var parteDecima = numeroIter % 1000;
	
	var indice=0;
	for(indice=0;indice<parteEntera;indice++)
	{
		tablaLlamadas.push({offset: indice*1000 , maximo: 1000 });
		NumeroIterAcciones++;
	}
	if(parteDecima)
	{
		tablaLlamadas.push({offset: indice*1000 , maximo: parteDecima });
		NumeroIterAcciones++;
	}
	return NumeroIterAcciones;
	
}

function DarGrafico1Mes()
{
	TextoGrafico="Consumo ultimos 30 Dias"
	//CalculoIterAcciones(2016*2);
	//llamarServicioCarriotsNummObjt(2016*2);
	DarGraficoDiferencia(86400*30);
}
// Leer los datos GET de nuestra pagina y devolver un array asociativo (Nombre de la variable GET => Valor de la variable).
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}


function EvntBtnizdup(obj)
{
	debugger;
	$("#cuerpo_izd").hide();
	$("#btn_izddown").show();
	$("#btn_izdup").hide();
}

function EvntBtnizddown(obj)
{
	$("#cuerpo_izd").show();
	$("#btn_izddown").hide();
	$("#btn_izdup").show();
}

function EvntBtndchup(obj)
{
	$("#cuerpo_dch").hide();
	$("#btn_dchdown").show();
	$("#btn_dchup").hide();
}

function EvntBtndchdown(obj)
{
	$("#cuerpo_dch").show();
	$("#btn_dchdown").hide();
	$("#btn_dchup").show();
}

function EvntBtn24Horas(obj)
{
	$("#btn_24Horas").removeClass('active');
	$("#btn_7Dias").removeClass('active');
	$("#btn_30Dias").removeClass('active');
	$("#btn_90Dias").removeClass('active');
	$("#btn_180Dias").removeClass('active');
	$("#btn_365Dias").removeClass('active');
	
	$("#btn_24Horas").addClass('active');
	DesplegarPanelFecha(1);
	DarGrafico24horas();
}
function EvntBtn48Horas(obj)
{
	$("#btn_24Horas").removeClass('active');
	$("#btn_7Dias").removeClass('active');
	$("#btn_30Dias").removeClass('active');
	$("#btn_90Dias").removeClass('active');
	$("#btn_180Dias").removeClass('active');
	$("#btn_365Dias").removeClass('active');
	
	$("#btn_7Dias").addClass('active');
	 DesplegarPanelFecha(1);
	DarGrafico48Horas();

}

function EvntBtn7Dias(obj)
{
	$("#btn_24Horas").removeClass('active');
	$("#btn_7Dias").removeClass('active');
	$("#btn_30Dias").removeClass('active');
	$("#btn_90Dias").removeClass('active');
	$("#btn_180Dias").removeClass('active');
	$("#btn_365Dias").removeClass('active');
	
	$("#btn_30Dias").addClass('active');
	 DesplegarPanelFecha(1);
	DarGrafico7dias();

}

function EvntBtn1Mes(obj)
{
	$("#btn_24Horas").removeClass('active');
	$("#btn_7Dias").removeClass('active');
	$("#btn_30Dias").removeClass('active');
	$("#btn_90Dias").removeClass('active');
	$("#btn_180Dias").removeClass('active');
	$("#btn_365Dias").removeClass('active');
	
	$("#btn_90Dias").addClass('active');
	 DesplegarPanelFecha(1);
	 DarGrafico1Mes();
	
}

function EvntBtn180Dias(obj)
{
	$("#btn_24Horas").removeClass('active');
	$("#btn_7Dias").removeClass('active');
	$("#btn_30Dias").removeClass('active');
	$("#btn_90Dias").removeClass('active');
	$("#btn_180Dias").removeClass('active');
	$("#btn_365Dias").removeClass('active');
	
	$("#btn_180Dias").addClass('active');
	 DesplegarPanelFecha(1);
	
}

function EvntBtn365Dias(obj)
{
	$("#btn_24Horas").removeClass('active');
	$("#btn_7Dias").removeClass('active');
	$("#btn_30Dias").removeClass('active');
	$("#btn_90Dias").removeClass('active');
	$("#btn_180Dias").removeClass('active');
	$("#btn_365Dias").removeClass('active');
	
	$("#btn_365Dias").addClass('active');
     DesplegarPanelFecha(0);
  
	
}
function DesplegarPanelFecha(bControlDesplegable)
{
	if(bControlDesplegable )
	{
		if(bDesplegable==1)
		{
			$(".desplegable").slideUp( 'slow');
			bDesplegable=0;
		}
	}
	else
	{
			
		if(bDesplegable==1)
		{
			$(".desplegable").slideUp( 'slow');
			bDesplegable=0;
		}
		else
		{
			bDesplegable=1;
			$(".desplegable").slideDown( 'slow');
		}
	}

}


function EvntBtnInformeFecha(obj)
{
	BarraProgreso_reset();
	debugger;
	
	
	if(tablaValoresBruto==null)
	{
		tablaValoresBruto=new Array();
	}
	else
		tablaValoresBruto.length=0; // borramos la tabla en bruto
	
	
	
	var DateIni = new Date($('#datetimepicker_from').data('date'));
	var DateFin = new Date($('#datetimepicker_to').data('date'));
	
	
	if(DateIni && DateFin && DateFin.getTime()>=DateIni.getTime())
	{
		// Cabecera del grafico
		TextoGrafico='Consumo '+DateIni.getDate()+' '+mesok[DateIni.getMonth()]+' '+DateIni.getFullYear()+'-'
							   +DateFin.getDate()+' '+mesok[DateFin.getMonth()]+' '+DateFin.getFullYear();
		
		
		var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
		var fechaCarriotsInit=Math.abs(DateIni.getTime()/1000);
		var fechaCarriotsFin=Math.abs(DateFin.getTime()/1000);
		
	
		var totalDias= Math.round(Math.abs((DateIni.getTime() - DateFin.getTime())/(oneDay)));;
		if(totalDias< 30 )
		{
			LlamadaCarriots='https://api.carriots.com/streams/?device='+g_device+'&order=-1&created_at_from='+fechaCarriotsInit+'&created_at_to='+fechaCarriotsFin;
			offset=0;
			flgPrimeraVez=1;
			llamarServicioCarriotsFecha();
		}
		else 
		{
			var multiplicador=1;
			
			if(totalDias<30)
				multiplicador=1;
			else if(totalDias>31 && totalDias<120 )
				multiplicador=1;
			else if(totalDias>121 && totalDias<240 )
			    multiplicador=7; 
			else if(totalDias>241 && totalDias<360 )
			    multiplicador=14;
			else
				multiplicador=28;
			
			var FechaInicio = new Date(DateIni);
			var FechaFin = new Date(DateFin);
			GenerarGraficoRangoFechas(FechaInicio, FechaFin, oneDay*multiplicador );


			
		}
	}
	
}


function GenerarGraficoRangoFechas(FechaInicio, FechaFin, Diferencia )
{
			
			var FechaNum=FechaInicio.getTime();
			var FechaFinNum=FechaFin.getTime();
			
			FechaNum=FechaNum-Diferencia
			
			
// -----------------------------------------------
// Inicializacion de las variables globales
			tablaFechas.length =0;  // tabla de definicion de iteacciones
			NumeroFechaInteracciones=0;
			NumeroFechaInteraccionActual=0;
			
	
			var division = (FechaFin.getTime()-FechaInicio.getTime()) / Diferencia;
			var parteEntera = parseInt(division);
			var parteDecima = (FechaFin.getTime()-FechaInicio.getTime()) % Diferencia;
			debugger;
			var indice=0;
			for(indice=0;indice<=parteEntera;indice++)
			{
				tablaFechas.push({FechaIni: FechaNum  , Valor:0 });
				FechaNum=FechaNum+Diferencia;
				NumeroFechaInteracciones++;
			}
			if(parteDecima)
			{
				tablaLlamadas.push({FechaIni: FechaFinNum , Valor:0 });
				tablaFechas.push({FechaIni: FechaFinNum  , Valor:0 });
				NumeroFechaInteracciones++;
			}
			llamarServicioCarriotsFechaRango();
}



function llamarServicioCarriotsFecha()
{

	//$('#loading').show();
	//$('#load_window').modal('show');
	$("div#divLoading").addClass('show');
	elem1=document.getElementById('CabeceraGrafico');
    elem1.innerHTML="";
	
	flgPrimeraVez=1;
	
	var carriotsURL=LlamadaCarriots+'&offset='+offset;

	//IdObjetoGlobal=idObjeto;
	
	$.ajax({
	beforeSend: function(xhrObj){
        xhrObj.setRequestHeader("Content-Type","application/json");
        xhrObj.setRequestHeader("Accept","application/json");
        xhrObj.setRequestHeader("carriots.apikey",g_key);

		},
    type : "GET",
    url: carriotsURL,
    success: recepcionServicioRESTFecha,
    error : function(jqXHR, status) { 
		
	alert("ERROR :"+jqXHR.responseText+" "+jqXHR.statusText);}
	
});
}

function llamarServicioCarriotsFechaRango()
{
	
	//$('#loading').show();
	//$('#load_window').modal('show');
	
	$("div#divLoading").addClass('show');
	elem1=document.getElementById('CabeceraGrafico');
    elem1.innerHTML="";
	

	var fechaInitCarriots= Math.abs(tablaFechas[NumeroFechaInteraccionActual].FechaIni / 1000);
	var fechaFinCarriots=fechaInitCarriots+2000;
	LlamadaCarriots='https://api.carriots.com/streams/?device='+g_device+'&order=1&created_at_from='+fechaInitCarriots+'&created_at_to='+fechaFinCarriots;
	
	var carriotsURL=LlamadaCarriots;

	$.ajax({
	beforeSend: function(xhrObj){
        xhrObj.setRequestHeader("Content-Type","application/json");
        xhrObj.setRequestHeader("Accept","application/json");
        xhrObj.setRequestHeader("carriots.apikey",g_key);

		},
    type : "GET",
    url: carriotsURL,
    success: recepcionServicioRESTFechaRango,
    error : function(jqXHR, status) { 
		alert("ERROR :"+jqXHR.responseText+" "+jqXHR.statusText);}
		});
}


function recepcionServicioRESTFecha (datosREST)
{
	
	var totalDocuments = datosREST.total_documents;
	var numdatos = datosREST.length;
    var numdatos = datosREST.result.length;
	
	debugger;
	
	// --------------------------------------------------------------------------------------------------
	
	
	var indice=0;
	var nodo;
	for(indice=0;indice<numdatos;indice++)
	{
		nodo=datosREST.result[indice];
		var objetoBruto = new Object (); 
		objetoBruto.fecha = new Date ((nodo.at*1000));
		objetoBruto.data=nodo.data;
		objetoBruto.diferencia=0;
		tablaValoresBruto.push(objetoBruto);
		
	}
	debugger;
	
	
	
	if( numdatos<1000 ) // estamos al final del barrido y hay datos 
	{
		
		if(tablaValoresBruto.length)
		{
			pintaGraficoTablaBruto(0);
		}
		else
			alert("No hay datos en la seleccion");
		
		$("div#divLoading").removeClass('show');
		
	}
	else
	{
		offset+=1000;
		llamarServicioCarriotsFecha();
	}
	
	
	

}

function pintaGraficoTablaBruto(tipografico)
{
	
	var indice=1;
	var valor;
	var valor1;
	var diferencia;
	debugger;
	// primero el calculo de consumo ... 
	for(indice=1;indice<tablaValoresBruto.length;indice++)
	{
		
		valor=parseFloat(tablaValoresBruto[indice-1].data[idHejmo+'_dat9']);
		valor1=parseFloat(tablaValoresBruto[indice].data[idHejmo+'_dat9']);
		if(valor1<valor)
			diferencia=valor-valor1;
		else	
			diferencia=valor1-valor;
		console.log("["+indice+"] Dato "+diferencia);
		tablaValoresBruto[indice].diferencia=diferencia;
	}
	debugger;
	// -------------------------------------------
	//var x = new Date();
	//var currentTimeZoneOffsetInHours = x.getTimezoneOffset()/60;
	//var offsetTime = 3600000*(currentTimeZoneOffsetInHours);
	
	lineChartData.data.length=0; // borramos la tabla del grafico 
	
	// carga de informacion en la tabla de grafico ...
	for(indice=1;indice<tablaValoresBruto.length;indice++)
	{
		//lineChartData.data.unshift({x: tablaValoresBruto[indice].fecha+offsetTime , y: tablaValoresBruto[indice].diferencia }); // se inserta el dato en la tabla ¡¡¡¡ al principio !!!!!
		lineChartData.data.unshift({x: tablaValoresBruto[indice].fecha , y: tablaValoresBruto[indice].diferencia }); // se inserta el dato en la tabla ¡¡¡¡ al principio !!!!!
	}
	
	
	if(tipografico==0)
	{
		pintaGrafico( lineChartData.data );
		pintaPanelIzquierda();
	}
	else if(tipografico==1)
	{
		pintaGraficoRango( lineChartData.data );
		pintaPanelIzquierda();
	}
	
	
}




function recepcionServicioRESTFechaRango (datosREST)
{

	var totalDocuments = datosREST.total_documents;
	var numdatos = datosREST.length;
    var numdatos = datosREST.result.length;
	
	

	var indice = numdatos-1;
	var nodo=datosREST.result[indice];
	//var nodoInicio=datosREST.result[0];

	
	// Se limpia las tablas si es la primera iteraccion-------------
	if(NumeroFechaInteraccionActual==0)
	{
		
		

		lineChartData.data.length=0;
		
		
		// Inicializacion de los valores maximo y minimo de consumo
		ValorMaximo=0;
		ValorMinimo=99999999999;
		FechaValorMaximo="";
		FechaValorMinimo="";
		
		consumoTotal=0;
		
	}
	
		
	if(numdatos)
	{
		
		var indice=0;
		var valor;
		for( indice = 0;indice<numdatos;indice++)
		{
			nodo=datosREST.result[indice];
			valor_dato9=nodo.data[idHejmo+'_dat9'];
			if(valor_dato9!=null) // solo podemos poner una dato si este existe  
			{
				valor = parseFloat(valor_dato9);
				if( valor<9000 && valor>=0)
				{
					Valor=tablaFechas[NumeroFechaInteraccionActual].Valor=parseFloat(valor_dato9);
					console.log("["+NumeroFechaInteraccionActual+"] Dato "+tablaFechas[NumeroFechaInteraccionActual].Valor);
						
					var objetoBruto = new Object (); 
					objetoBruto.fecha = new Date ((nodo.at*1000));
					objetoBruto.data=nodo.data;
					objetoBruto.diferencia=0;
					tablaValoresBruto.push(objetoBruto);
		
	
					break;
				}
			}
		}
		
		
		
	}
	
	
	// -------------------------------------------------------------
    if(NumeroFechaInteraccionActual>=NumeroFechaInteracciones-1) // hemos llegado al final de la busqueda de datos
	{
		
		BarraProgreso_avanza(  NumeroFechaInteraccionActual,  NumeroFechaInteracciones);

		pintaGraficoTablaBruto(1);
		
		$("div#divLoading").removeClass('show');
		
		
	}
	else // en caso de no estar al final se lanza de nuevo la llamada 
	{
		BarraProgreso_avanza(  NumeroFechaInteraccionActual,  NumeroFechaInteracciones);
		NumeroFechaInteraccionActual++;
		llamarServicioCarriotsFechaRango();
	}
	
		

 }   

 function pintaPanelIzquierda()
 {
	 
	var indice=0;

   
  var  VMaximo=0;
  var  VMinimo=99999999999;
  var  FValorMaximo="";
  var  FValorMinimo="";
  var  VConsumoTotal=0;
 
   for(indice=1;indice<tablaValoresBruto.length;indice++)
	{
		if(!isNaN(tablaValoresBruto[indice].diferencia))
		{
			VConsumoTotal+= tablaValoresBruto[indice].diferencia;
			if(VMaximo<tablaValoresBruto[indice].diferencia)
			{
				VMaximo=tablaValoresBruto[indice].diferencia;
				FValorMaximo = DarFechaTexto(tablaValoresBruto[indice].fecha);
			}
	
			if(VMinimo>tablaValoresBruto[indice].diferencia)
			{
				VMinimo=tablaValoresBruto[indice].diferencia;
				FValorMinimo = DarFechaTexto(tablaValoresBruto[indice].fecha);
			}
		}
	}
  

  VisualizaValoresPanelIzd(VMaximo
                           ,FValorMaximo 
						   ,VMinimo
						   ,FValorMinimo
						   ,VConsumoTotal
						   ,DarFechaTexto (tablaValoresBruto[1].fecha)
						   ,DarFechaTexto(tablaValoresBruto[tablaValoresBruto.length-1].fecha)
						   );
  
  return;
 }
 
// Realiza todas las funciones de visualizacion del panel de la izquierda en funcion de la tabla de datos 
function pintaPanelIzd(datos)
{
  var numeroFilas= datos.length;
  var indice=0;
  var registro=null;
   
  var  VMaximo=0;
  var  VMinimo=99999999999;
  var  FValorMaximo="";
  var  FValorMinimo="";
  var  VConsumoTotal=0;
 
  
  for(indice=0;indice<numeroFilas;indice++)
  {
	   registro=datos[indice];
	   VConsumoTotal+=registro.y;
		if(VMaximo<registro.y)
		{
			VMaximo=registro.y;
			FValorMaximo = DarFechaTexto(registro.x);

		}
		
		if(VMinimo>registro.y)
		{
			VMinimo=registro.y;
			FechaValorMinimo = DarFechaTexto(registro.x);
		}
  }

  VisualizaValoresPanelIzd(VMaximo
                           ,FValorMaximo 
						   ,VMinimo
						   ,FValorMinimo
						   ,VConsumoTotal
						   ,DarFechaTexto (datos[0].x)
						   ,DarFechaTexto(datos[datos.length-1].x)
						   );
  
  return;
  
}



 // ---------------------------------------------------------------------------------------------------------------

 function VisualizaValoresPanelIzd(ValorMaximo,FechaValorMaximo,ValorMinimo,FechaValorMinimo,TotalConsumo,strFechaInicio,strFechaFin)
 {
	var elem1=document.getElementById('ConsumoMaximo');
    elem1.innerHTML=ValorMaximo.toFixed(2) + " KwH";
	
	var Consumo;
	var CosteTotal;
	
	elem1=document.getElementById('fecha_consumomaximo');
    elem1.innerHTML=FechaValorMaximo;
	
	Consumo=ValorMaximo.toFixed(2) / 0.399
	elem1=document.getElementById('CarbonMaximo');
    elem1.innerHTML=Consumo.toFixed(2) + " KgCO2";
	
	
	
	elem1=document.getElementById('ConsumoMinimo');
    elem1.innerHTML=ValorMinimo.toFixed(2) + " KwH";
	
	elem1=document.getElementById('fecha_consumominimo');
    elem1.innerHTML=FechaValorMinimo;
	
	Consumo=ValorMinimo.toFixed(2) / 0.399
	elem1=document.getElementById('CarbonMinimo');
    elem1.innerHTML=Consumo.toFixed(2) + " KgCO2";
	
	elem1=document.getElementById('ConsumoTotal');
    elem1.innerHTML=TotalConsumo.toFixed(2) + " KwH";

	Consumo=TotalConsumo.toFixed(2) / 0.399
	elem1=document.getElementById('CarbonTotal');
    elem1.innerHTML=Consumo.toFixed(2) + " KgCO2";
	
	CosteTotal=TotalConsumo.toFixed(2)*0.12;
	elem1=document.getElementById('CosteTotal');
    elem1.innerHTML="Coste : "+CosteTotal.toFixed(2) + " Eur.";
	
	elem1=document.getElementById('CabeceraGrafico');
    elem1.innerHTML=strFechaInicio+"<br/>"+strFechaFin;
 }
 
function pintaGrafico( data )
{
		BarraProgreso_Finaliza();
    	$('#bar_progreso').css('width', '0%');
		
		if(GData==null)
			GData=new Array();
		else
			GData.length=0;
	
		GData=data.slice();
		
		pintaPanelIzd(GData);
		
		var x = new Date();
		var currentTimeZoneOffsetInHours = x.getTimezoneOffset()/60;
        $('#grafico').highcharts({
			
			global:{
				useUTC:false
				
			},
			chart: {
                zoomType: 'x'
            },
            title: {
                text: TextoGrafico
            },
            /*subtitle: {
                text: document.ontouchstart === undefined ?
                        'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
            },*/
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'KwH'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    
					turboThreshold:0
                }
            },
			
            series: [{
                type: 'area',
                name: 'Temperatura',
                data: data
            }]
        });
    
}    
  
  
// ----------------------------------------------------------------------------------
function pintaGraficoRango( data )
{
	BarraProgreso_Finaliza();
	
	if(GData==null)
		GData=new Array();
	else
		GData.length=0;
	
	GData=data.slice();
	
	pintaPanelIzd(GData);
	//pintaGrafico(GData);
	$('#bar_progreso').css('width', '0%');
    $('#grafico').highcharts({
        chart: {
            type: 'spline'
        },
        title: {
            text: TextoGrafico
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
                month: '%e. %b',
                year: '%b'
            },
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'KwH'
            },
            min: 0
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e. %b}: {point.y:.2f} kwh'
        },
		legend: {
                enabled: false
            },
        plotOptions: {
            spline: {
                marker: {
                    enabled: true
                }
            }
        },
		
		series: [{
                type: 'area',
                name: 'Consumo',
                data: data
            }]
    });


}

// ----------------------------------------------------------------------------------  
function SacarConsolaFecha(fecha)
{
	var d = new Date (fecha);
	var FechaTexto = d.getDate()+' '+mesok[d.getMonth()]+'  '+d.getFullYear()+' '+d.getUTCHours()+':'+d.getMinutes();
	console.log(">"+fecha+"["+FechaTexto+"]\n");				
}

function BarraProgreso_reset()
{     
	$('#bar_progreso').css('width', '0%');
	var elem1=document.getElementById('barra_progreso');
    elem1.innerHTML=0+"%";
	$('#bar_progreso').show();
}

function BarraProgreso_Finaliza()
{     
	$('#bar_progreso').css('width', '100%');
	var elem1=document.getElementById('barra_progreso');
    elem1.innerHTML=100+"%";
	$('#bar_progreso').show();
}
function BarraProgreso_avanza(  valorActual,  valorFinal)
{
	//debugger;
	var step= Math.round((valorActual*100)/valorFinal);
	//
	//$('#bar_progreso').css("width: " + step+"%");
	//
	var elem1=document.getElementById('barra_progreso');
    elem1.innerHTML=step+"%";


	 $('#barra_progreso').css('width',step+'%');
     //$('#bar_progreso').text( step+'%');
    
   // bar.text(step + "%");
}

function descargarArchivo(contenidoEnBlob, nombreArchivo) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var save = document.createElement('a');
        save.href = event.target.result;
        save.target = '_blank';
        save.download = nombreArchivo || 'archivo.dat';
        var clicEvent = new MouseEvent('click', {
            'view': window,
                'bubbles': true,
                'cancelable': true
        });
        save.dispatchEvent(clicEvent);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    };
    reader.readAsDataURL(contenidoEnBlob);
};

//Genera un objeto Blob con los datos en un archivo TXT
function generarTexto(datos) {
  var numeroFilas= datos.length;
  var indice=0;
  var registro=null;
  var texto = [];
 
  
   if(tablaValoresBruto!=null)
   {
	   var iNumElementos=parseInt(tablaValoresBruto[0].data['numElem']);
	   var valor;
	   // creacion de la cabecera ....
	   texto.push('FECHA;TEMP');
	   for(var indice=0;indice<iNumElementos;indice++)
	   {
		   valor = tablaValoresBruto[tablaValoresBruto.length-1].data['ID_'+indice];
		   
		   if(valor!=null)
		   {
				var TipoElemento=tablaValoresBruto[tablaValoresBruto.length-1].data['ID_'+indice];
				switch(TipoElemento)
				{
					case "0" : // termostato sistema
						//console.log("Crea elm Termostato sistema ["+indice+"]\n");
						//Tem1= new TermostatoSistena(indice);
						//Tem1.set("Visible",true);
						//tabla_objetos.push(Tem1);
						break;
					case "1" : // datos genericos
						 texto.push(';CONSUMO;TENSION;CORRIENTE;CONTADOR');
						break;
					case "2" : // Altherma
						texto.push(';MODO;CLIMA;ACS;BOMBA;COMPRESOR;DEP ACS;RESIST DEP ACS;TEMP CONSIG ACS;TEMP DEP ACS;TEMP CONSIG CLIMA;ESTD CLIMA;TEMP SAL AGUA;TEMP ICP;TEMP ENTRA AGUA;TEMP REFRIG;FLUJO;TEMP EXT;ALARM');
						break;	
					default :
						break;
				}
		   }
		}
		
		texto.push('\n');
		// cuerpo de datos 
		/*
		objetoBruto.fecha = new Date ((nodo.at*1000));
		objetoBruto.data=nodo.data;
		objetoBruto.diferencia=0;
		*/
		for(indice1=tablaValoresBruto.length-1;indice1>=0;indice1--)
		{
			var d = new Date (tablaValoresBruto[indice1].fecha);
			var FechaTexto = d.getDate()+' '+mesok[d.getMonth()]+'  '+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes();
			texto.push(FechaTexto);
			texto.push(";");
			texto.push(tablaValoresBruto[indice1].temp);
			texto.push(";");
			for(var indice=0;indice<iNumElementos;indice++)
			{
				 valor = tablaValoresBruto[0].data['ID_'+indice];
		   
				if(valor!=null)
				{
					var data= tablaValoresBruto[indice1].data;
					var TipoElemento=data['ID_'+indice];
					
					
					switch(TipoElemento)
					{
						case "0" : // termostato sistema
						break;
					case "1" : // datos genericos
						texto.push(tablaValoresBruto[indice1].diferencia.toString().replace(/\./g,',') );
						texto.push(";");
						texto.push(data[indice+"_dat1"] );
						texto.push(";");
						texto.push(data[indice+"_dat2"] );
						texto.push(";");
						texto.push(data[indice+"_dat9"] );
						
						 //texto.push(';CONSUMO;TENSION;CORRIENTE;CONTADOR');
						break;
					case "2" : // Altherma
						texto.push(data[indice+"_dat6"] );
						texto.push(";");
						texto.push(data[indice+"_dat5"] );
						texto.push(";");
						texto.push(data[indice+"_dat4"] );
						texto.push(";");
						texto.push(data[indice+"_dat17"] );
						texto.push(";");
						texto.push(data[indice+"_dat18"] ); // compresor
						texto.push(";");
						texto.push(data[indice+"_dat1"] );
						texto.push(";");
						texto.push(data[indice+"_dat2"] );
						texto.push(";");
						texto.push(data[indice+"_dat3"] );
						texto.push(";");
						texto.push(data[indice+"_dat11"] ); // temp deposito ACS
						texto.push(";");
						texto.push(data[indice+"_dat7"] );
						texto.push(";");
						texto.push(data[indice+"_dat8"] );
						texto.push(";");
						texto.push(data[indice+"_dat13"] );
						texto.push(";");
						texto.push(data[indice+"_dat14"] );
						texto.push(";");
						texto.push(data[indice+"_dat15"] );
						texto.push(";");
						texto.push(data[indice+"_dat16"] );
						texto.push(";");
						texto.push(data[indice+"_dat21"] );
						texto.push(";");
						texto.push(data[indice+"_dat12"] );
						texto.push(";");
						texto.push("0" ); // Alarma 
						texto.push(";");
						
						//texto.push('MODO;ACS;BOMBA;COMPRESOR;DEP ACS;RESIST DEP ACS;TEMP CONSIG ACS;TEMP DEP ACS;TEMP CONSIG CLIMA;ESTD CLIMA;TEMP SAL AGUA;TEMP ICP;TEMP ENTRA AGUA;TEMP REFRIG;FLUJO;TEMP EXT;ALARM;');
						//texto.push('DTEMP CONSIG CLIMA;ESTD CLIMA;TEMP SAL AGUA;TEMP ICP;TEMP ENTRA AGUA;TEMP REFRIG;FLUJO;TEMP EXT;ALARM;');
						
						break;	
					default :
						break;
					}
				
				
				}
			}
			texto.push("\n");
		}
		
	debugger;
	var obj =tablaValoresBruto[0];
	debugger;
   }
   else
   {
	    texto.push('FECHA;DATO\n');
   
	for(indice=0;indice<numeroFilas;indice++)
	{
	  registro=datos[indice];
	   var d = new Date (registro.x);
	   var FechaTexto = d.getDate()+' '+mesok[d.getMonth()]+'  '+d.getFullYear()+' '+d.getUTCHours()+':'+d.getMinutes();
	   texto.push(FechaTexto);
	   texto.push(";");
	 
	   texto.push(registro.y.toString().replace(/\./g,',') );
	   texto.push("\n");
	}
   }


    //El contructor de Blob requiere un Array en el primer parámetro
    //así que no es necesario usar toString. el segundo parámetro
    //es el tipo MIME del archivo
    return new Blob(texto, {
        type: 'text/plain'
    });
};

function DescargaDatos(obj)
{
	var x = new Date();
	
	var NombreFichero="salida"+x.getFullYear()+x.getMonth()+x.getDate()+x.getHours()+x.getMinutes()+x.getSeconds()+".csv";
    descargarArchivo(generarTexto(GData), NombreFichero); 
	
}
