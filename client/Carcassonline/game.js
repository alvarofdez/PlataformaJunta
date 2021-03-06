var nfich = 0; //numero de fichas en el tablero
var esMiTurno=false;
var Terminada=false;
var nmov = 0; //numero de movimientos procesados

Meteor.startup(function(){
});


//Altura y anchura de una ficha
const FICHA_H = 62;
const FICHA_W = 62;
const MAX_JUGADORES = 5;

C_sprites = {
	m: { sx: 253, sy: 44, w: FICHA_W, h: FICHA_H, si:"campo", sc:"campo", sd:"campo",
		ci:"campo", cc:"monasterio", cd:"campo", ii:"campo", ic:"campo", id:"campo"},		//monasterio
	mc: { sx: 331, sy: 44, w: FICHA_W, h: FICHA_H, si:"campo", sc:"campo", sd:"campo",
		ci:"campo", cc:"monasterio", cd:"camino", ii:"campo", ic:"campo", id:"campo"},		//monasterio con camino
	cr: { sx: 563, sy: 44, w: FICHA_W, h: FICHA_H, si:"campo", sc:"campo", sd:"campo",
		ci:"camino", cc:"camino", cd:"camino", ii:"campo2", ic:"campo2", id:"campo2"},		//camino recto
	cc: { sx: 485, sy: 44, w: FICHA_W, h: FICHA_H, si:"campo", sc:"camino", sd:"campo2",
		ci:"campo", cc:"camino", cd:"camino", ii:"campo", ic:"campo", id:"campo"},		//camino curva
	c3: { sx: 640, sy: 44, w: FICHA_W, h: FICHA_H, si:"campo", sc:"camino", sd:"campo2",
		ci:"campo", cc:"no", cd:"camino2", ii:"campo", ic:"camino3", id:"campo3"},		//cruce de 3 caminos
	c4: { sx: 408, sy: 44, w: FICHA_W, h: FICHA_H, si:"campo", sc:"camino", sd:"campo2",
		ci:"camino2", cc:"no", cd:"camino3", ii:"campo3", ic:"camino4", id:"campo4"},		//cruce de 4 caminos
	cmur: { sx: 408, sy: 137, w: FICHA_W, h: FICHA_H, si:"campo", sc:"camino", sd:"campo2",
		ci:"ciudad", cc:"camino", cd:"campo2", ii:"campo", ic:"camino", id:"campo2"},	//camino recto con muralla al 												lado(una de las fichas es la inicial)
	ccmur: { sx: 485, sy: 137, w: FICHA_W, h: FICHA_H, si:"campo", sc:"camino", sd:"campo2",
		ci:"ciudad", cc:"campo", cd:"camino", ii:"campo", ic:"campo", id:"campo"},	//camino con curva(de sc a cd) y 													con muralla al lado
	chmur: { sx: 175, sy: 137, w: FICHA_W, h: FICHA_H, si:"ciudad", sc:"ciudad", sd:"campo",
		ci:"ciudad", cc:"ciudad", cd:"camino", ii:"ciudad", ic:"ciudad", id:"campo2"},	//camino hacia muralla
	chmure: { sx: 21, sy: 230, w: FICHA_W, h: FICHA_H, si:"ciudad", sc:"ciudad", sd:"campo",
		ci:"ciudad", cc:"ciudad", cd:"camino", ii:"ciudad", ic:"ciudad", id:"campo2"},	//camino hacia muralla con escudo
	c3mur: { sx: 98, sy: 44, w: FICHA_W, h: FICHA_H, si:"campo", sc:"camino", sd:"campo2",
		ci:"ciudad", cc:"no", cd:"camino2", ii:"campo", ic:"camino3", id:"campo3"},		//cruce de 3 caminos con 														muralla al lado
	ccmur2: { sx: 717, sy: 137, w: FICHA_W, h: FICHA_H, si:"campo", sc:"camino", sd:"campo2",
		ci:"ciudad", cc:"camino", cd:"camino", ii:"ciudad", ic:"ciudad", id:"campo"},	//camino con curva con 2 lados de 													ciudad contiguos
	ccmur2e: { sx: 98, sy: 230, w: FICHA_W, h: FICHA_H, si:"campo", sc:"camino", sd:"campo2",
		ci:"ciudad", cc:"camino", cd:"camino", ii:"ciudad", ic:"ciudad", id:"campo"},	//camino con curva con 2 lados de 												ciudad contiguos con escudo
	ccmur3: { sx: 562, sy: 137, w: FICHA_W, h: FICHA_H, si:"campo", sc:"campo", sd:"campo",
		ci:"ciudad", cc:"camino", cd:"camino", ii:"campo", ic:"camino", id:"campo2"},	//camino con curva(de ic a cd) y 													muralla al lado(otro)
	murcam: { sx: 21, sy: 44, w: FICHA_W, h: FICHA_H, si:"campo", sc:"campo", sd:"campo",
		ci:"ciudad", cc:"no", cd:"campo", ii:"ciudad", ic:"ciudad", id:"campo"},	//media ficha muralla media ficha 													campo
	murcame: { sx: 176, sy: 230, w: FICHA_W, h: FICHA_H, si:"campo", sc:"campo", sd:"campo",
		ci:"ciudad", cc:"no", cd:"campo", ii:"ciudad", ic:"ciudad", id:"campo"},	//media ficha muralla media ficha 													campo con escudo
	mur2: { sx: 176, sy: 44, w: FICHA_W, h: FICHA_H, si:"campo", sc:"campo", sd:"campo",
		ci:"ciudad", cc:"campo", cd:"ciudad2", ii:"campo", ic:"campo", id:"campo"},		//una muralla a cada lado 														de la ficha
	mur2c: { sx: 253, sy: 137, w: FICHA_W, h: FICHA_H, si:"campo", sc:"ciudad", sd:"campo",
		ci:"ciudad2", cc:"campo", cd:"campo", ii:"campo", ic:"campo", id:"campo"},	//2 murallas en lados contiguos
	mur1: { sx: 330, sy: 137, w: FICHA_W, h: FICHA_H, si:"campo", sc:"campo", sd:"campo",
		ci:"ciudad", cc:"campo", cd:"campo", ii:"campo", ic:"campo", id:"campo"},	//1 muralla en un lado y el resto 													campo
	ciudad: { sx: 21, sy: 137, w: FICHA_W, h: FICHA_H, si:"ciudad", sc:"ciudad", sd:"ciudad",
		ci:"ciudad", cc:"ciudad", cd:"ciudad", ii:"ciudad", ic:"ciudad", id:"ciudad"},	//todo ciudad con escudo
	ciucam: { sx: 98, sy: 137, w: FICHA_W, h: FICHA_H, si:"ciudad", sc:"ciudad", sd:"campo",
		ci:"ciudad", cc:"ciudad", cd:"campo", ii:"ciudad", ic:"ciudad", id:"campo"},	//ciudad con un lado de campo
	ciucame: { sx: 331, sy: 230, w: FICHA_W, h: FICHA_H, si:"ciudad", sc:"ciudad", sd:"campo",
		ci:"ciudad", cc:"ciudad", cd:"campo", ii:"ciudad", ic:"ciudad", id:"campo"},	//ciudad con un lado de campo con 													escudo
	ciucam2: { sx: 640, sy: 137, w: FICHA_W, h: FICHA_H, si:"campo", sc:"ciudad", sd:"campo",
		ci:"campo", cc:"ciudad", cd:"campo", ii:"campo", ic:"ciudad", id:"campo"},	//ciudad con 2 lados opuestos de 													campo
	ciucam2e: { sx: 408, sy: 230, w: FICHA_W, h: FICHA_H, si:"campo", sc:"ciudad", sd:"campo",
		ci:"campo", cc:"ciudad", cd:"campo", ii:"campo", ic:"ciudad", id:"campo"},	//ciudad con 2 lados opuestos de 													campo con escudo
	interrogante: { sx: 253, sy: 230, w: FICHA_W, h: FICHA_H},	//ficha con un interrogante
	s1: { sx: 532, sy: 245, w: 23, h: 23},			//seguidor amarillo
	s2: { sx: 558, sy: 245, w: 23, h: 23},			//seguidor rosa
	s3: { sx: 586, sy: 245, w: 23, h: 23},			//seguidor azul
	s4: { sx: 613, sy: 245, w: 23, h: 23},			//seguidor verde
	s5: { sx: 639, sy: 245, w: 23, h: 23},		//seguidor naranja
	terminar: {sx: 727, sy: 44,w: 58,h: 20},		//Boton de temirnar
	reset: {sx: 727, sy: 70, w:58, h:20},		//Boton de reset
	flecha: {sx: 756, sy: 242, w:44, h:40}		//flecha azul ->
};

var ficha_inicial;
var seguidores = {
		buscarLibre: function(name) {
			return _.find(this[name], function(seg) {
				return !seg.fijado;
			});
		}
};

C_startGame = function() {
	C_Game.setBoard(0,new C_TitleScreen("Carcassonline.", "Haga click para empezar sin esperar a más jugadores.", C_playGame));
	C_Game.autorun2._compute();
}



var puntuaciones;
 
C_playGame = function(){
    puntuaciones = [];
    C_Game.boards.length = 0;
    C_Game.setBoard(C_Game.boards.length, BotonAyuda);
    var jugadores = Partidas.findOne(Session.get("Current_Game")).jugadores;
    var numjugadores = jugadores.length <= MAX_JUGADORES ? jugadores.length:MAX_JUGADORES;
    var numseg;
    var nick;
    for (i=1;i<=numjugadores;i++){
        numseg = new C_NumSeguidores(i);
        C_Game.setBoard(C_Game.boards.length, numseg);
        nick = jugadores[i-1]||"Maquina"+i;
        puntuaciones[nick]= new C_GamePoints(i, nick);
        C_Game.setBoard(C_Game.boards.length, puntuaciones[nick]);
		seguidores[nick] = [];
		for (k=1;k<=7;k++){
			seguidores[nick][k-1] = new C_Seguidor("s"+i, i, numseg, nick);
			C_Game.setBoard(C_Game.boards.length, seguidores[nick][k-1]);
		}
	}
	C_Game.setBoard(C_Game.boards.length,FichaActual);
	FichaActual.nextBoard = C_Game.boards.length;
	C_Game.setBoard(C_Game.boards.length, Turno);
	C_Game.setBoard(C_Game.boards.length, BotonReset);
	C_Game.setBoard(C_Game.boards.length,BotonFinTurno);
	C_Game.setBoard(C_Game.boards.length, new BotonMoverTablero(1000, 570, 0));
	C_Game.setBoard(C_Game.boards.length, new BotonMoverTablero(950, 600, 90));
	C_Game.setBoard(C_Game.boards.length, new BotonMoverTablero(900, 570, 180));
	C_Game.setBoard(C_Game.boards.length, new BotonMoverTablero(950, 540, 270));
	


	ficha_inicial = new Ficha(394, 263,"cmur");
	C_Game.setBoard(C_Game.boards.length, ficha_inicial);
	C_Game.setBoard(C_Game.boards.length,Fondo);
	ficha_inicial.buscar_huecos();
	nmov = 1;
	C_Game.autorun._compute();

	var idpartida=Session.get("Current_Game");
	Meteor.call("VerTurno", idpartida, function(err, results){
		if(err){
			console.log(err.reason);
		}else{
		if (Meteor.user().username==results){
			esMiTurno=true;
		}
	
	}});

}


gestionarMov = function(m) {
	var debajo = C_elemInPos(ficha_inicial.x+m.x*ficha_inicial.w+ficha_inicial.w/2,
						ficha_inicial.y-m.y*ficha_inicial.h+ficha_inicial.h/2, 
						FichaActual.nextBoard);
	if (m.esjugada) {
		if (debajo instanceof Ficha && debajo.sprite === "interrogante"){
			var seg = null;
			if (m.scuadrado && m.szona) seg = seguidores.buscarLibre(m.user);
			debajo.establecer(m.sprite, m.rotacion, seg, m.scuadrado, m.szona);
		}
	} else {
		if(debajo instanceof Ficha && debajo.seguidor) {
			debajo.seguidor.resetear();
			debajo.seguidor = null;
		}	
	}
};

BotonMoverTablero = function(x, y, rotacion) {
	this.x = x;
	this.y = y;
	this.w = 44;
	this.h = 40;
	this.rotacion = rotacion;
	this.sprite = "flecha";
	this.mover = function(x,y) {	}
	this.soltar = function(x,y) {	}
	this.pulsado = function() {
		switch(this.rotacion) {
		case 0:
			desplazarTablero(FICHA_H, 0);
			break;
		case 90:
			desplazarTablero(0, FICHA_W);
			break;
		case 180:
			desplazarTablero(-FICHA_H, 0);
			break;
		case 270:
			desplazarTablero(0, -FICHA_W);
			break;
		}
	}
	this.draw = function(ctx) {
		C_SpriteSheet.draw(ctx,this.sprite,this.x, this.y, 0, 0, rotacion);
	}    
}

BotonAyuda = new function() {
	this.x = 1000;
	this.y = 40;
	this.w = 60;
	this.h = 20;
	this.sprite = "";
	this.mover = function(x,y) {	}
	this.soltar = function(x,y) {	}
	this.pulsado = function() {	
		C_Game.setBoard(0, MenuAyuda);
	}
        this.draw = function(ctx) {
		C_Game.ctx.fillStyle = "#44cbff";
		C_Game.ctx.fillRect(this.x,this.y,this.w,this.h);

		ctx.fillStyle= "#000000";
	    	ctx.font = "bold 13px arial";
	    	ctx.fillText("Ayuda", this.x+18, this.y+15);	
	}    
}

Turno = new function() {
	this.name="";
	this.mover = function(x,y) {	}
	this.soltar = function(x,y) {	}
	this.pulsado = function() {	}
	this.draw = function(ctx) {
		if(esMiTurno){
			ctx.fillStyle= "#ffffff";
			ctx.font = "bold 16px arial";
			ctx.fillText("Es tu turno", 900, 40);
		}else{
			ctx.font = "bold 16px arial";
			ctx.fillStyle= "#ffffff";
			ctx.fillText("Es el turno de", 880, 40);
			ctx.fillText(this.name, 880, 55);
		}
	}
	this.cambiarNick = function(nick){
		this.name=nick;
	}

}
MenuAyuda = new function(){
	this.x = 0;
	this.y = 0;
	this.w = 1070;
	this.h = 650;
	this.sprite = "";
	this.mover = function(x,y) {	}
	this.soltar = function(x,y) {	}
	this.pulsado = function() {C_Game.setBoard(0, BotonAyuda);}
        this.draw = function(ctx) {
			ctx.fillStyle = "#FFFFFF";
			ctx.textAlign = "center";
	
			C_Game.ctx.fillStyle = "#000000";
			C_Game.ctx.fillRect(0,0,1070,650);

			ctx.fillStyle= "#c9c9c9";
			ctx.font = "bold 40px arial";
			ctx.fillText("Menú de ayuda", C_Game.width/2, 50);

			ctx.textAlign = "left";
			ctx.font = "bold 22px arial";
			ctx.fillText("1 Pulsa sobre la ficha '?' en el menú de la derecha en tu turno", 30, 100);
			ctx.fillText("2 Para rotar la ficha pincha sobre ella mientras esté en la barra", 30, 130);
			ctx.fillText("3 Para colocar la ficha girada muévela hasta una casilla '?' o pincha sobre dicha casilla*", 30,160);
			ctx.fillText("4 Para colocar un seguidor muévelo hasta la ficha que acabas de poner o pincha sobre ella en",30, 190);
			ctx.fillText("   la posición deseada*", 30, 220);
			ctx.fillText("5 Para terminar el turno pulsar sobre el botón de Terminar", 30,250);
			ctx.fillText("Para mover el tablero pincha sobre él y desplázalo o utiliza las flechas del menú*", 30,300);
			ctx.fillText("*En pantallas táctiles no se puede arrastrar, se debe jugar pulsando", 30,350);
        }

}

C_TitleScreen = function C_TitleScreen(title,subtitle,callback) {
    
	this.x = 0;
	this.y = 0;
	this.w = 1070;
	this.h = 650;
	this.sprite = "";
	this.jugadores = Partidas.findOne(Session.get("Current_Game")).jugadores;

	this.mover = function(x,y) {	}
	
	this.soltar = function(x,y) {	}

	this.pulsado = function() {
		//Si esta observando la partida o si solo hay un jugador no puede empezar
		if (this.jugadores.indexOf(Meteor.user().username) >= 0 && this.jugadores.length > 1) {
			Meteor.call("EmpezarPartida", Session.get("Current_Game"));
			callback();
		}
	}
	
	//Si estan todos los jugadores se empieza (para el caso de todos jugadores maquina)
	if(this.jugadores.length >= MAX_JUGADORES) {
		this.pulsado();
	} 

	this.draw = function(ctx) {
		ctx.fillStyle = "#FFFFFF";
		ctx.textAlign = "center";

		C_Game.ctx.fillStyle = "#000000";
		C_Game.ctx.fillRect(0,0,C_Game.width,C_Game.height);
		ctx.fillStyle= "#c9c9c9";
		ctx.font = "bold 100px arial";
		ctx.fillText(title,C_Game.width/2, 150);
		ctx.font = "bold 40px arial";

		ctx.textAlign = "left";
		if (this.jugadores.length > 1) ctx.fillText(subtitle,20, 230);
		ctx.font = "bold 40px arial";
		
		ctx.fillText("Jugadores actuales:", 20, 300);
		
		ctx.font = "bold 30px arial";
		var nick;
		for (i = 0; i<this.jugadores.length; i++) {
			nick = this.jugadores[i]||"Maquina"+i;
			ctx.fillText(nick,30,360 + 50*i);
		}
	}
}

BotonReset = new function() {
	this.x = 940;
	this.y = 120;
	this.w = 58;
	this.h = 20;
	this.sprite = "reset";

	this.mover = function(x,y) {	}
	
	this.soltar = function(x,y) {	}

	this.pulsado = function() {
		var sprite = FichaActual.sprite;
		FichaActual.resetear();
		FichaActual.sprite = sprite;
	}

	this.draw = function(ctx) {
		C_SpriteSheet.draw(ctx,this.sprite,this.x, this.y);
	}	
}

BotonFinTurno = new function() {
	this.x = 940;
	this.y = 200;
	this.w = 58;
	this.h = 20;
	this.sprite = "terminar";

	this.mover = function(x,y) {	}
	
	this.soltar = function(x,y) {	}

	this.pulsado = function() {
		if (FichaActual.seHaMovido()) {
			var debajo = C_elemInPos(FichaActual.x+FichaActual.w/2, 
						FichaActual.y+FichaActual.h/2, FichaActual.nextBoard);
			if (debajo instanceof Ficha && debajo.sprite === "interrogante"){
				var scuadrado = null;
				var szona = null;

				if (FichaActual.seguidor) {
					scuadrado = FichaActual.seguidor.cuadrado;
					szona = FichaActual.seguidor.zona;
				}
				Meteor.call('RegistrarMovimiento', Session.get("Current_Game"),
									Meteor.user().username, {user: Meteor.user().username,
									sprite: FichaActual.sprite, rotacion: FichaActual.rotacion, 
									x: debajo.coordenadas.x , y: debajo.coordenadas.y, 
									scuadrado: scuadrado, szona: szona, esjugada:true});
				FichaActual.resetear();
			
				
				

			}
		}
	}

	this.draw = function(ctx) {
		C_SpriteSheet.draw(ctx,this.sprite,this.x, this.y);
	}	
}

Fondo = new function() {
	this.x = 0;
	this.y = 0;
	this.w = 1070;
	this.h = 650;
	this.sprite = "";
	this.tablero_w = 850;
	this.separacion = 20;
	this.menu_w = this.w-this.tablero_w-this.separacion;

	this.mover = function(x,y) {	}
	
	this.soltar = function(x,y) {	}

	this.pulsado = function() {	}
	this.draw = function(){
		// Dibujar rectangulo azul
		C_Game.ctx.fillStyle = "#44cbff";
		C_Game.ctx.fillRect(0,0,this.tablero_w,this.h);

		//Dibujar barra separadora
		C_Game.ctx.fillStyle = "#c9c9c9";
		C_Game.ctx.fillRect(this.tablero_w,0,this.separacion,this.h);

		//Dibujar barra-menu
		C_Game.ctx.fillStyle = "#000000";
		C_Game.ctx.fillRect(this.tablero_w+this.separacion,0,this.menu_w,this.h); 
	}
}

Ficha = function(x, y, sprite) {
	this.x = x;
	this.y = y;
	this.w = FICHA_W;
	this.h = FICHA_H;
	this.sprite = sprite;
	this.rotacion=0;
	this.seguidor = null;

	this.coordenadas = {x: !ficha_inicial ? 0:(this.x-ficha_inicial.x)/this.w,
						y: !ficha_inicial ? 0:(ficha_inicial.y-this.y)/this.h};
	

	
	//busca en las posiciones adyacentes de una ficha colocada, y si no hay ninguna ficha, 
	//pone la ficha "interrogante".
	this.buscar_huecos = function(){
		
		var derecha = C_elemInPos(this.x+3/2*this.w, this.y +this.h/2,
								FichaActual.nextBoard);
		
		if(derecha === null || derecha === Fondo){
			var ficha = new Ficha(this.x+this.w, this.y, "interrogante");
			C_Game.setBoard(C_Game.boards.length-1,ficha);
			C_Game.setBoard(C_Game.boards.length,Fondo);
		}	
		
		var izquierda = C_elemInPos(this.x-this.w/2, this.y+this.h/2);
		if(izquierda === null || izquierda === Fondo){
			var ficha = new Ficha(this.x-this.w, this.y, "interrogante");
			C_Game.setBoard(C_Game.boards.length-1,ficha);
			C_Game.setBoard(C_Game.boards.length,Fondo);
		}
		
		var arriba = C_elemInPos(this.x+this.w/2, this.y-this.h/2);
		if(arriba === null || arriba === Fondo){
			var ficha = new Ficha(this.x, this.y-this.h, "interrogante");
			C_Game.setBoard(C_Game.boards.length-1,ficha);
			C_Game.setBoard(C_Game.boards.length,Fondo);
		}
		var abajo = C_elemInPos(this.x+this.w/2, this.y+3/2*this.h);
		if(abajo === null || abajo === Fondo  || abajo===FichaActual){
			var ficha = new Ficha(this.x, this.y+this.h, "interrogante");
			C_Game.setBoard(C_Game.boards.length-1,ficha);
			C_Game.setBoard(C_Game.boards.length,Fondo);
		}
	}
	
	this.pulsado_en = {x:0, y:0};
	this.mover = function(x,y) {
		if (this.pulsado_en.x === 0 && this.pulsado_en.y === 0) {
			this.pulsado_en = {x: x, y: y};	
		} else {
			//En cuanto se sale del menu el raton ya no se mueve mas
			//Tambien evita que puedas mover pulsando sobre la parte del
			// tablero que estaría sobre el menu pero que no se pinta
			if(this.pulsado_en.x < Fondo.tablero_w) {
				desplazarTablero(x-this.pulsado_en.x,y-this.pulsado_en.y);
				this.pulsado_en = {x: x, y: y};
			}
		}
	}
	
	this.soltar = function(x,y) {
		if(this.pulsado_en.x < Fondo.tablero_w) {
			desplazarTablero(x-this.pulsado_en.x,y-this.pulsado_en.y);
		}
		this.pulsado_en = {x:0, y:0};
	}

	this.pulsado = function(x, y) {
		if (this.sprite === "interrogante") FichaActual.soltar(this.x+this.w/2,this.y+this.h/2);
	}

	//Si se sale del espacio del tablero no se pinta la parte que
	// sale de la pantalla
	this.draw = function(ctx) {
		var sw = this.w;
		var dibujar = true;
		if (this.x+this.w > 850) {
			var dif = 850 - this.x;
			if (dif < 0) {
				dibujar = false;
			} else {
				sw = dif;
			}
			
		}
		if(dibujar) C_SpriteSheet.draw(ctx,this.sprite,this.x, this.y, sw,0,this.rotacion);
	}

	this.establecer = function(sprite, rotacion, seguidor, scuadrado, szona) {
		this.sprite = sprite;
		this.rotacion = rotacion;
		this.buscar_huecos();
		this.seguidor = seguidor;
		if (seguidor) seguidor.establecer(scuadrado, szona, this);
	}
}

//Es un singleton
FichaActual = new function() {
	this.h = FICHA_H;
	this.w = FICHA_W;
	this.inicialx = 940;
	this.inicialy = 120;
	this.x = 940;
	this.y = 120;
	this.sprite = 'interrogante';
	this.nextBoard = 0;
	this.seguidor=null;
	this.rotacion = 0;
	this.cuadrado = 0;
	//Devuelve true si se gira la ficha
	this.pulsado = function(x,y) {
		
		if(!Terminada){
			

			if (this.sprite === 'interrogante' && esMiTurno) {
				Meteor.call('ActualizaFicha', Session.get("Current_Game"));		
				return true;
			}

			if (!this.seHaMovido() && esMiTurno){
				if (this.rotacion === 270)
					this.rotacion = 0;
				else
					this.rotacion+=90;
			} else {
				//Si se pulsa sobre la ficha actual colocada se coloca un seguidor
				var seg = this.seguidor || seguidores.buscarLibre(Meteor.user().username);
				if (seg) seg.soltar(x,y);

			}
			return false;
		}
	}
	//tendra que informar al resto de clientes que ficha le ha salido a este jugador
	//tiene que comprobar que el que hace click es el jugador al que le toca jugar, si no no puede mover

	//Funcion para ver si las coordenadas que se le pasa estan sobre la FichaActual.
	this.EstaEn = function(x, y){
		if (x>=this.x && x<=this.x+FICHA_H && y>=this.y && y<=this.y+FICHA_W 
				&& this.x!=this.inicialx && this.y!=this.inicialy){
			return true;
		}else{
			return false;
		}
	}
	
	//Devuelve true si no esta en la posicion inicial
	this.seHaMovido = function() {
		return (this.x !== this.inicialx || this.y !== this.inicialy);
	}
	
	this.moviendo = false;
	this.mover = function(x,y) {
		this.moviendo = true;
		if (this.sprite !== 'interrogante' && esMiTurno) {
			this.x = x - this.w/2;
			this.y = y - this.h/2;
			if (this.seguidor){	
				this.seguidor.resetear();
				this.seguidor=null;
			}
		}
	}

	this.soltar = function(x,y) {
		if (this.sprite !== "interrogante" && esMiTurno) {
			var debajo = C_elemInPos(x,y, this.nextBoard);
			if (debajo instanceof Ficha && debajo.sprite === "interrogante"){
				var id = Session.get("Current_Game");
				Meteor.call('ColocaFicha',id,this.sprite,debajo.coordenadas.x, 
				debajo.coordenadas.y,this.rotacion,function(err, result){

					if(err){
      						console.log(err.reason);
   					}else{
   						if (result===true){
							FichaActual.x=debajo.x;
							FichaActual.y=debajo.y;
						}else {
							FichaActual.x=FichaActual.inicialx;
							FichaActual.y=FichaActual.inicialy;
						}   						
    					}});    					
					
			} else {	
				this.x = this.inicialx;
				this.y = this.inicialy;	
			}
			if (this.seguidor){	
				this.seguidor.resetear();
				this.seguidor=null;
			}
		}
		this.moviendo = false;
	}

	this.draw = function(ctx) {
		var dibujar = true;
		var sw = this.w;
		//Si esta colocada en el tablero y se sale del espacio del tablero no 
		//se pinta la parte que sale de la pantalla
		if (!this.moviendo && this.seHaMovido() && this.x+this.w > 850) {
			var dif = 850 - this.x;
			if (dif < 0) {
				dibujar = false;
			} else {
				sw = dif;
			}	
		}
		if (dibujar) C_SpriteSheet.draw(ctx,this.sprite,this.x,this.y,sw,0,this.rotacion);
	}
	
	this.resetear = function() {
		this.sprite = "interrogante";
		this.x = this.inicialx;
		this.y = this.inicialy;
		if(this.seguidor) this.seguidor.resetear();
		this.seguidor=null;
		this.rotacion=0;	
	}
	
	this.actualizar = function(){
		var idpartida=Session.get("Current_Game");
		Meteor.call("UltimaFicha", idpartida, function(err, results){
			if(err){
				console.log(err.reason);
			}else{
				if(results) {
					console.log("results:" +results);
					if (results === "findeljuego") {
						if (Partidas.findOne(idpartida).estado !== "Terminada")
							Meteor.call("TerminarPartida", Session.get("Current_Game"));
					} else {
						FichaActual.sprite = results;
					}
				}		
			}
		});
	}
	
	this.pintarRejilla = function(){
		
		C_Game.ctx.fillStyle = "#000000";
		C_Game.ctx.strokeRect(this.x,this.y,this.h/3,this.w/3);
		C_Game.ctx.fillStyle = "#000000";
		C_Game.ctx.strokeRect(this.x+this.h/3,this.y,this.h/3,this.w/3);
		C_Game.ctx.fillStyle = "#000000";
		C_Game.ctx.strokeRect(this.x+2*this.h/3,this.y,this.h/3,this.w/3);
		C_Game.ctx.fillStyle = "#000000";
		C_Game.ctx.strokeRect(this.x,this.y+this.w/3,this.h/3,this.w/3);
		C_Game.ctx.fillStyle = "#000000";
		C_Game.ctx.strokeRect(this.x+this.h/3,this.y+this.w/3,this.h/3,this.w/3);
		C_Game.ctx.fillStyle = "#000000";
		C_Game.ctx.strokeRect(this.x+2*this.h/3,this.y+this.w/3,this.h/3,this.w/3);
		C_Game.ctx.fillStyle = "#000000";
		C_Game.ctx.strokeRect(this.x,this.y+2*this.w/3,this.h/3,this.w/3);
		C_Game.ctx.fillStyle = "#000000";
		C_Game.ctx.strokeRect(this.x+this.h/3,this.y+2*this.w/3,this.h/3,this.w/3);
		C_Game.ctx.fillStyle = "#000000";
		C_Game.ctx.strokeRect(this.x+2*this.h/3,this.y+2*this.w/3,this.h/3,this.w/3);
		
	}

};


C_Seguidor = function(sprite, numjugador, contador, nick) {
	
	this.inicialx=900;
	this.inicialy=200;
	if(numjugador){
		this.inicialy=this.inicialy + numjugador*60;
	}
	this.h = 23;
	this.w = 23;
	this.x=this.inicialx;
	this.y=this.inicialy;
	this.sprite=sprite;
	this.zona="";
	this.restado = false;
	this.fijado = false;
	this.contador = contador;
	this.nick = nick;
	
	this.pulsado = function() {}
	//tiene que comprobar que el que hace click es el jugador al que le toca jugar, si no no puede mover

	this.moviendo = false;

	
	this.recalcular = function(ficha) {
		switch(this.cuadrado){
		case 1:
			this.x=ficha.x;
			this.y=ficha.y;
			if (!ficha.rotacion)
				this.zona=C_sprites[ficha.sprite].si;
			else if (ficha.rotacion === 90)
				this.zona=C_sprites[ficha.sprite].ii;
			else if (ficha.rotacion === 180)
				this.zona=C_sprites[ficha.sprite].id;
			else if (ficha.rotacion === 270)
				this.zona=C_sprites[ficha.sprite].sd;
			break;

		case 2:
			this.x=ficha.x+ficha.h/3;
			this.y=ficha.y;
			if (!ficha.rotacion)
				this.zona=C_sprites[ficha.sprite].sc;
			else if (ficha.rotacion === 90)
				this.zona=C_sprites[ficha.sprite].ci;
			else if (ficha.rotacion === 180)
				this.zona=C_sprites[ficha.sprite].ic;
			else if (ficha.rotacion === 270)
				this.zona=C_sprites[ficha.sprite].cd;
			break;	
		
		case 3:
			this.x=ficha.x+2*ficha.h/3;
			this.y=ficha.y;
			if (!ficha.rotacion)
				this.zona=C_sprites[ficha.sprite].sd;
			else if (ficha.rotacion === 90)
				this.zona=C_sprites[ficha.sprite].si;
			else if (ficha.rotacion === 180)
				this.zona=C_sprites[ficha.sprite].ii;
			else if (ficha.rotacion === 270)
				this.zona=C_sprites[ficha.sprite].id;
			break;

		case 4:
			this.x=ficha.x;
			this.y=ficha.y+ficha.w/3;
			if (!ficha.rotacion)
				this.zona=C_sprites[ficha.sprite].ci;
			else if (ficha.rotacion === 90)
				this.zona=C_sprites[ficha.sprite].ic;
			else if (ficha.rotacion === 180)
				this.zona=C_sprites[ficha.sprite].cd;
			else if (ficha.rotacion === 270)
				this.zona=C_sprites[ficha.sprite].sc;
			break;

		case 5:
			this.x=ficha.x+ficha.h/3;
			this.y=ficha.y+ficha.w/3;
			this.zona=C_sprites[ficha.sprite].cc;
			break;
			
		case 6:
			this.x=ficha.x+2*ficha.h/3;
			this.y=ficha.y+ficha.w/3;
			if (!ficha.rotacion)
				this.zona=C_sprites[ficha.sprite].cd;
			else if (ficha.rotacion === 90)
				this.zona=C_sprites[ficha.sprite].sc;
			else if (ficha.rotacion === 180)
				this.zona=C_sprites[ficha.sprite].ci;
			else if (ficha.rotacion === 270)
				this.zona=C_sprites[ficha.sprite].ic;
			break;	

		case 7:
			this.x=ficha.x;
			this.y=ficha.y+2*ficha.w/3;
			if (!ficha.rotacion)
				this.zona=C_sprites[ficha.sprite].ii;
			else if (ficha.rotacion === 90)
				this.zona=C_sprites[ficha.sprite].id;
			else if (ficha.rotacion === 180)
				this.zona=C_sprites[ficha.sprite].sd;
			else if (ficha.rotacion === 270)
				this.zona=C_sprites[ficha.sprite].si;
			break;	

		case 8:
			this.x=ficha.x+ficha.h/3;
			this.y=ficha.y+2*ficha.w/3;
			if (!ficha.rotacion)
				this.zona=C_sprites[ficha.sprite].ic;
			else if (ficha.rotacion === 90)
				this.zona=C_sprites[ficha.sprite].cd;
			else if (ficha.rotacion === 180)
				this.zona=C_sprites[ficha.sprite].sc;
			else if (ficha.rotacion === 270)
				this.zona=C_sprites[ficha.sprite].ci;
			break;

		case 9:
			this.x=ficha.x+2*ficha.h/3;
			this.y=ficha.y+2*ficha.w/3;
			if (!ficha.rotacion)
				this.zona=C_sprites[ficha.sprite].id;
			else if (ficha.rotacion === 90)
				this.zona=C_sprites[ficha.sprite].sd;
			else if (ficha.rotacion === 180)
				this.zona=C_sprites[ficha.sprite].si;
			else if (ficha.rotacion === 270)
				this.zona=C_sprites[ficha.sprite].ii;
			break;
		}
	}

	this.getCuadrado = function(x, y, ficha) {
		if (x>ficha.x && x<ficha.x+ficha.h/3 
				&& y>ficha.y && y<ficha.y+ficha.w/3)
			return 1;
				
		else if(x>ficha.x+ficha.h/3 && x<ficha.x+2*ficha.h/3 
				&&  y>ficha.y && y<ficha.y+ficha.w/3)
			return 2;
		
		else if(x>ficha.x+2*ficha.h/3 && x<ficha.x+3*ficha.h/3
				&& y>ficha.y && y<ficha.y+ficha.w/3)
			return 3;

		else if(x>ficha.x && x<ficha.x+ficha.h/3 && 
				y>ficha.y+ficha.w/3 && y<ficha.y+2*ficha.w/3)
			return 4;

		else if(x>ficha.x+ficha.h/3 && x<ficha.x+2*ficha.h/3 
				&& y>ficha.y+ficha.w/3 && y<ficha.y+2*ficha.w/3)
			return 5;

		else if(x>ficha.x+2*ficha.h/3 && x<ficha.x+3*ficha.h/3 && 
				y>ficha.y+ficha.w/3 && y<ficha.y+2*ficha.w/3)
			return 6;

		else if(x>ficha.x && x<ficha.x+ficha.h/3 && 
				y>ficha.y+2*ficha.w/3 && y<ficha.y+3*ficha.w/3)
			return 7;

		else if(x>ficha.x+ficha.h/3 && x<ficha.x+2*ficha.h/3 
				&& y>ficha.y+2*ficha.w/3 && y<ficha.y+3*ficha.w/3)
			return 8;

		else if(x>ficha.x+2*ficha.h/3 && x<ficha.x+3*ficha.h/3 
				&& y>ficha.y+2*ficha.w/3 && y<ficha.y+3*ficha.w/3)
			return 9;

	}
	
	this.mover = function(x,y) {
		if (!this.fijado) {
			this.moviendo = true;
			var nickuser=Meteor.user().username;
			if(nickuser==this.nick  && FichaActual.seHaMovido() 
								&& (!FichaActual.seguidor || FichaActual.seguidor==this) && esMiTurno){

					this.x = x - this.w/2;
					this.y = y - this.h/2;
					FichaActual.pintarRejilla();
			}
		}
	}
	
	this.soltar = function(x,y) {
		if (!this.fijado && !FichaActual.seguidor){
			if ((!FichaActual.seHaMovido() || !FichaActual.EstaEn(x,y))){
				this.resetear();
				FichaActual.seguidor=null;
			}else{
				var nickuser=Meteor.user().username;
				if(nickuser==this.nick && esMiTurno && FichaActual.seHaMovido() && !FichaActual.seguidor){
					this.cuadrado = this.getCuadrado(x, y, FichaActual);
					this.recalcular(FichaActual);
					if (this.zona==="no"){
						this.resetear();
					}else{
						alert("Has situado seguidor en: '"+this.zona+"'. Puede cambiarlo si lo desea.");
						FichaActual.seguidor=this;
						if (!this.restado){
							this.contador.decrementar();
							this.restado=true;
						}
					}
				}
			}	
		}else if (!this.fijado) {
			if ((!FichaActual.seHaMovido() || !FichaActual.EstaEn(x,y))){
				this.resetear();
			}else{
				if(this.seHaMovido()){
					this.cuadrado = this.getCuadrado(x, y, FichaActual);
					this.recalcular(FichaActual);
					if (this.zona==="no"){
						this.resetear();
					}else{
						alert("Has situado seguidor en: '"+this.zona+"'. Puede cambiarlo si lo desea.");
					}
				}
			}
		}
		this.moviendo = false;
	}

	//Devuelve true si no esta en la posicion inicial
	this.seHaMovido = function() {
		return (this.x !== this.inicialx || this.y !== this.inicialy);
	}

	this.resetear = function() {
		this.x=this.inicialx;
		this.y=this.inicialy;
		this.zona = "";
		this.fijado = false;
		if (FichaActual.seguidor === this) FichaActual.seguidor = null;
		if (this.restado){
			this.contador.incrementar();	
			this.restado=false;
		}
	}

	this.draw = function(ctx) {
		var dibujar = true;
		var sw = this.w;
		//Si esta colocado en el tablero y se sale del espacio del tablero no 
		//se pinta la parte que sale de la pantalla
		if (!this.moviendo && this.seHaMovido() && this.x+this.w > 850) {
			var dif = 850 - this.x;
			if (dif < 0) {
				dibujar = false;
			} else {
				sw = dif;
			}	
		}
		if (dibujar) {
			C_SpriteSheet.draw(ctx,this.sprite,this.x,this.y,sw);
		}
	}

	this.establecer = function(cuadrado, zona, ficha) {
		this.resetear();
		this.cuadrado = cuadrado;
		this.zona = zona;
		this.fijado = true;
		this.contador.decrementar();
		this.restado=true;
		this.recalcular(ficha);
	}
};

//Devuelve el elemento dibujado en (x,y) a partir del board n
//El elemento debe tener una funcion pulsado, mover y soltar
C_elemInPos = function(x, y, n) {
	if (!n || n < 0) n = 0;

	for(var i=n,len = C_Game.boards.length;i<len;i++) {
		if (C_Game.boards[i]){
			if (y >= C_Game.boards[i].y && y <= C_Game.boards[i].y+C_Game.boards[i].h 
					&& x >= C_Game.boards[i].x && x <= C_Game.boards[i].x+C_Game.boards[i].w) {
				return C_Game.boards[i];
			}
		}
	}
	return null;
}

var desplazarTablero = function(difx, dify) {
	 for(var i=0; i<C_Game.boards.length; i++) {
		if (C_Game.boards[i]){
			if (C_Game.boards[i] instanceof Ficha || 
					(C_Game.boards[i] instanceof C_Seguidor && C_Game.boards[i].seHaMovido())) {
				C_Game.boards[i].x += difx;
				C_Game.boards[i].y += dify;
			}
		}
	}

	if (FichaActual.seHaMovido()) {
		FichaActual.x += difx;
		FichaActual.y += dify;
	}

	
}


C_NumSeguidores = function(numjugador) {
	this.num = 7;
	this.x = 890;
	this.y = 220 +numjugador*60;
	this.w = 0;
	this.h = 0;
	this.sprite = "";

	this.mover = function(x,y) {	}
	
	this.soltar = function(x,y) {	}

	this.pulsado = function() {	}
	
	this.decrementar = function() {
		this.num--;
	}

	this.incrementar = function() {
		this.num++;
	}

	this.draw = function(ctx) {
	  	ctx.save();
	  	ctx.font = "bold 18px arial";
	    	ctx.fillStyle= "#FFFFFF";

	 	var txt = "" + this.num;
	    	ctx.fillText(txt,this.x,this.y);
	    	ctx.restore();
		
	};
};

C_GamePoints = function(numjugador, nick) {
	this.points = 0;
	this.x = 940;
	this.y = 220 +numjugador*60;
	this.w = 0;
	this.h = 0;
	this.sprite = "";
	this.nick = nick;

	this.mover = function(x,y) {	}
	
	this.soltar = function(x,y) {	}

	this.pulsado = function() {	}

	var pointsLength = 3;

	this.draw = function(ctx) {
	  	ctx.save();
	  	ctx.font = "bold 18px arial";
	    	ctx.fillStyle= "#FFFFFF";

	 	var txt = "" + this.points;
	  	var i = pointsLength - txt.length, zeros = "";
	  	while(i-- > 0) { zeros += "0"; }
			ctx.fillText(this.nick, this.x, this.y-20);
	    	ctx.fillText(zeros + txt,this.x,this.y);
	    	ctx.restore();
	};
};

var idcanvas = null;
C_Game.autorun = Deps.autorun(function(){
	var idpartida = Session.get("Current_Game");
	if (idpartida){
		var partida = Partidas.findOne(idpartida);
		var canv = partida.canvas;
		if (idcanvas !== canv) {
			//Carga el tablero de la partida seleccionada
			nmov = 0;
			FichaActual.resetear();
			idcanvas = canv;
			C_Game.initialize(canv,C_sprites,C_startGame);
			
		} else if (nmov > 0) {
			//Actualiza las fichas segun los movimientos registrados
			var movs = partida.jugadas;
			for (i = nmov-1; i < movs.length; i++) { 
				nmov++;
				gestionarMov(movs[i]);
			}

			//Actualiza las puntuaciones de los jugadores
			partida.jugadores.forEach(function(nick){
				var jug = partida.jugadores.indexOf(nick);
				puntuaciones[nick].points = partida.puntuacion[jug];
		   	});

			FichaActual.actualizar();

			var idpartida=Session.get("Current_Game");
			Meteor.call("VerTurno", idpartida, function(err, results){
				if(err){
					console.log(err.reason);
				}else{
					Turno.cambiarNick(results);
					if (Meteor.user().username==results){
						esMiTurno=true;
					}else{
						esMiTurno=false;
					}
				}
			});
			if (partida.estado==="Terminada"){
				Terminada=true;

				var mayor = _.max(partida.jugadores, function(nick){
					var jug = partida.jugadores.indexOf(nick);
					return partida.puntuacion[jug];
				});

				alert("La partida ha finalizado. El ganador es " + mayor);
			}
			
		}
	}

});


//Si esta en la pantalla de inicio se encarga de añadir jugadores nuevos
//o ejecuta playGame si la partida ya está empezada o ha acabado
C_Game.autorun2 = Deps.autorun(function(){
	var idpartida = Session.get("Current_Game");
	if (idpartida){
		var partida = Partidas.findOne(idpartida);
		var board1 = C_Game.boards[0];
		if (board1 instanceof C_TitleScreen) {
			if (partida.estado === "Lobby") {
				board1.jugadores = partida.jugadores;
				if(partida.jugadores.length >= MAX_JUGADORES) {
					board1.pulsado();
				}
			} else {
				C_playGame();
			}
		}
	}
});
