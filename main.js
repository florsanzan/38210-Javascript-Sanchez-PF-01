//SIMULADOR DE COMPRAS


//STOCK DE LIBROS
const libros = [
  {
    nombre: "Vermeer:La Obra Completa",
    autor: "Karl Shutz",
    precio: 5000,
    id: 01,
    stock: 3,
  },
  {
    nombre: "Eso no estaba en mi libros de matemáticas",
    autor: "Vicente Meavilla",
    precio: 1500,
    id: 02,
    stock: 25,
  },
  {
    nombre: "Bajo La misma Estrella",
    autor: "John Green",
    precio: 2500,
    id: 03,
    stock: 10,
  },
];

class Usuario {
  constructor(nombre, email, contraseña) {
    this.nombre = nombre;
    this.email = email;
    this.contraseña = contraseña;
  }
}

class Carrito {
  constructor() {
    this.productos = [];
  }

  hayStock(libro, unidades) {
    if (libro.stock != 0 && libro.stock>= unidades) {
      return true;
    }
    if (libro.stock == 0) {
      console.log("No hay mas en stock");
      return false;
    }
    if (libro.stock < unidades) {
      console.log("La cantidad ingresada excede el stock");
      return false;
    }
  }

  agregarItem(libro, unidades) {
    if (this.hayStock(libro, unidades) && this.productos.find((el)=>el.id == libro.id) == null) {
      libro.stock-=unidades; 
      libro.cantidad_comprada = unidades; // AGREGO CANTIDAD COMPRADA  
      this.productos.push(libro);    
    } else {
      return false;
    }
  }

}

// USUARIOS REGISTRADOS
const user01 = new Usuario("Florencia", "florencia@mail.com", "12345"); 
const user02 = new Usuario("Kevin", "kevin@mail.com", "abcde");
const user03 = new Usuario("Nicole", "nicole@mail.com", "00000"); 

// USUARIO NUEVO
const user04 = new Usuario(
  prompt("Ingrese un nombre"),
  prompt("Ingrese un mail"),
  prompt("Elija su contraseña")
);

function preguntarID(){
  return prompt("Ingrese el ID del libro que desea agregar - 01 Vermeer, 02 Libro de Matematicas, 03 Bajo La misma Estrella")
}
function preguntarUnidades(){
  return prompt("Ingrese cuantos libros del producto desea")
}

let respuesta = prompt("Desea comprar? (si/no)");
const carrito01 = new Carrito()

while(respuesta != "no") {

  const elementoLibro = libros.find((elemento) => elemento.id == preguntarID());

  //AGREGO EL LIBRO Y LA CANTIDAD ESPECIFICADA
  carrito01.agregarItem(elementoLibro, preguntarUnidades());

  respuesta = prompt("Desea seguir comprando? (si/no)")
}
precioFinal(carrito01);

function precioFinal(carrito) {
  let total = 0;
  let envio = 1000;
  let valorIVA = 0.21;

  for (let i = 0; i < carrito.productos.length; i++) {
    total += carrito.productos[i].precio;
  }

  const iva = (x) => x * valorIVA;

  let precioFinal = total + iva(total) + envio;

  //MUESTRO POR CONSOLA TOTAL Y TOTAL CON MODIFICACIONES CORRESPONDIENTES
  console.log("Total " + total);
  console.log("Total con envio + IVA = " + precioFinal);
}


