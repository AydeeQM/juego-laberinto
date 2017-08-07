//Dibujando la matriz para nuestro laberinto
var mapa=[
"******************",
"*_________*______*",
"*_*****_____******",
"*______***__*__*_*",
"***_*____*____**_*",
"*___*____**__*___*",
"*_********__**_*_*",
"*____*______*__*_*",
"*_**_*__*****_**_*",
"*o*__*________**W*",
"******************"];

var filas = new Array(mapa.length);
for(var i =0; i<filas.length; i++){
    filas[i]= new Array(mapa[i].length);
}

var celdaActual;

var tablero = document.getElementById('tablero');

//funcion que transforma la matriz en laberinto
function genera(){
    tablero.innerHTML = '';
    var tabla = document.createElement('table');
    
    for (var i = 0; i < mapa.length; i++) {
        var fila = document.createElement('tr');
        for (var j = 0; j < mapa[i].length; j++) {
            var celda = document.createElement('td');
            if (mapa[i][j]=='*') {
                celda.setAttribute('class', 'negro');
            }else if(mapa[i][j]=='o'){
                celda.setAttribute('class', 'salida');
                celdaActual = {x:i,y:j, direccion:'up'};
                
            }else if(mapa[i][j]=='W'){
               celda.setAttribute('class', 'fin');
            }else{
                celda.setAttribute('id','libre');
            }
            
            var p = document.createElement('p');
            
            celda.appendChild(p);
            
            filas[i][j]=celda;
            
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    tablero.appendChild(tabla);
}

genera();

//creamos e insertamos imagenes de las flechas
var arrFlecha =[];

var imgArr = document.createElement('img');
var imgAba = document.createElement('img');
var imgDer = document.createElement('img');
var imgIzq = document.createElement('img');

imgArr.setAttribute('src','asset/up.png');
imgAba.setAttribute('src','asset/down.png');
imgIzq.setAttribute('src','asset/left.png');
imgDer.setAttribute('src','asset/right.png');

/*imgArr.setAttribute('id','1');
imgAba.setAttribute('id','2');
imgIzq.setAttribute('id','3');
imgDer.setAttribute('id','4');*/

//funcion constructor que llama a las flechas
function travel(icono) {
    this.icono= icono;
};

var iconUp = new travel(imgArr);
var iconDown = new travel(imgAba);
var iconLeft = new travel(imgIzq);
var iconRight = new travel(imgDer);

arrFlecha.push(iconUp);
arrFlecha.push(iconDown);
arrFlecha.push(iconLeft);
arrFlecha.push(iconRight);

//implementamos el boton avanzar
move.onclick = function(){
    if(celdaActual.direccion=='up'){
        if(mapa[celdaActual.x-1][celdaActual.y]=="_"){
            filas[celdaActual.x][celdaActual.y].removeChild(filas[celdaActual.x][celdaActual.y].firstChild);
            celdaActual.x = celdaActual.x-1;
            filas[celdaActual.x][celdaActual.y].appendChild(iconUp.icono);
            filas[celdaActual.x][celdaActual.y].style.backgroundColor = '#BBE4E3';
        }else{alert('pared!!!!')}
        
    } else if(celdaActual.direccion=='right'){
        if(mapa[celdaActual.x][celdaActual.y+1]=="_"){
            filas[celdaActual.x][celdaActual.y].removeChild(filas[celdaActual.x][celdaActual.y].firstChild);
            celdaActual.y = celdaActual.y+1;
            filas[celdaActual.x][celdaActual.y].appendChild(iconRight.icono);
            filas[celdaActual.x][celdaActual.y].style.backgroundColor = '#BBE4E3';
        }else{alert('pared!!!!')}
        
    } else if(celdaActual.direccion=='down'){
        if(mapa[celdaActual.x+1][celdaActual.y]=="_"){
            filas[celdaActual.x][celdaActual.y].removeChild(filas[celdaActual.x][celdaActual.y].firstChild);
            celdaActual.x = celdaActual.x+1;
            filas[celdaActual.x][celdaActual.y].appendChild(iconDown.icono);
            filas[celdaActual.x][celdaActual.y].style.backgroundColor = '#BBE4E3';
            
        }else if(mapa[celdaActual.x+1][celdaActual.y]=="W"){
            celdaActual.x = celdaActual.x+1;
            filas[celdaActual.x][celdaActual.y].removeChild(filas[celdaActual.x][celdaActual.y].firstChild);
            filas[celdaActual.x][celdaActual.y].style.backgroundColor = '#f52f0c';
            alert('fin')
        }else{alert('pared!!!!')}
        
    } else if(celdaActual.direccion=='left'){
        if(mapa[celdaActual.x][celdaActual.y-1]=="_"){
            filas[celdaActual.x][celdaActual.y].removeChild(filas[celdaActual.x][celdaActual.y].firstChild);
            celdaActual.y = celdaActual.y-1;
            filas[celdaActual.x][celdaActual.y].appendChild(iconLeft.icono);
            filas[celdaActual.x][celdaActual.y].style.backgroundColor = '#BBE4E3';
        }else{alert('pared!!!!')}
    }
}

//implememtamos el boton que gire todas las flechas hacia el lado izquierdo
left.onclick = function(){
    if(celdaActual.direccion=='up'){
        celdaActual.direccion ='left';
        filas[celdaActual.x][celdaActual.y].removeChild(iconUp.icono);
        filas[celdaActual.x][celdaActual.y].appendChild(iconLeft.icono);
        
    } else if(celdaActual.direccion == 'left'){
        celdaActual.direccion ='down';
        filas[celdaActual.x][celdaActual.y].removeChild(iconLeft.icono);
        filas[celdaActual.x][celdaActual.y].appendChild(iconDown.icono); 
        
    } else if(celdaActual.direccion == 'down'){
        celdaActual.direccion ='right';
        filas[celdaActual.x][celdaActual.y].removeChild(iconDown.icono);
        filas[celdaActual.x][celdaActual.y].appendChild(iconRight.icono);
        
    }else if(celdaActual.direccion == 'right'){
        celdaActual.direccion ='up';
        filas[celdaActual.x][celdaActual.y].removeChild(iconRight.icono);
        filas[celdaActual.x][celdaActual.y].appendChild(iconUp.icono); 
    }
    
}

//implementamos el boton que gira las flechas hacia la derecha
right.onclick = function(){
    if(celdaActual.direccion=='up'){
        celdaActual.direccion ='right';
        filas[celdaActual.x][celdaActual.y].removeChild(iconUp.icono);
        filas[celdaActual.x][celdaActual.y].appendChild(iconRight.icono);
        
    } else if(celdaActual.direccion == 'right'){
        celdaActual.direccion ='down';
        filas[celdaActual.x][celdaActual.y].removeChild(iconRight.icono);
        filas[celdaActual.x][celdaActual.y].appendChild(iconDown.icono); 
        
    } else if(celdaActual.direccion == 'down'){
        celdaActual.direccion ='left';
        filas[celdaActual.x][celdaActual.y].removeChild(iconDown.icono);
        filas[celdaActual.x][celdaActual.y].appendChild(iconLeft.icono);
        
    }else if(celdaActual.direccion == 'left'){;
        celdaActual.direccion ='up';
        filas[celdaActual.x][celdaActual.y].removeChild(iconLeft.icono);
        filas[celdaActual.x][celdaActual.y].appendChild(iconUp.icono); 
    }
    
}

//implementamos el boton salir
exit.onclick = function(){
    if(mapa[celdaActual.x][celdaActual.y]=="W"){
        alert('Saliendo!!!!')
        genera();
    }
}




