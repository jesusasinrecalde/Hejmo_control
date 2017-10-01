
function pad (n, length) {
    var  n = n.toString();
    while(n.length < length)
         n = "0" + n;
	return n;
}

// Devuelve la fecha en formato texto de un fecha en formato numero 
function DarFechaTexto(fecha)
{
	var d = new Date (fecha);

	return  d.getDate()+' '+mesok[d.getMonth()]+'  '+d.getFullYear()+' '+pad(d.getUTCHours(),2)+':'+pad(d.getMinutes(),2);
	  	
}

// Devuelve la fecha en formato texto corto de un fecha en formato numero 
function DarFechaTextoCorta(fecha)
{
	var d = new Date (fecha);

	return  d.getDate()+' '+mesok[d.getMonth()]+'  '+d.getFullYear();
	  	
}

function supportsImports() {
  return 'import' in document.createElement('link');
}


function DarStringFecha(fechaCarriots)
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
	return  d.getDate()+' '+mesok[d.getMonth()]+'  '+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes();

}
