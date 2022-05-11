//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const res = require("express/lib/response");

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({
  extended: true
}));
app.use(express.static("public"));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let error = "";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let afilas = 0;
let acolumnas = 0;
let bfilas = 0;
let bcolumnas = 0;

let amatriz = [[],[]];
let bmatriz = [[],[]];
let matrizresultado = [[],[]];
let arrayMultiplicacionMatrices = [[],[],[]];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let vector1i = 0;
let vector1j = 0;
let vector1k = 0;

let vector2i = 0;
let vector2j = 0;
let vector2k = 0;

let vectorResultantei = 0;
let vectorResultantej = 0;
let vectorResultantek = 0;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let cuaternios1r = 0;
let cuaternios1i = 0;
let cuaternios1j = 0;
let cuaternios1k = 0;

let cuaternios2r = 0;
let cuaternios2i = 0;
let cuaternios2j = 0;
let cuaternios2k = 0;

let cuaternioResultanter = 0;
let cuaternioResultantei = 0;
let cuaternioResultantej = 0;
let cuaternioResultantek = 0;

let cuaternioResultanteOperacion = "";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let transformacionMatrizResultado = [[],[]];
let transformacionMatrizPunto = [[],[]];
let transformacionPuntoX = 0;
let transformacionPuntoY = 0;
let transformacionPuntoZ = 0;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let valorInicialX = 0;
let valorInicialY = 0;
let valorFinalX = 0;
let valorFinalY = 0;
let nuevoPuntoArrayX = [];
let nuevoPuntoArrayY = [];

///////////////////////////////////////////////////////////////////HOME & BASICS//////////////////////////////////////////////////////////////////////////////////////////////

app.get("/", function(req, res) {
    res.render("home", {

    });
});

app.get("/error", function(req,res){
  res.render("error",{
    error: error,
  });
});

//////////////////////////////////////////MATRICES/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.route("/matrices")
.get(function(req,res){
    res.render("matrices")
})
.post(function(req,res){
  afilas = parseInt(req.body.afilas) ;
  acolumnas = parseInt(req.body.acolumnas);
  bfilas = parseInt(req.body.bfilas);
  bcolumnas = parseInt(req.body.bcolumnas);

  console.log(afilas, bfilas, acolumnas, bcolumnas);

  res.redirect("/matrices/inputs")
});

app.route("/matrices/inputs")
.get(function(req, res){
  res.render("matricesInput",{
    afilas: afilas,
    acolumnas: acolumnas,
    bfilas: bfilas,
    bcolumnas: bcolumnas,
  });
})
.post(function(req, res){
  for(let i = 0; i < afilas; i++){
    amatriz[i] = [];
    for(let j = 0; j < acolumnas; j++){
      console.log(i,j);
      let num = req.body[`a${i}${j}`];

      console.log(num);
      amatriz[i][j] = parseFloat(num);
    }
  }


  for(let i = 0; i < bfilas; i++){
    bmatriz[i] = [];
    for(let j = 0; j < bcolumnas; j++){
      let num = req.body[`b${i}${j}`];
      bmatriz[i][j] = parseFloat(num);
    }
  }
  
  res.redirect("/matrices/operaciones")

});

app.route("/matrices/operaciones").get(function(req,res){
  res.render("matrizOperaciones",{
    amatriz: amatriz,
    bmatriz: bmatriz,
    afilas: afilas,
    acolumnas: acolumnas,
    bfilas: bfilas,
    bcolumnas: bcolumnas,
  });
});

app.post("/matrices/suma", function(req, res){
  if(acolumnas != bcolumnas || afilas != bfilas){
    error = "No es posible realizar la operacion ya que el numero de filas y columnas no es igual";
    res.redirect("/error");
  }
  else {
    for (let i = 0; i < afilas; i++) {
      matrizresultado[i] = [];
      for (let j = 0; j < acolumnas; j++) {
          matrizresultado[i][j] = amatriz[i][j] + bmatriz[i][j];
      }
    }
  }
  console.log(matrizresultado);
  res.redirect("/matrices/resultado-suma");
});

app.post("/matrices/resta", function(req, res){
  if(acolumnas != bcolumnas || afilas != bfilas){
    error = "No es posible realizar la operacion ya que el numero de filas y columnas no es igual";
    res.redirect("/error");
  }
  else {
    for (let i = 0; i < afilas; i++) {
      matrizresultado[i] = [];
      for (let j = 0; j < acolumnas; j++) {
          matrizresultado[i][j] = amatriz[i][j] - bmatriz[i][j];
      }
    }
  }
  console.log(matrizresultado);
  res.redirect("/matrices/resultado-resta");
});

app.post("/matrices/multiplicacion",function(req, res){
  if(acolumnas != bfilas){
    error = "No es posible realizar esta operacion porque el numero de columnas de la primera matriz es diferente al de filas de la segunda matriz";
    res.redirect("/error");
  } else {
    for (let i = 0; i < afilas; i++) {
      matrizresultado[i] = [];
      arrayMultiplicacionMatrices[i] = [];
      for (let j = 0; j < bcolumnas; j++) {
          arrayMultiplicacionMatrices[i][j] = [];
          let sum = 0;
          for (let k = 0; k < bfilas; k++) {
              sum += (amatriz[i][k] * bmatriz[k][j]);
              arrayMultiplicacionMatrices[i][j][k] = sum;
          }
          matrizresultado[i][j] = sum;
      }
    }
  }

  res.redirect("/matrices/resultado-multiplicacion")
  
});

app.get("/matrices/resultado-multiplicacion", function(req, res){
  res.render("matricesResultadoMultiplicacion",{
    matrizresultado: matrizresultado,
    arrayMultiplicacionMatrices: arrayMultiplicacionMatrices,
    amatriz: amatriz,
    bmatriz: bmatriz,
    afilas: afilas,
    acolumnas: acolumnas,
    bfilas: bfilas,
    bcolumnas: bcolumnas,
  });
});

app.get("/matrices/resultado-resta", function(req,res){
  res.render("matricesResultadoResta",{
    matrizresultado: matrizresultado,
    amatriz: amatriz,
    bmatriz: bmatriz,
    afilas: afilas,
    acolumnas: acolumnas,
    bfilas: bfilas,
    bcolumnas: bcolumnas,
  });
});

app.get("/matrices/resultado-suma",function(req,res){
  res.render("matricesResultadoSuma",{
    matrizresultado: matrizresultado,
    amatriz: amatriz,
    bmatriz: bmatriz,
    afilas: afilas,
    acolumnas: acolumnas,
    bfilas: bfilas,
    bcolumnas: bcolumnas,
  });
});


////////////////////////////////////////////////////////////////VECTORES//////////////////////////////////////////////////////////////////////////////////////////////

app.route("/vectores")
.get(function(req,res){
  res.render("vectores");
})
.post(function(req,res){
  vector1i = parseFloat(req.body.vector1i) ;
  vector1j = parseFloat(req.body.vector1j);
  vector1k = parseFloat(req.body.vector1k);

  vector2i = parseFloat(req.body.vector2i);
  vector2j = parseFloat(req.body.vector2j);
  vector2k = parseFloat(req.body.vector2k);

  vectorResultantei = (vector1j * vector2k) - (vector1k * vector2j);
  vectorResultantej = (vector1k * vector2i) - (vector1i * vector2k);
  vectorResultantek = (vector1i * vector2j) - (vector1j * vector2i);

  res.redirect("/vectores/resultado");


});

app.get("/vectores/resultado", function(req, res){
  res.render("vectoresResultado",{
    vector1i: vector1i,
    vector1j: vector1j,
    vector1k: vector1k,
    vector2i: vector2i,
    vector2j: vector2j,
    vector2k: vector2k,
    vectorResultantei: vectorResultantei,
    vectorResultantej: vectorResultantej,
    vectorResultantek: vectorResultantek,
  });
});

//////////////////////////////////////////////////////CUATERNIOS///////////////////////////////////////////////////////////////////////////////////////////////////////////

app.route("/cuaternios")
.get(function(req,res){
  res.render("cuaternios");
})
.post(function(req, res){
  cuaternios1r = parseFloat(req.body.cuaternios1r);
  cuaternios1i = parseFloat(req.body.cuaternios1i);
  cuaternios1j = parseFloat(req.body.cuaternios1j);
  cuaternios1k = parseFloat(req.body.cuaternios1k);

  cuaternios2r = parseFloat(req.body.cuaternios2r);
  cuaternios2i = parseFloat(req.body.cuaternios2i);
  cuaternios2j = parseFloat(req.body.cuaternios2j);
  cuaternios2k = parseFloat(req.body.cuaternios2k);

  res.redirect("/cuaternios/operaciones")
});

app.get("/cuaternios/operaciones", function(req, res){
  res.render("cuaterniosOperaciones",{
    cuaternios1r: cuaternios1r,
    cuaternios1i: cuaternios1i,
    cuaternios1j: cuaternios1j,
    cuaternios1k: cuaternios1k,

    cuaternios2r: cuaternios2r,
    cuaternios2i: cuaternios2i,
    cuaternios2j: cuaternios2j,
    cuaternios2k: cuaternios2k,
  });
});

app.post("/cuaternios/multiplicacion", function(req, res){
  cuaternioResultanter = (cuaternios1r * cuaternios2r) - (cuaternios1i * cuaternios2i) - (cuaternios1j * cuaternios2j) - (cuaternios1k * cuaternios2k);
  cuaternioResultantei = (cuaternios1r * cuaternios2i) + (cuaternios2r * cuaternios1i) + (cuaternios1j * cuaternios2k) - (cuaternios1k * cuaternios2j);
  cuaternioResultantej = (cuaternios2r * cuaternios1j) + (cuaternios1r * cuaternios2j) + (cuaternios1k * cuaternios2i) - (cuaternios1i * cuaternios2k);
  cuaternioResultantek = (cuaternios2r * cuaternios1k) + (cuaternios1r * cuaternios2k) - (cuaternios1j * cuaternios2i) + (cuaternios1i * cuaternios2j);

  cuaternioResultanteOperacion = `Operacion: ((${cuaternios1r}*${cuaternios2r}) - (${cuaternios1i}*${cuaternios2i}) - (${cuaternios1j}*${cuaternios2j}) - (${cuaternios1k}*${cuaternios2k})) + ((${cuaternios1r}*${cuaternios2i}) + (${cuaternios2r}*${cuaternios1i}) + (${cuaternios1j}*${cuaternios2k}) - (${cuaternios1k}*${cuaternios2j}))i + ((${cuaternios2r}*${cuaternios1j}) + (${cuaternios1r}*${cuaternios2j}) + (${cuaternios1k}*${cuaternios2i}) - (${cuaternios1i}*${cuaternios2k}))j + ((${cuaternios2r}*${cuaternios1k}) + (${cuaternios1r}*${cuaternios2k}) - (${cuaternios1j}*${cuaternios2i}) + (${cuaternios1i}*${cuaternios2j}))k`;
  res.redirect("/cuaternios/resultado");
});

app.post("/cuaternios/suma", function(req, res){
  cuaternioResultanter = cuaternios1r + cuaternios2r;
  cuaternioResultantei = cuaternios1i + cuaternios2i;
  cuaternioResultantej = cuaternios1j + cuaternios2j;
  cuaternioResultantek = cuaternios1k + cuaternios2k;

  cuaternioResultanteOperacion = `Operacion: (${cuaternios1r} + ${cuaternios2r}) + (${cuaternios1i} + ${cuaternios2i})i + (${cuaternios1j} + ${cuaternios2j})j + (${cuaternios1k} + ${cuaternios2k})k`;
  res.redirect("/cuaternios/resultado");
});

app.post("/cuaternios/resta", function(req, res){
  cuaternioResultanter = cuaternios1r - cuaternios2r;
  cuaternioResultantei = cuaternios1i - cuaternios2i;
  cuaternioResultantej = cuaternios1j - cuaternios2j;
  cuaternioResultantek = cuaternios1k - cuaternios2k;

  cuaternioResultanteOperacion = `Operacion: (${cuaternios1r} - ${cuaternios2r}) + (${cuaternios1i} - ${cuaternios2i})i + (${cuaternios1j} - ${cuaternios2j})j + (${cuaternios1k} - ${cuaternios2k})k`;
  res.redirect("/cuaternios/resultado");
});

app.get("/cuaternios/resultado",function(req, res){
  res.render("cuaterniosResultado",{
    cuaternios1r: cuaternios1r,
    cuaternios1i: cuaternios1i,
    cuaternios1j: cuaternios1j,
    cuaternios1k: cuaternios1k,

    cuaternios2r: cuaternios2r,
    cuaternios2i: cuaternios2i,
    cuaternios2j: cuaternios2j,
    cuaternios2k: cuaternios2k,

    cuaternioResultanter: cuaternioResultanter,
    cuaternioResultantei: cuaternioResultantei,
    cuaternioResultantej: cuaternioResultantej,
    cuaternioResultantek: cuaternioResultantek,
    cuaternioResultanteOperacion: cuaternioResultanteOperacion,
  });
});

////////////////////////////////////////////////////////////////////TRANSFORMACIONES//////////////////////////////////////////////////////////////////////////////////////////

app.route("/transformaciones")
.get(function(req, res){
  res.render("transformaciones");
})
.post(function(req, res){
  transformacionPuntoX = req.body.transformacionPuntoX;
  transformacionPuntoY = req.body.transformacionPuntoY;
  transformacionPuntoZ = req.body.transformacionPuntoZ;

  transformacionMatrizPunto = [[transformacionPuntoX],[transformacionPuntoY],[transformacionPuntoY],[1]];

  res.redirect("/transformaciones/operaciones");
})

app.get("/transformaciones/operaciones", function(req, res){
  res.render("transformacionOperaciones", {
    transformacionPuntoX: transformacionPuntoX,
    transformacionPuntoY: transformacionPuntoY,
    transformacionPuntoZ: transformacionPuntoZ,
  });
});

app.post("/transformaciones/translacion", function(req, res){
  res.redirect("/transformaciones/translacion/operacion");
});
app.post("/transformaciones/escala", function(req, res){
  res.redirect("/transformaciones/escala/operacion");
});
app.post("/transformaciones/rotacionx", function(req, res){
  res.redirect("/transformaciones/rotacionx/operacion");
});
app.post("/transformaciones/rotaciony", function(req, res){
  res.redirect("/transformaciones/rotaciony/operacion");
});
app.post("/transformaciones/rotacionz", function(req, res){
  res.redirect("/transformaciones/rotacionz/operacion");
});

app.route("/transformaciones/translacion/operacion")
.get(function(req, res){
  res.render("transformacionesTranslacion");
})
.post(function(req, res){

  let translacionx = req.body.translacionx;
  let translaciony = req.body.translaciony;
  let translacionz = req.body.translacionz;
  let translacionMatriz = [[1,0,0,translacionx],[0,1,0,translaciony],[0,0,1,translacionz],[0,0,0,1]];
  

  for (let i = 0; i < 4; i++) {
    transformacionMatrizResultado[i] = [];
    for (let j = 0; j < 1; j++) {
        let sum = 0;
        for (let k = 0; k < 4; k++) {
            sum += (translacionMatriz[i][k] * transformacionMatrizPunto[k][j]);
        }
        transformacionMatrizResultado[i][j] = sum;
    }
  }
  console.log(transformacionMatrizResultado);
  

  res.redirect("/transformaciones/resultado");
});

app.route("/transformaciones/escala/operacion")
.get(function(req, res){
  res.render("transformacionesEscala");
})
.post(function(req, res){
  let escalax = req.body.escalax;
  let escalay = req.body.escalay;
  let escalaz = req.body.escalaz;
  let escalaMatriz = [[escalax, 0, 0, 0],[0, escalay, 0, 0],[0, 0, escalaz, 0],[0, 0, 0, 1]];
  
  for (let i = 0; i < 4; i++) {
    transformacionMatrizResultado[i] = [];
    for (let j = 0; j < 1; j++) {
        let sum = 0;
        for (let k = 0; k < 4; k++) {
            sum += (escalaMatriz[i][k] * transformacionMatrizPunto[k][j]);
        }
        transformacionMatrizResultado[i][j] = sum;
    }
  }

  res.redirect("/transformaciones/resultado");

});

app.route("/transformaciones/rotacionx/operacion")
.get(function(req, res){
  res.render("transformacionRotacionX");
})
.post(function(req, res){
  let rotacionx = req.body.rotacionx;
  let rotacionxMatriz = [[1, 0, 0, 0],[0, Math.cos(rotacionx), -Math.sin(rotacionx), 0],[0, Math.sin(rotacionx), Math.cos(rotacionx), 0], [0,0,0,1]];

  for (let i = 0; i < 4; i++) {
    transformacionMatrizResultado[i] = [];
    for (let j = 0; j < 1; j++) {
        let sum = 0;
        for (let k = 0; k < 4; k++) {
            sum += (rotacionxMatriz[i][k] * transformacionMatrizPunto[k][j]);
        }
        transformacionMatrizResultado[i][j] = sum;
    }
  }

  res.redirect("/transformaciones/resultado");
});

app.route("/transformaciones/rotaciony/operacion")
.get(function(req, res){
  res.render("transformacionRotacionY");
})
.post(function(req, res){
  let rotaciony = req.body.rotaciony;
  let rotacionxMatriz = [[Math.cos(rotaciony), 0, Math.sin(rotaciony), 0],[0, 1, 0, 0],[-Math.sin(rotaciony), 0 , Math.cos(rotaciony), 0], [0,0,0,1]];

  for (let i = 0; i < 4; i++) {
    transformacionMatrizResultado[i] = [];
    for (let j = 0; j < 1; j++) {
        let sum = 0;
        for (let k = 0; k < 4; k++) {
            sum += (rotacionxMatriz[i][k] * transformacionMatrizPunto[k][j]);
        }
        transformacionMatrizResultado[i][j] = sum;
    }
  }

  res.redirect("/transformaciones/resultado");
});

app.route("/transformaciones/rotacionz/operacion")
.get(function(req, res){
  res.render("transformacionRotacionZ");
})
.post(function(req, res){
  let rotacionZ = req.body.rotacionz;
  let rotacionxMatriz = [[Math.cos(rotacionZ), -Math.sin(rotacionZ), 0, 0],[Math.sin(rotacionZ), Math.cos(rotacionZ), 0, 0],[0, 0, 1, 0], [0,0,0,1]];

  for (let i = 0; i < 4; i++) {
    transformacionMatrizResultado[i] = [];
    for (let j = 0; j < 1; j++) {
        let sum = 0;
        for (let k = 0; k < 4; k++) {
            sum += (rotacionxMatriz[i][k] * transformacionMatrizPunto[k][j]);
        }
        transformacionMatrizResultado[i][j] = sum;
    }
  }

  res.redirect("/transformaciones/resultado");
});

app.get("/transformaciones/resultado", function(req, res){
  res.render("transformacionesResultado",{
    transformacionMatrizResultado: transformacionMatrizResultado,
  });
});

///////////////////////////////////////////////////////////////BRESENHAM///////////////////////////////////////////////////////////////////////////////////////////

app.route("/bresenham")
.get(function(req, res){
  res.render("bresenham")
})
.post(function(req,res){
  valorInicialX = req.body.puntoInicialX;
  valorInicialY = req.body.puntoInicialY;
  valorFinalX = req.body.puntoFinalX;
  valorFinalY = req.body.puntoFinalY;
  let nuevoPuntoX = valorInicialX;
  let nuevoPuntoY = valorInicialY;

  let i = 0;
  let deltax = valorFinalX - valorInicialX;
  let deltay = valorFinalY - valorInicialY;
  let m = (deltax/deltay);


  let p0 = (2 * deltay) - deltax;


  
  while (nuevoPuntoX != valorFinalX && nuevoPuntoY != valorFinalY){
    if(p0 < 0){
      nuevoPuntoX++;
      nuevoPuntoArrayX[i] = nuevoPuntoX;
      nuevoPuntoArrayY[i] = nuevoPuntoY;
      p0 = p0 + (2*deltay);
    } else {

      nuevoPuntoX++;
      nuevoPuntoY++;
      nuevoPuntoArrayX[i] = nuevoPuntoX;
      nuevoPuntoArrayY[i] = nuevoPuntoY;
      p0 = p0 + (2 * deltay) - (2 * deltax);

    }
 

    i++;
  }

  console.log(nuevoPuntoArrayX);
  console.log(nuevoPuntoArrayY);

  res.redirect("/bresenham/resultado");


});

app.get("/bresenham/resultado", function(req, res){
  res.render("bresenhamResultado",{
  valorInicialX: valorInicialX,
  valorInicialY: valorInicialY,
  valorFinalX: valorFinalX,
  valorFinalY:  valorFinalY ,
  nuevoPuntoArrayX: nuevoPuntoArrayX,
  nuevoPuntoArrayY: nuevoPuntoArrayY,
  });
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000");
  });