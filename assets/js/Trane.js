

function Trane(idTerm)
{
	"use strict";
	
	ObjectoGenerico.call(this,idTerm,3,"Trane","Trane"+idTerm,false,"#35A127","#D6FFD1","#8B70EE"/*"#370EC8"*/,"#669");
	
	this.Id=idTerm;
	
	
	
	this.parametros={dat1:0, dat2:0 ,dat3: 0,dat4: 0,dat5: 0,dat6:0
						   , dat7: 0,dat8: 0,dat9: 0,dat10:0,dat11:0,dat12:0,dat13:0
					       , dat14:0,dat15:0,dat16:0,dat17:0
					       , dat18:0,dat19:0,dat20:0,dat21:0,dat22:0,dat23:0,dat24:0,dat25:0
						   , dat26:0,dat27:0,dat28:0,dat29:0}; // datos que se recibe del servicio pass
	
	this.grabacion={StdClima:0, ModoClima:0,TempClima:0,StdACS:0,TempACS:0};
		
	var clone = ObjectoGenerico.prototype.ClonaGenerico.call(this,'#Trane');
	debugger;
	
	
	// Elementos graficos propios del objeto
	clone.getElementById("traneModoCalor").id ="traneModoCalor"+this.Id;
	clone.getElementById("traneModoFrio").id ="traneModoFrio"+this.Id;
	clone.getElementById("traneCapacidadReal").id ="traneCapacidadReal"+this.Id;
	clone.getElementById("traneCapacidadReal_porc").id ="traneCapacidadReal_porc"+this.Id;
	clone.getElementById("tranefanA").id ="tranefanA"+this.Id;
	clone.getElementById("tranefanB").id ="tranefanB"+this.Id;
	clone.getElementById("tranefanC").id ="tranefanC"+this.Id;
	clone.getElementById("tranefanD").id ="tranefanD"+this.Id;
	clone.getElementById("tranefanE").id ="tranefanE"+this.Id;
	clone.getElementById("tranefanF").id ="tranefanF"+this.Id;
	clone.getElementById("tranecompA").id ="tranecompA"+this.Id;
	clone.getElementById("tranecompB").id ="tranecompB"+this.Id;
	clone.getElementById("tranecompC").id ="tranecompC"+this.Id;
	clone.getElementById("tranecompD").id ="tranecompD"+this.Id;
	clone.getElementById("tranecompE").id ="tranecompE"+this.Id;
	clone.getElementById("tranecompF").id ="tranecompF"+this.Id;
	
	clone.getElementById("traneTempout").id ="traneTempout"+this.Id;
	clone.getElementById("traneTempin").id ="traneTempin"+this.Id;
	
	clone.getElementById("traneTempC2").id ="traneTempC2"+this.Id;
	clone.getElementById("tranePressC2").id ="tranePressC2"+this.Id;
	
	clone.getElementById("traneTempC1").id ="traneTempC1"+this.Id;
	clone.getElementById("tranePressC1").id ="tranePressC1"+this.Id;
	
	
	clone.getElementById("traneTempCon1").id ="traneTempCon1"+this.Id;
	clone.getElementById("tranePressCon1").id ="tranePressCon1"+this.Id;
	
	clone.getElementById("traneTempCon2").id ="traneTempCon2"+this.Id;
	clone.getElementById("tranePressCon2").id ="tranePressCon2"+this.Id;
	
	clone.getElementById("configuracion").id ="configuracion"+this.Id;
	
	
	//clone.getElementById("icono_warning").id ="icono_warning"+this.Id;
	
	//clone.getElementById("configuracion").id ="configuracion"+this.Id;
	
	//$('.traneaccordion').collapse();
	
	$("#contenedor").append(clone); // se añade el objeto al documento DOM dentro del elemento contenedor ...
	
	
	ObjectoGenerico.prototype.ClonaGenerico_2.call(this);// ... una vez definido el objeto grafico al completo lo incluimos en la pagina 
	
	
	document.getElementById("configuracion"+this.Id).setAttribute("ObjID",this.Id);

	
	this.Actualizar();// Situamos la visualizacion al mismo nivel que el estado del objeto
	
};

Trane.prototype = Object.create(ObjectoGenerico.prototype); 




Trane.prototype.Actualizar=function()
{
	this.VisualizaElmVentilador(1, 1, 1, 1, 1, 1);
	this.VisualizaElmCompresor( 1, 1, 1, 1, 1, 1);
	this.SetColorVentilador('A',"VERDE");
	this.SetColorVentilador('B',"VERDE");
	this.SetColorVentilador('C',"GRIS");
	this.SetColorVentilador('D',"GRIS");
	this.SetColorVentilador('E',"GRIS");
	this.SetColorVentilador('F',"GRIS");
	
	this.SetColorCompresor('A',"VERDE");
	this.SetColorCompresor('B',"GRIS");
	this.SetColorCompresor('C',"GRIS");
	this.SetColorCompresor('D',"GRIS");
	this.SetColorCompresor('E',"GRIS");
	this.SetColorCompresor('F',"GRIS");
	
	this.VisualizaModo("FRIO");
	
	this.SetCapacidad(80);
	ObjectoGenerico.prototype.Actualizar.call(this);
}

Trane.prototype.VisualizaElmVentilador=function(VerA, VerB, VerC, VerD, VerE, VerF)
{
	if(VerA==0)
	{
		$('#tranefanA'+this.Id).hide();
	}
	else
		$('#tranefanA'+this.Id).show();
	
	
	if(VerB==0)
	{
		$('#tranefanB'+this.Id).hide();
	}
	else
		$('#tranefanB'+this.Id).show();

	if(VerC==0)
	{
		$('#tranefanC'+this.Id).hide();
	}
	else
		$('#tranefanC'+this.Id).show();

	if(VerD==0)
	{
		$('#tranefanD'+this.Id).hide();
	}
	else
		$('#tranefanD'+this.Id).show();

	if(VerE==0)
	{
		$('#tranefanE'+this.Id).hide();
	}
	else
		$('#tranefanE'+this.Id).show();

	if(VerF==0)
	{
		$('#tranefanF'+this.Id).hide();
	}
	else
		$('#tranefanF'+this.Id).show();
}

Trane.prototype.VisualizaElmCompresor=function(VerA, VerB, VerC, VerD, VerE, VerF)
{
	if(VerA==0)
	{
		$('#ttranecompA'+this.Id).hide();
		$('#hcompA'+this.Id).hide();
	}
	else
	{
		$('#tranecompA'+this.Id).show();
		$('#hcompA'+this.Id).show();
	}
	
	if(VerB==0)
	{
		$('#tranecompB'+this.Id).hide();
		$('#hcompB'+this.Id).hide();
	}
	else
	{
		$('#tranecompB'+this.Id).show();
		$('#hcompB'+this.Id).show();
	}
	
	if(VerC==0)
	{
		$('#tranecompC'+this.Id).hide();
		$('#hcompC'+this.Id).hide();
	}
	else
	{
		$('#tranecompC'+this.Id).show();
		$('#hcompC'+this.Id).show();
	}
	
	if(VerD==0)
	{
		$('#tranecompD'+this.Id).hide();
		$('#hcompD'+this.Id).hide();
	}
	else
	{
		$('#tranecompD'+this.Id).show();
		$('#hcompD'+this.Id).show();
	}
	
	if(VerE==0)
	{
		$('#tranecompE'+this.Id).hide();
		$('#hcompE'+this.Id).hide();
	}
	else
	{
		$('#tranecompE'+this.Id).show();
		$('#hcompE'+this.Id).show();
	}
	
	if(VerF==0)
	{
		$('#tranecompF'+this.Id).hide();
		$('#hcompF'+this.Id).hide();
	}
	else
	{
		$('#tranecompF'+this.Id).show();
		$('#hcompF'+this.Id).show();
	}
}

Trane.prototype.SetColorVentilador=function(Ventilador,Color)
{
	debugger;
	var elem2=document.getElementById('tranefan'+Ventilador+this.Id) ;
	var Ocolor;
	if(elem2)
	{
	
		if(Color=="ROJO")
		{
			Ocolor="#FF0000";
		}
		else if(Color=="VERDE")
		{
			Ocolor="#00FF26";
		}
		else if(Color=="GRIS")
		{
			Ocolor="#C6C8C9";
		}
	
	$(elem2).css("color",Ocolor);
	}
}

Trane.prototype.SetColorCompresor=function(Compresor,Color)
{
	debugger;
	var elem2=document.getElementById('tranecomp'+Compresor+this.Id) ;
	var Ocolor;
	if(elem2)
	{
	
		if(Color=="ROJO")
		{
			Ocolor="#FF0000";
		}
		else if(Color=="VERDE")
		{
			Ocolor="#00FF26";
		}
		else if(Color=="GRIS")
		{
			Ocolor="#C6C8C9";
		}
	
	$(elem2).css("color",Ocolor);
	}
}

Trane.prototype.VisualizaModo=function(modo)
{
	if(modo=="FRIO")
	{
		$('#traneModoCalor'+this.Id).hide();
		$('#traneModoFrio'+this.Id).show();
	}
	else if(modo=="CALOR")
	{
		$('#traneModoCalor'+this.Id).show();
		$('#traneModoFrio'+this.Id).hide();
	}
}

Trane.prototype.SetCapacidad=function(Capacidad)
{
	var elem1=document.getElementById('traneCapacidadReal'+this.Id);
	
    elem1.innerHTML=Capacidad + "%";
	
	$('#traneCapacidadReal_porc'+this.Id).css('width', Capacidad+'%').attr('aria-valuenow', Capacidad);  
	$('#traneCapacidadReal_porc'+this.Id).append(Capacidad );
}


/** Funcion para mostrar una ventana modal , muestra la ventana de configuracion
*/

Trane.prototype.MostrarVentanaModal=function()
{
	debugger;
	
	    
	
	var elem2=document.getElementById('traneTempAgua');
     elem2.innerHTML=20;
	 
	var elem2=document.getElementById('traneLimiteCorriente');
     elem2.innerHTML=50;
	
	var elem2=document.getElementById('traneTempCalefaccion');
     elem2.innerHTML=40;
	
	
	SetBotonColor("#TraneActDesc",0);
	
	SetModo("#tranemodo", 0);
	
	
	$("#TraneConf").attr('elm',this.Id);
	$('#TraneConf').modal('show');

}

Trane.prototype.FinalizarVentanaModal=function()
{
	debugger;
	//$("#TraneConf").modal('toggle');
	
}



