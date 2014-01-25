
//       1
//    -------
//  4 |     | 2
//    |     |
//    -------
//       3

/*
seguidores

			1   2   3
		12	---------  4
			|		|
		11	|		|  5
			|		|
		10	---------  6
			9	8	7
variable seguid = posicion del seguidor dentro de la ficha entre las 12 posibles.
*/

var CASTILLO = 'castillo';
var CAMINO = 'camino';
var CAMPO = 'campo';

var FichaPropiedades = {
/*0*/		murcam:  {nombre:"murcam", u:CAMPO,    r:CAMPO,    d:CASTILLO, l:CASTILLO, gir: 0},        //media ficha muralla media ficha campo
/*1*/		c3mur: 	 {nombre:"c3mur", u:CAMINO,   r:CAMINO,   d:CAMINO,   l:CASTILLO, gir: 0},         //cruce de 3 caminos con muralla al lado
/*2*/		mur2: 	 {nombre:"mur2", u:CAMPO,    r:CASTILLO, d:CAMPO,    l:CASTILLO, gir: 0},          //una muralla a cada lado de la ficha
/*3*/		m: 		 {nombre:"m", u: CAMPO,   r:CAMPO,    d:CAMPO,    l:CAMPO , gir: 0},               //monasterio
/*4*/  		mc: 	 {nombre:"mc", u:CAMPO,    r:CAMINO,   d:CAMPO,    l:CAMPO, gir: 0},               //monasterio con camino
/*5*/		c4: 	 {nombre:"c4", u:CAMINO,   r:CAMINO,   d:CAMINO,   l:CAMINO, gir: 0},              //cruce de 4 caminos
/*6*/		cc: 	 {nombre:"cc", u:CAMINO,   r:CAMINO,   d:CAMPO,    l:CAMPO, gir: 0},               //camino curva
/*7*/ 		cr: 	 {nombre:"cr", u:CAMPO,    r:CAMINO,   d:CAMPO,    l:CAMINO, gir: 0},              //camino recto
/*8*/ 		c3: 	 {nombre:"c3", u:CAMINO,   r:CAMINO,   d:CAMINO,   l:CAMPO, gir: 0},               //cruce de 3 caminos
/*9*/		ciudad:  {nombre:"ciudad", u:CASTILLO, r:CASTILLO, d:CASTILLO, l:CASTILLO, gir: 0},        //todo ciudad con escudo
/*10*/		ciucam:  {nombre:"ciucam", u:CASTILLO, r:CAMPO,    d:CASTILLO, l:CASTILLO, gir: 0},        //ciudad con un lado de campo
/*11*/		chmur: 	 {nombre:"chmur", u:CASTILLO, r:CAMINO,   d:CASTILLO, l:CASTILLO, gir: 0},   	   //camino hacia muralla
/*12*/		mur2c: 	 {nombre:"mur2c", u:CASTILLO, r:CAMPO,    d:CAMPO,    l:CASTILLO, gir: 0},         //2 murallas en lados contiguos
/*13*/		mur1: 	 {nombre:"mur1", u:CAMPO,    r:CAMPO,    d:CAMPO,    l:CASTILLO, gir: 0},          //1 muralla en un lado y el resto campo
/*14*/		cmur: 	 {nombre:"cmur", u:CAMINO,   r:CAMPO,    d:CAMINO,   l:CASTILLO, gir: 0},          //camino recto con muralla al lado(ini)
/*15*/ 		ccmur: 	 {nombre:"ccmur", u:CAMINO,   r:CAMINO,   d:CAMPO,    l:CASTILLO, gir: 0},         //camino con curva y con muralla al lado
/*16*/		ccmur3:  {nombre:"ccmur3", u:CAMPO,    r:CAMINO,   d:CAMINO,   l:CASTILLO, gir: 0},        //camino con curva y muralla al lado(otro)
/*17*/		ciucam2: {nombre:"ciucam2", u:CASTILLO, r:CAMPO,    d:CASTILLO, l:CAMPO, gir: 0},          //ciudad con 2 lados opuestos de campo
/*18*/		ccmur2:  {nombre:"ccmur2", u:CAMINO,   r:CAMINO,   d:CASTILLO, l:CASTILLO, gir: 0},	 	   //camino con curva con 2 lados de ciudad contiguos
/*19*/ 		chmure:  {nombre:"chmure", u:CASTILLO, r:CAMINO,   d:CASTILLO, l:CASTILLO, gir: 0}, 	   //camino hacia muralla con escudo
/*20*/  	ccmur2e: {nombre:"ccmur2e", u:CAMINO,   r:CAMINO,   d:CASTILLO, l:CASTILLO, gir: 0},       //camino con curva con 2 lados de ciudad,escudo
/*21*/  	murcame: {nombre:"murcame", u:CAMPO,    r:CAMPO,    d:CASTILLO, l:CASTILLO, gir: 0},       //media ficha muralla media ficha campo con escudo
/*22*/  	ciucame: {nombre:"ciucame", u:CASTILLO, r:CAMPO,    d:CASTILLO, l:CASTILLO, gir: 0},       //ciudad con un lado de campo con escudo
/*23*/  	ciucam2e:{nombre:"ciucam2e", u:CASTILLO, r:CAMPO,    d:CASTILLO, l:CAMPO, gir: 0}          //ciudad 2 lados opuestos campo con escudo
}; 

ArFi = _.toArray(FichaPropiedades); //Convertimos lo que tenemos en un Array para poder tratarlo

//Creo el array y luego hago el random del número que le pasamos al array
Aleatorio = function(){
	console.log("Entra en Aleatorio");
	var a = Math.floor(Math.random()*24);
	var Ficha = { 
		nombre: "nada", 
		u: CAMINO, 
		r: CAMINO, 
		d: CAMINO, 
		l: CAMINO, 
		gir:0,
		nomjug: "nada",
	};
	Ficha.nombre = ArFi[a].nombre;
	Ficha.u = ArFi[a].u;
	Ficha.r = ArFi[a].r;
	Ficha.d = ArFi[a].d;
	Ficha.l = ArFi[a].l;
	return Ficha;
};

//Funcion de prueba para comprobar fichas
Prueba = function(A){
	var Ficha = {
		nombre: "nada",
		u: CAMINO,
		r: CAMINO,
		d: CAMINO,
		l: CAMINO,
		gir:0
	};
	Ficha.nombre = ArFi[A].nombre;
	Ficha.u = ArFi[A].u;
	Ficha.r = ArFi[A].r;
	Ficha.d = ArFi[A].d;
	Ficha.l = ArFi[A].l;
	return Ficha;
};

PruebaItera = function(Ficha,rotacion){
	var FichaDev = {
		nombre: "nada",
		u: CAMINO,
		r: CAMINO,
		d: CAMINO,
		l: CAMINO,
		gir:0
	};
	for(i = 0; i < 24; i++){
		if (ArFi[i].nombre == Ficha){
			console.log("ArFi.nombre: " + ArFi[i].nombre + " Ficha: " + Ficha);
			/*FichaDev.nombre = ArFi[i].nombre;
			FichaDev.u = ArFi[i].u;
			FichaDev.r = ArFi[i].r;
			FichaDev.d = ArFi[i].d;
			FichaDev.l = ArFi[i].l;*/
			FichaDev = ArFi[i];
			console.log("Rotacion: " + rotacion);
			if (rotacion == 0){FichaDev.gir = 0}
			if (rotacion == 90){FichaDev.gir = 1}
			if (rotacion == 180){FichaDev.gir = 2}
			if (rotacion == 270){FichaDev.gir = 3}
			console.log("Nombre: " + FichaDev.nombre + "U: " + FichaDev.u + " R: " + FichaDev.r + " D: " + FichaDev.d + " L: " + FichaDev.l + " Ficha.gir: " + FichaDev.gir);
			return FichaDev;
		}
	}
};


//Girar Ficha
GirarFicha = function(Ficha){
	var aux = 0;
	//console.log("giro inicial de: " + Ficha.gir);
	while (Ficha.gir != 0){
		aux = Ficha.l;
		Ficha.l = Ficha.d;
		Ficha.d = Ficha.r;
		Ficha.r = Ficha.u;
		Ficha.u = aux;
		Ficha.gir = Ficha.gir - 1;
	}
	return Ficha;
};
	
//Creamos tablero
CrearTablero = function(){
	var iMax = 50;
	f = new Array();

	for(i = -iMax; i < iMax ; i++){
		f[i] = new Array();
		for(j = -iMax; j < iMax ; j++){
			f[i][j] = 0;
		}
	}
	return f;
};


// Lista de Tableros es una funcion que recoge el identificador de una partida y un Tablero que se
// le pase y los mete en un array.

var Tableros = [];

var ParJugadas = [];

ContadorJugadas = 0;
CuentaTableros = 0;

CrearPart = function(id,longitud){
	//console.log("CrearPart(1)"); 
	encontrado = false;

    for(i=0; i<= ContadorJugadas - 1; i++){ 
		//console.log("CrearPart(2):dentro del for");
		//console.log("CrearPart(3):el id en el array es: " + ParJugadas[i].id);
		if(ParJugadas[i].id == id){
			encontrado = true;
			break; 
		}
	}
	if(encontrado){
		//console.log("CrearPart(4): en el array ParJugadas el id coincide con el que me pasan");
		if (ParJugadas[i].longitud < longitud){
			ParJugadas[i].longitud++;
			return true;
		}else{
			return false;
		}
	}

}


CrearArJug = function(id){
	var Tablero = CrearTablero();
	Tablero[0][0] = Prueba(14);

	var elementos = {
		id: id,
		jugada: 0
	}

	ParJugadas.push(elementos);
	ContadorJugadas++;

	//console.log("--------");
	//console.log("CrearArJug: " + ParJugadas[0].id);
	//console.log("--------"); 

	var partida = {
		id: id,
		tablero: Tablero
	}
	Tableros.push(partida);
	CuentaTableros++;

	//console.log("CrearArJug(1): el id en el tablero es --> " + Tableros[0].id);  
}


//Este Deps lo usaremos para extraer la informacion de la base de datos de como esta actualmente
//el tablero correspondiente a cada identificador

//.......................................
//función añadir jugada nueva en tablero
CrearTabJug = function(id,x,y,ficha,rota){
	var encontrado = false;
	for(i=0; i<= 50;i++){
		if (Tableros[i].partida.id == id){
			encontrado == true;
			break;
		}
	}
	if (rota == 0){ficha.gir = 0}
	if (rota == 90){ficha.gir = 1}
	if (rota == 180){ficha.gir = 2}
	if (rota == 270){ficha.gir = 3}

	if (encontrado){
		Tableros[i].tablero[x][y] = ficha;
	}
	
};


//Autorun para mirar las jugadas nuevas que aparecen e incluirlas en el tablero
Deps.autorun(function(){
	p = Partidas.find({});
	p.forEach(function(partida){
		//console.log("antes de definir j");
		//console.log("la longitud de jugadas es: " + partida.jugadas.length);
		var longitud = partida.jugadas.length;
		console.log("la longitud del array es: " + longitud);
		console.log("el id de la partida es: " + partida._id);
		valor = CrearPart(partida._id,longitud);
		if (valor == true){
			console.log("Se rellena el tablero con jugadas");
			//console.log("longitud jugadas no es cero");
			j = partida.jugadas[longitud - 1];
			//console.log(j);
			CrearTabJug(partida._id, j.x, j.y, j.sprite, j.rotacion, j.scuadrado);   
		}
	});
});

//Procedimiento que mira las posiciones del tablero para ver si se puede colocar la ficha
//Terminología: U: Up, R:Right, D: Down, L:Left. 
colocarficha = function(id_part, Ficha, X, Y, rotacion){
		//Primero extremos el tablero mediante el Id
		console.log("Rotacion: " + rotacion);
		Ficha = PruebaItera(Ficha,rotacion);
		console.log("Nombre: " + Ficha.nombre + "U: " + Ficha.u + " R: " + Ficha.r + " D: " + Ficha.d + " L: " + Ficha.l + " Ficha.gir: " + Ficha.gir);
		Ficha = GirarFicha(Ficha);
		console.log("Nombre: " + Ficha.nombre + "U: " + Ficha.u + " R: " + Ficha.r + " D: " + Ficha.d + " L: " + Ficha.l + " Ficha.gir: " + Ficha.gir);
		var encontrado = false;
		var colocado = true;
		//var id_aux = id;
   
		console.log("ColocarFicha(0)");
		console.log("ColocarFicha(1): el id que me pasan es -------> " + id_part);
		
		console.log("ColocarFicha(2): el id en el tablero es --> " + Tableros[0].id); 

		for(i=0; i<= CuentaTableros - 1;i++){
			console.log("ColocarFicha(3): el id en el tablero es --> " + Tableros[i].id); 
			if(Tableros[i].id == id_part){
				encontrado = true;
				break;
			}
		}
<<<<<<< HEAD
		console.log("Tableros[i].tablero: " + Tableros[0].id);
=======
		console.log("ColocarFicha(4): el valor de encontrado es: " + encontrado );
>>>>>>> ed3b9296936b661adaef0b6ef2220d7ac9d511a4
		if(encontrado){
			Tablero = Tableros[i].tablero;
			console.log("ColocarFicha(5): Se busca");
		}

		console.log("Pos X: " + X + " Pos Y: " + Y);		
		if (Tablero[X][Y] == 0){
			//if ((X != 0 && Y != 0) || (X != 72 && Y != 0) || (Y != 0)){ //En cada una comprobamos las esquinas y los bordes(L-U,U,R-A)
			if (Tablero[X][(Y+1)] != 0){//Arriba
				if (Tablero[X][(Y+1)].d != Ficha.u){
					console.log(Tablero[X][(Y+1)].d + "  " + Ficha.u);
					console.log("ColocarFicha(en el for): colocado es------------->: " + encontrado );
					colocado = false;
				}
			}
			//if ((X != 72 && Y != 0) || (X != 72 && Y != 72) || (X != 0)){// (R-U,R,R-D)
			if (Tablero[(X+1)][Y] != 0){//Derecha
				if (Tablero[(X+1)][Y].l != Ficha.r){
					console.log(Tablero[(X+1)][Y].l + "  " + Ficha.r);
					console.log("ColocarFicha(en el for2): colocado es------------->: " + encontrado );
					colocado = false;
				}				
			}
			//if ((X != 0 && Y != 72) || (X != 72 && Y != 72) || (Y != 72)){//(R-D, D, L-D)
			if (Tablero[X][(Y-1)] != 0){ //Abajo
				if (Tablero[X][(Y-1)].u != Ficha.d){	
					console.log(Tablero[X][(Y-1)].u + "  " + Ficha.d);
					console.log("ColocarFicha(en el for3): colocado es------------->: " + encontrado );
					colocado = false;
				}
			}
			//if ((X != 0 && Y != 0) || (X != 0 && Y != 72) || (X != 0)){//(L-D, L, L-U)
			if (Tablero[(X-1)][Y] != 0){ //Izquierda
				if (Tablero[(X-1)][Y].r != Ficha.l){
					console.log(Tablero[(X-1)][Y].r + "  " + Ficha.l);
					console.log("ColocarFicha(en el for4): colocado es------------->: " + encontrado );
					colocado = false;
				}
			}			
		}

		console.log("ColocarFicha(4): el valor de colocado es: " + colocado);
		return colocado;			
};



//funcion cierra claustro

CierraClaustro = function(Tablero,X,Y){
	var cerrado = false;
	var contador = 0;
	var puntos = 1;

	if(Tablero[X-1][(Y-1)] != 0){
		contador++;
		puntos++;
	}
	if(Tablero[(X)][(Y-1)] != 0){
		contador++;
		puntos++;
	}
	if(Tablero[(X+1)][Y-1] != 0){
		contador++;
		puntos++;
	}
	if(Tablero[(X+1)][(Y)] != 0){
		contador++;
		puntos++;
	}
	if(Tablero[X+1][(Y+1)] != 0){
		contador++;
		puntos++;
	}
	if(Tablero[(X)][(Y+1)] != 0){
		contador++;
		puntos++;
	}
	if(Tablero[(X-1)][Y+1] != 0){
		contador++;
		puntos++;
	}
	if(Tablero[(X-1)][(Y)] != 0){
		contador++;
		puntos++;
	}
	
	//alert("el valor del contador es: " + contador);
	if (contador == 8){
		return [true,puntos]
	}else{
		return [false,puntos]
	}

};




//Funcion a la que se llamara a la hora de poner una ficha y comprobar si se pueden
//atribuir puntos a ese jugador o todavía no para ello tendremos dos objetivos a cumplir:
//			- Se cierra el castillo
//			- Hay algun seguidor en ese castillo
//Num = Posicion del seguidor dentro de la ficha(1..4) Se puede cambiar a como nos lo quieran pasar
//X = Posicion inicial de la ficha eje X.   Y = Posicion inicial de la ficha eje Y. 

CuentaPCamino = function(Tablero, Ficha, Num, X, Y){
	var fincamino = [ //Fichas que cierran camino
		'c3mur',
		'mc',
		'c4',
		'c3',
		'chmur',
		'chmure'
	];
	var contcamino = [ //Fichas que continuan camino
		'cc',
		'cr',
		'cmur',
		'ccmur',
		'ccmur3',
		'ccmur2',
		'ccmur2e'
	];
	
	puntos = 0;
	flag = 0;			 			// 2 fincamino. 
	var arr = [];					//Array con todas las direcciones por las que ya hemos pasado
	constante = 0;
	MeteDirec = function(X, Y){ 	// Diccionario de las posiciones que ha tenido ese camino, para comprobar si hemos retornado al inicio.
		var obj = {
			x: X,
			y: Y
		}
		arr.push(obj);
		constante++;
	};

	//Funcion que nos devuelve si en esa posicion ya hemos estado
	DarDirec = function(X, Y){
		Encontrado = true;
		for (i = 0; i <= constante - 1; i++){
			if (arr[i].x == X && arr[i].y == Y)
				Encontrado = false;
		}
		return Encontrado;
	};

	//Funcion recursiva a la que le voy pasando la ficha siguiente (a partir de la ficha inicial)
	Recursiva = function(Tablero, prohibido, flag, X, Y){
		//console.log("Entra en Recursiva");
		//console.log("La ficha es: " + Tablero[X][Y].nombre + " Posicion: " + X + "," + Y);
		if ((Tablero[X][Y] != 0) && (flag != 2)){ 		// Caso en el que tenemos ficha en esa dirección y todavía no hemos finalizado camino
			puntos = puntos + 1; 						// Si hay ficha, tiene que ser camino y por tanto sumamos puntos
			if (fincamino.indexOf(Tablero[X][Y].nombre) != -1){ 		// Si la ficha está en fincamino ya hemos finalizado el camino
				puntos = puntos + 1; 						
				//console.log("Recursiva Fincamino, Ficha: " + Tablero[X][Y].nombre);
				flag = flag + 1;
			}
			else if(contcamino.indexOf(Tablero[X][Y].nombre) != -1){ // Si la ficha está en contcamino seguimos haciendo recursiva
				if ((Tablero[X][Y].u == 'camino') && (prohibido != 'arriba') && DarDirec(X,Y)){
					puntos = puntos + 1; 						
					Y1 = Y - 1;	
					MeteDirec(X,Y);				
					Recursiva(Tablero, 'abajo', flag, X, Y1);
				}
				if ((Tablero[X][Y].r == 'camino') && (prohibido != 'derecha') && DarDirec(X,Y)){
					puntos = puntos + 1; 						
					X1 = X + 1;
					MeteDirec(X,Y);
					Recursiva(Tablero, 'izquierda', flag, X1, Y);
				}
				if ((Tablero[X][Y].d == 'camino') && (prohibido != 'abajo') && DarDirec(X,Y)){
					puntos = puntos + 1; 						
					Y2 = Y + 1;
					MeteDirec(X,Y);
					Recursiva(Tablero, 'arriba', flag, X, Y2);
				}
				if ((Tablero[X][Y].l == 'camino') && (prohibido != 'izquierda') && DarDirec(X,Y)){
					puntos = puntos + 1; 						
					X2 = X - 1;
					MeteDirec(X,Y);
					Recursiva(Tablero, 'derecha', flag, X2, Y);
				}
			}
		}	
	};

	//Funcion para las fichas iniciales continuas(Con dos posibles direcciones).
	Continua = function(Tablero, Ficha, X, Y){ 
		puntos = puntos + 1;		
		if (Ficha.u == 'camino'){
			Y1 = Y - 1;
			//alert("Cont Ficha arriba: " + Tablero[X][Y1].nombre);
			MeteDirec(X,Y);
			Recursiva(Tablero, "abajo", flag, X, Y1);	
		}
		if (Ficha.r == 'camino') {			
			X1 = X + 1;
			//alert("Cont Ficha derecha: " + Tablero[X1][Y].nombre);
			MeteDirec(X,Y);
			Recursiva(Tablero, "izquierda", flag, X1, Y);
		}
		if (Ficha.d == 'camino') {		
			Y2 = Y + 1;
			//alert("Cont Ficha abajo: " + Tablero[X][Y2].nombre);
			MeteDirec(X,Y);
			Recursiva(Tablero, "arriba", flag, X, Y2);
		}
		if (Ficha.l == 'camino'){			
			X2 = X - 1;
			//alert("Cont Ficha izquierda: " + Tablero[X2][Y].nombre);
			MeteDirec(X,Y);
			Recursiva(Tablero, "derecha", flag, X2, Y);
		}
	};

	// Saber que aquí para probarlo solo van a entrar las fichas que estén en cont y fin camino
	// Comprobamos donde esta la ficha -- 4 Posibilidades (U-R-D-L)
	if(Num == 1){ //Miro Arriba
		if (fincamino.indexOf(Ficha.nombre) != -1){ // Buscamos si la ficha esta en fincamino
			puntos = puntos + 1;		
			flag = flag + 1; 								// Le sumamos uno porque va a ser un extremo del cierra camino(Va a haber dos)
			Y1 = Y - 1; 										// Vamos para arriba
			MeteDirec(X,Y);
			Recursiva(Tablero, "abajo", flag, X, Y1); 		// Llamamos a la funcion Recursiva pasandole la siguiente ficha y donde tiene que ir	
		}
		else if (contcamino.indexOf(Ficha.nombre) != -1){ 	//Aquí le diremos para donde tiene que tirar cada camino
			//alert("Num = 1 contcamino Ficha: " + Ficha.nombre);						
			Continua(Tablero, Ficha, X, Y);
		}		
	}	
	else if (Num == 2){ //Miro Derecha
		if (fincamino.indexOf(Ficha.nombre) != -1){
			puntos = puntos + 1;
			flag = flag + 1;
			X1 = X + 1; //Vamos para la derecha
			MeteDirec(X,Y);
			Recursiva(Tablero, "izquierda", flag, X1, Y);
		}
		else if (contcamino.indexOf(Ficha.nombre) != -1){
			Continua(Tablero, Ficha, X, Y);
		}
	}
	else if (Num == 3){ //Miro Abajo
		if (fincamino.indexOf(Ficha.nombre) != -1){
			puntos = puntos + 1;
			flag = flag + 1;
			Y2 = Y + 1; //Vamos para abajo
			MeteDirec(X,Y);
			Recursiva(Tablero, "arriba", flag, X, Y2);
		}
		else if (contcamino.indexOf(Ficha.nombre) != -1){
			Continua(Tablero, Ficha, X, Y);
		}			
	}
	else if (Num == 4){ //Miro Izquierda
		//console.log("La Ficha es: " + Ficha.nombre);
		if (fincamino.indexOf(Ficha.nombre) != -1){
			puntos = puntos + 1;
			flag = flag + 1;
			X2 = X - 1; //Vamos para la izquierda
			MeteDirec(X,Y);	
			Recursiva(Tablero, "derecha", flag, X2, Y);		
		}
		else if (contcamino.indexOf(Ficha.nombre) != -1){
			Continua(Tablero, Ficha, X, Y);
		}	
	}
	else
		console.log("El Num es incorrecto");
	/*for (i = 0; i <= puntos; i++){
		alert("ArrayPosX: " + arr[i].x);
		alert("ArrayPosY: " + arr[i].y);
	}*/
	arr = [];
	return puntos;
};


//función que comprueba si se ha cerrado el castillo y devuelve la puntuación.
//Para ello dos pasos:
	//ver si se ha cerrado el castillo.
	//ver si hay un caballero en el castillo cerrado.
CierraCastillo = function(Tablero, Ficha, PosSeguidor, X, Y){

	//POSIBLES ESTRUCTURAS DE DATOS A USAR.
	var fichasLadoCastilloConexos =[
		'c3mur',
		'mur1',
		'cmur',
		'ccmur',
		'ccmur3',
		'murcam',
		'ccmur2',
		'ccmur2e',
		'murcame',
		'ciucam2e',
		'ciucam',
		'ciucam2',
		'chmur',
		'chmure',
		'ciucame',
		'ciudad'
	];
	
	var fichas2LadosCierranCastillo =[
		'mur2',
		'mur2c'
	];
	
	var fichasConEscudo = [
		'ciudad',
		'chmure',
		'ccmur2e',
		'murcame',
		'ciucame',
		'ciucam2e'
	];
		
	var arr = [];	//Array con todas las direcciones por las que ya hemos pasado
	var constante = 0; //Con esta constante sabremos cuantas fichas hemos investigado en MeteDirec
	//resultado = TipoCastillo(Ficha.nombre);
	//console.log("Estoy dentro de CierraCastillo");
	//return resultado;
	var Entrar = 0;
	MeteDirec = function(X, Y){         // Diccionario de las posiciones que ha tenido ese camino, para comprobar si hemos retornado al inicio.
		console.log("Metemos direccion: " + X + "," + Y);
    	var obj = {
			x: X,
			y: Y
		}
		arr.push(obj);
		constante++;
		Entrar = 1;
	};

	//Funcion que nos devuelve si en esa posicion ya hemos estado
	DarDirec = function(X, Y){
		Encontrado = true;
		if (Entrar == 1){
			for (i = 0; i <= constante - 1; i++){
				if (arr[i].x == X && arr[i].y == Y)				
					Encontrado = false;
			}
			return Encontrado;
		}		
		else
			return true;
	};
	
	RecursivaSeguidor= function(Ficha, Prohibido,X,Y){
		console.log("                                ");
		if (Tablero[X][Y]!=0){
			console.log("LA FICHA: " + Ficha.nombre + " Coordenadas: X= " + X + "||| Y= " + Y);
			//Points = true;
			if (fichasLadoCastilloConexos.indexOf(Ficha.nombre)!=-1){	//si la ficha esta en este array
				console.log("la ficha "+ Ficha.nombre + " está en el array conexo | CX: " + X + "||| CY: " + Y);
				console.log("DarDirec es: " + DarDirec(X,Y));
				if (DarDirec(X,Y)){
					if ((Ficha.u == "castillo") && (Prohibido != "arriba")){
						Y1=Y-1;						
						MeteDirec(X,Y);
						
						RecursivaSeguidor(Tablero[X][Y1],"abajo",X,Y1);
						//Points = false;
					}		
					if ((Ficha.r=="castillo") && (Prohibido!= "derecha")){
						//if (Points){						
							//MeteDirec(X,Y);
							
						//}
						X1=X+1;
						RecursivaSeguidor(Tablero[X1][Y],"izquierda",X1,Y);
						//Points = false;
					}
					if ((Ficha.d=="castillo") && (Prohibido!= "abajo")){
						//if (Points){						
							//MeteDirec(X,Y);
							
						//}
						Y2=Y+1;
						RecursivaSeguidor(Tablero[X][Y2],"arriba",X,Y2);
						//Points = false;
					}
					if ((Ficha.l=="castillo") && (Prohibido!= "izquierda")){
						//if (Points){					
							//MeteDirec(X,Y);
							
						//}
						X2=X-1;
						RecursivaSeguidor(Tablero[X2][Y],"derecha",X2,Y);
						//Points = false;
					}
				}
			}
			else if (DarDirec(X,Y)){
				console.log("la ficha "+ Ficha.nombre + " está en el array inconexo.");
				
				MeteDirec(X,Y);				
				//console.log("los puntos intermedios en la ficha inconexa " + Ficha.nombre + " son: " + puntos);
			}
		}
		else{
			console.log("El tablero está vacío.");
			//puntos=0;
		}
	};
	
	//tratamos el caso de que llega una ficha con seguidor
	//entramos en el caso de las fichas inconexas
	if (fichas2LadosCierranCastillo.indexOf(Ficha.nombre)!=-1){
		console.log("x e y iniciales "+X+"   "+ Y);
		//tengo que ver las 4 posiciones del seguidor
		if (PosSeguidor==1){
			Y1=Y-1;
			
			MeteDirec(X,Y);
			RecursivaSeguidor(Tablero[X][Y1], "abajo", X, Y1);
		}
		else if (PosSeguidor==2){
			//console.log("posicion del seguidor es: " + PosSeguidor);
			X1=X+1;
			
			MeteDirec(X,Y);
			RecursivaSeguidor(Tablero[X1][Y], "izquierda", X1, Y);
		}
		else if (PosSeguidor==3){
			//console.log("posicion del seguidor es: " + PosSeguidor);
			Y2=Y+1;
			
			MeteDirec(X,Y);
			RecursivaSeguidor(Tablero[X][Y2], "arriba", X, Y2);
		}
		else if (PosSeguidor==4){
			//console.log("posicion del seguidor es: " + PosSeguidor);
			X2=X-1;
			
			MeteDirec(X,Y);
			RecursivaSeguidor(Tablero[X2][Y], "derecha", X2, Y);
		}
	}
	else{
		console.log("La ficha inicial es conexa");
		MeteDirec(X,Y);
		//Points = true;
		if (Ficha.u == "castillo"){
			console.log("Entra Arriba");
			Y1=Y-1;
			
			RecursivaSeguidor(Tablero[X][Y1],"abajo",X,Y1);
			//Points = false;
		}
		if ((Ficha.r=="castillo")){
			console.log("Entra Derecha");
			X1=X+1;
			
			RecursivaSeguidor(Tablero[X1][Y],"izquierda",X1,Y);
			//Points = false;
		}
		if ((Ficha.d=="castillo")){
			console.log("Ficha.nombre: " + Ficha.nombre);
			console.log("Entra Abajo");
			Y2=Y+1;			
				
			RecursivaSeguidor(Tablero[X][Y2],"arriba",X,Y2);
			//Points = false;
		}
		if ((Ficha.l=="castillo")){
			console.log("Entra Izquierda");
			X2=X-1;
			RecursivaSeguidor(Tablero[X2][Y],"derecha",X2,Y);
		}
		
	}

};
