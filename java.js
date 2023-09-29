//const BOTON = document.getElementById('boton1');
const CONTENIDO = document.getElementById('contenido');
const FRAGMENTO = document.createDocumentFragment();
const TEMPLATE_TARJETA = document.getElementById('tarjeta').content;// content para los TEMPLATES
const BOTON_ANTERIOR = document.getElementById('anterior');
const BOTON_SIGUIENTE = document.getElementById('siguiente');
const BOTON_CERRAR  = document.getElementById('cerrar');
const CONTAINER = document.getElementById('container1');
const FLOTANTE = document.getElementById('flotante1');
const ID_IMAGEN  = document.getElementById('numero');
const CARD_TITLE = document.getElementById('card-title');
const INFO = document.getElementById('info');
let API_URL = 'https://rickandmortyapi.com/api/character';
let per = {estado:'',imagen:'',genero:''};

let contador = document.getElementById('contador');
var Siguiente = '';
let Anterior  = '';
let Actual = 1;



BOTON_CERRAR.addEventListener ('click', e => {
   
     FLOTANTE.style = "visibility:hidden";
     CONTAINER.style = "opacity:1";

    
   
    e.stopPropagation();
});

 document.addEventListener('DOMContentLoaded', () =>{// se espera a que cargue todo el doumento
    obtenerDatos(API_URL);
 } );

 function Estado(estado) {
     var estado1;

    if (estado.status ==='Alive') {
       per.estado = 'Vivo';
       per.imagen='src="/icon/online.svg"'
    } else if (estado.status==="Dead") {
       per.estado = 'Muerto';
       per.imagen='src="/icon/offline.png"'
    } else {
       per.estado ='Desconocido';
       per.imagen='src="/icon/unknow.png"'
       
    }        
    return per;            
        
};

 async function obtenerDatos(direccion){ // se declara fucion asincrona

    try {
        const res = await fetch(direccion);
        const datos = await res.json();
   

        Siguiente = datos.info.next;        
        Anterior = datos.info.prev;
     
        contador.textContent = 'Paginas : ' + Actual + " de " + datos.info.pages;

        CONTENIDO.textContent='';
        llenarTarjetas(datos); 

    } catch (error) {
        console.log(error);        
    }   
 };//fin obtener

 const llenarTarjetas = data => {             
    
    //console.log(data);
    

    data.results.forEach(element => {
   

            Estado(element);                                                                                            
                      
            TEMPLATE_TARJETA.querySelector('h5').textContent = element.name;           
            TEMPLATE_TARJETA.querySelector('img').setAttribute('src',element.image);                                                  
            TEMPLATE_TARJETA.querySelector('#estado').innerHTML = ('<span id="img_estado">Estado :&ensp; <img id=""' + per.imagen + 'alt="" width="20px" height="20px ">&ensp;<b><p> ' + per.estado + ' </p></b></span>');
            TEMPLATE_TARJETA.querySelector('#ciudad').textContent = "Ciudad : " + element.origin.name;
            TEMPLATE_TARJETA.querySelector('#especie').textContent ="Especie : " +  element.species;      
            TEMPLATE_TARJETA.querySelector('#Genero').textContent = "Genero : " + element.gender;            
            TEMPLATE_TARJETA.querySelector('span').textContent = 'N°: ' + element.id;
            
            const CLONE = TEMPLATE_TARJETA.cloneNode(true);
            FRAGMENTO.appendChild(CLONE);         
                      
        });                   
               

     CONTENIDO.appendChild(FRAGMENTO);                   
 }

        
 BOTON_SIGUIENTE.addEventListener('click', e =>{

    if(Siguiente !==null){

        if (Actual > 0 && Actual < 42){
            Actual++;
        };

        obtenerDatos(Siguiente);
    }    

 });

 BOTON_ANTERIOR.addEventListener('click', e =>{


        if ( Anterior !== null){
            if (Actual > 1 && Actual < 43){
                Actual--;
            };

            obtenerDatos(Anterior);
        }
 });

 INFO.addEventListener('click' , e =>{

     FLOTANTE.style = "visibility:visible";    

    e.stopPropagation;
});
