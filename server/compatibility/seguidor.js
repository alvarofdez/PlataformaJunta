/*
//Función para comprobar donde esta el seguidor
PosSeg = function(){



};

ColSeguidor = function(Id, Ficha, PosSeg, x, Y){
	//Aqui buscamos el tablero del que se nos está pidiendo que busquemos si se puede poner seguidor
	Tablero = Tableros[x].id; // Lo hace Alberto que se le da bien
	
	// Para que funcione tenemos que pasar primero la forma de leer los seguidores suya a la nuestra

	//       1
	//    -------
	//  4 |     | 2
	//    |     |
	//    -------
	//       3

	// Primero derivar sabiendo que vamos a tener 3 posibilidades de de posicionar del seguidor
 	if 	(PosSeg == 1)
	 
};
*/

/* Funcion para colocar seguidor en un castillo

	hay que ver si hay otro seguidor de otro jugador ya puesto en ese castillo para decir si se puede poner o no.
	
	Es un esbozo del algoritmo a usar===>>> tengo que hablar con Alberto y Pedro para acabar de concretar
*/
ColocarSeguidorCastillo = function(Id, Ficha, PosSeg, X, Y){
	// Posibles fichas que tengo que comprobar
	//no estoy seguro de que pueda coger los datos de estos arrays. De momento se mantiene
	var FichasLadoCastilloConexos =[
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
	
	var Fichas2LadosCierranCastillo =[
		'mur2',
		'mur2c'
	];
};
