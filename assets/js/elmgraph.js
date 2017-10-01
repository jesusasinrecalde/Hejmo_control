'use strict'; 
	
function EvnBtnPwd(obj)
{
	 
	$(obj).fadeTo(100, 0.1).fadeTo(200, 1.0);
	var estado=obj.getAttribute('estado');
	var color;
	if(estado)
	{
		if(estado=="1")
		{
			estado="0";
			color="#FF0000";
		}
		else
		{
			estado="1";
			color="#00FF26";
			
		}
		
		obj.setAttribute("estado",estado);
		$(obj).css("color",color);
	}
}


function EvnBajarTemp(obj)
{
	debugger;
	
	var visualiza=obj.getAttribute('visualiza');
	var minimo=obj.getAttribute('min');
	if(visualiza && minimo)
	{	
		var valmin=parseFloat(minimo);
		var elem1=document.getElementById(visualiza);
		var numero = parseFloat(elem1.innerHTML)
		if(numero >minimo)
		{
			$(obj).fadeTo(100, 0.1).fadeTo(200, 1.0);
			numero-=0.5;
			elem1.innerHTML=numero;
		};
	}
	
}

function EvnSubirTemp(obj)
{
	debugger;
	var visualiza=obj.getAttribute('visualiza');
	var maximo=obj.getAttribute('max');
	
	if(visualiza && maximo)
	{	
		var valmax=parseFloat(maximo);
		var elem1=document.getElementById(visualiza);
		var numero = parseFloat(elem1.innerHTML)
		if(numero <valmax)
		{
			$(obj).fadeTo(100, 0.1).fadeTo(200, 1.0);
			numero+=0.5;
			elem1.innerHTML=numero;
		};
	}
}

function SetBotonColor(obj,estado)
{
		var color;
		if(estado==0)
		{
			estado="0";
			color="#FF0000";
		}
		else
		{
			estado="1";
			color="#00FF26";
			
		}
		
		$(obj).attr("estado",estado);
		$(obj).css("color",color);

}

function EvnBtnModo(obj)
{

	$(obj).fadeTo(100, 0.1).fadeTo(200, 1.0);
	var estado=$(obj).attr('estado');
	if(estado)
	{
		if(estado=="0")
		{
			SetModo(obj,"1");
			
		}
		else
		{
			SetModo(obj,"0");
			
		}
		//obj.setAttribute("estado",estado);
	}
}

function SetModo(obj, estado)
{
	debugger;
	var color;
	var objeto=$(obj).attr('id');
	
	var elemento ="#"+objeto+"1";
	
	//var elem1=document.getElementById(objeto+"1");
	if(estado==1)
	{
		$(elemento).removeClass("fa-sun-o");
		$(elemento).addClass("fa-snowflake-o");
		estado="1";
		color="#029FFF";
	}
	else
	{
		estado="0";
		$(elemento).removeClass("fa-snowflake-o");
		$(elemento).addClass("fa-sun-o");
		
		color="#FF0000";
		
	}
	$(obj).attr("estado",estado);
	$(obj).css("color",color);
}
