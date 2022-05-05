import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import TermyNoTerm from "../../components/TermyNoTerm";
import FirstyFollow from "../../components/FirstyFollow";

import "./GrammLL1.css";

let productores = [];
let producido = [];
let noTerminales = [];
let noOr = [];
let terminales = [];
let termyNoTerm = [];
let grammNoRecursion = [];
let grammLL1 = [];
let primeros = [];
let prodPrimeros = [];
export default function GrammLL1() {
  const [grammatica, setGrammatica] = useState("");
  const [mostrar, setMostrar] = useState(false);

  const onSubmit = () => {
    let gramm = grammatica.split(/\r\n|\r|\n/, -1);
    if (gramm !== []) {
      separador(gramm);
      organizarGramatica(gramm);
    }
    if (grammLL1 !== []) {
      separador(grammLL1);
      first(grammLL1);
      console.log("Primeros" + primeros);
      console.log("Produccion primeros" + prodPrimeros);
    }
    /*
    console.log("terminales" + terminales);
    console.log("no terminales" + noTerminales);
    */
  };
  const handleChange = (e) => {
    setGrammatica(`${e.target.value}`);
  };

  return (
    <div className="primero">
      <div className="navinfo">
        <Form onChange={handleChange} className="input">
          <Form.Group className="mb-3" controlId="controlTexArea">
            <Form.Label>Ingrese la gramatica</Form.Label>
            <Form.Control
              as="textarea"
              name="textGramm"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
              //onChange={handleChange}
            />
            <Form.Text className="text-muted">
              Ingresela de la form S-{">"}S sp s|s
              <br />
              Sin espacios entre | y entre -{">"} y esacios para separa los
              terminales y no terminales
            </Form.Text>
          </Form.Group>
          <Button
            onClick={() => {
              setMostrar(!mostrar);
              onSubmit();
            }}
            variant="primary"
            type="button"
          >
            Prueba
          </Button>
        </Form>
      </div>

      <div className="Term">
        {mostrar ? (
          <TermyNoTerm
            terminales={terminales}
            noTerminales={noTerminales}
            ll1={grammLL1}
          />
        ) : (
          <></>
        )}
      </div>

      <div className="firsfollow">
        {/*mostrar ? (
          <FirstyFollow prodPrimeros={prodPrimeros} primero={primeros} />
        ) : (
          <></>
        )*/}
      </div>
    </div>
  );
}

function esNoTerminal(caracter) {
  return /[A-Z]/.test(caracter);
}

function extractProduccionesNoOr(line) {
  let productosNoOr = [];
  for (let i = 0; i < line.length; i++) {
    productosNoOr.push(line[i].split(" "));
  }
  return productosNoOr;
}

function tieneFactorizacionIzq(line) {
  let [productor, produccion] = line.split("->");
  let copyGram = extractProduccionesNoOr(produccion.split("|"));
  let allCaracters = noTerminales.concat(terminales);
  let flag = 0;

  for (let i = 0; i < allCaracters.length; i++) {
    console.log(allCaracters[i]);
    for (let j = 0; j < copyGram.length; j++) {
      console.log(copyGram[j]);
      if (copyGram[j][0] === allCaracters[i]) {
        flag++;
      }
    }
    if (flag >= 2) {
      flag = 0;
      return true;
    } else {
      flag = 0;
    }
  }
}

function factorizacionIzq(line) {
  let [productor, produccion] = line.split("->");
  let copyGram = extractProduccionesNoOr(produccion.split("|"));
  // aca se vaa a generar la nueva produccion al primero
  // y al segundo que es el que representa la ejecucion de la factorizacion
  let newProduccionFirst = "";
  let newProduccionFollow = "";
  //Bandera para poder agregarlo a la new produccion
  let flag = 0;
  let newAllCaracteeres = noTerminales.concat(terminales);
  /*
   * Lo primero que hay que hacer es agregar lo que hay repetido en la
   * linea para factorizar, el ejemplo seria que esta
   *       S->A sp s|A sp t|A sp
   * lo que hay que almacenar en follow es
   *       S'->A sp
   * y lo que hay que alamacennar en first seria
   *       S->S' s|S' t|S'
   */
  for (let i = 0; i < newAllCaracteeres.length; i++) {
    for (let j = 0; j < copyGram.length; j++) {
      if (copyGram[j].includes(newAllCaracteeres[i])) {
        flag++;
      }
    }
    if (flag < 2) {
      for (let j = 0; j < copyGram.length; j++) {
        for (let k = 0; k < copyGram[j].length; k++) {
          if (copyGram[j][k] === newAllCaracteeres[i]) {
            if (newProduccionFollow === "") {
              newProduccionFollow = `${productor}'->${copyGram[j][k]}`;
            } else {
              if (!newProduccionFollow.includes(copyGram[j][k])) {
                if (newProduccionFollow.includes(copyGram[j][k - 1])) {
                  newProduccionFollow =
                    newProduccionFollow + " " + copyGram[j][k];
                } else {
                  newProduccionFollow =
                    newProduccionFollow + `|${copyGram[j][k]}`;
                }
              }
            }
          }
        }
      }
      flag = 0;
    } else {
      for (let j = 0; j < copyGram.length; j++) {
        for (let k = 0; k < copyGram[j].length; k++) {
          if (copyGram[j][k] === newAllCaracteeres[i]) {
            if (newProduccionFirst === "") {
              newProduccionFirst = `${productor}->${copyGram[j][k]}`;
            } else if (
              newProduccionFirst.includes(copyGram[j][k - 1]) &&
              !newProduccionFirst.includes(copyGram[j][k])
            ) {
              newProduccionFirst = newProduccionFirst + " " + copyGram[j][k];
            }
          }
        }
      }
      flag = 0;
    }
  }
  newProduccionFirst = newProduccionFirst + ` ${productor}'`;
  newProduccionFollow = newProduccionFollow + "|λ";
  grammLL1.push(newProduccionFirst, newProduccionFollow);
}

function tieneRecursionIzquierda(line) {
  let [productor, produccion] = line.split("->");
  let copyGram = extractProduccionesNoOr(produccion.split("|"));
  let flag = 0;

  for (let i = 0; i < copyGram.length; i++) {
    if (copyGram[i][0] === productor) {
      flag++;
    }
  }
  if (flag >= 1) {
    return true;
  } else {
    return false;
  }
}

function arrayToString(arr) {
  let cadena = "";
  for (let i = 0; i < arr.length; i++) {
    if (i === 0) {
      cadena = arr[i];
    } else {
      cadena = cadena + " " + arr[i];
    }
  }
  return cadena;
}

function eliminarRecursionIzq(line) {
  let [productor, produccion] = line.split("->");
  let copyGram = extractProduccionesNoOr(produccion.split("|"));
  let newFirst = "";
  let newFollow = "";
  for (let i = 0; i < copyGram.length; i++) {
    if (copyGram[i].includes(productor)) {
      for (let j = 0; j < copyGram[i].length; j++) {
        if (copyGram[i][j] !== productor) {
          if (newFollow === "") {
            newFollow = `${productor}'->${arrayToString(
              copyGram[i].filter((char) => char !== productor)
            )} ${productor}'`;
          } else if (!newFollow.includes(copyGram[i][j])) {
            newFollow = newFollow + `|${copyGram[i][j]} ${productor}'`;
          }
        }
      }
    } else {
      for (let j = 0; j < copyGram[i].length; j++) {
        if (copyGram[i][j] !== productor) {
          if (newFirst === "") {
            newFirst = `${productor}->${arrayToString(
              copyGram[i]
            )} ${productor}'`;
          } else if (!newFirst.includes(copyGram[i][j])) {
            newFirst =
              newFirst + `|${arrayToString(copyGram[i])} ${productor}'`;
          }
        }
      }
    }
  }
  console.log("new first: " + newFirst);
  console.log("new follow: " + newFollow);
  grammNoRecursion.push(newFirst, newFollow);
}

function organizarGramatica(gramm) {
  for (let i = 0; i < gramm.length; i++) {
    if (tieneRecursionIzquierda(gramm[i])) {
      eliminarRecursionIzq(gramm[i]);
    } else {
      grammNoRecursion.push(gramm[i]);
    }
  }

  for (let i = 0; i < grammNoRecursion.length; i++) {
    if (tieneFactorizacionIzq(grammNoRecursion[i])) {
      factorizacionIzq(grammNoRecursion[i]);
    } else {
      grammLL1.push(grammNoRecursion[i]);
    }
  }
  console.log("gramm LL1" + grammLL1);
}

function separador(gramm) {
  for (let i = 0; i < gramm.length; i++) {
    let [productor, produ] = gramm[i].split("->");
    productores.push(productor);
    if (!noTerminales.includes(productor)) {
      noTerminales.push(productor);
    }
    producido.push(produ);
  }

  for (let i = 0; i < producido.length; i++) {
    noOr.push(producido[i].split("|"));
  }

  for (let i = 0; i < noOr.length; i++) {
    for (let j = 0; j < noOr[i].length; j++) {
      termyNoTerm.push(noOr[i][j].split(" "));
    }
  }

  for (let i = 0; i < termyNoTerm.length; i++) {
    let aux = termyNoTerm[i];
    for (let j = 0; j < aux.length; j++) {
      if (esNoTerminal(aux[j]) && !noTerminales.includes(aux[j])) {
        noTerminales.push(aux[j]);
      } else if (!esNoTerminal(aux[j]) && !terminales.includes(aux[j])) {
        terminales.push(aux[j]);
      } else if (aux[j].includes("'") && !noTerminales.includes(aux[j])) {
        noTerminales.push(aux[j]);
      } else if (!terminales.includes("λ")) {
        terminales.push("λ");
      }
    }
  }
}

function buscarPrimeros(line) {
  let [productor, producido] = line.split("->");
  let produccion = producido.split("|");
  let noEspacios = [];
  let prim = [];
  let ultimo = [];
  prodPrimeros.push(productor);

  for (let i in produccion) {
    noEspacios.push(produccion[i].split(" "));
  }
  for (let p in noEspacios) {
    for (let j in terminales) {
      if (
        noEspacios[p][0] === terminales[j] &&
        prim.includes(noEspacios[p][0]) === false
      ) {
        if (
          (noEspacios[p][0] !== "λ" &&
            noEspacios[p][0].toLowerCase() !== "lambda") ||
          noEspacios[p].length === 1
        ) {
          prim.push(noEspacios[p][0]);
        } else {
          if (
            terminales.includes(noEspacios[p][1]) === true &&
            prim.includes(noEspacios[p][1]) === false
          ) {
            prim.push(noEspacios[p][1]);
          }
          if (noTerminales.includes(noEspacios[p][1])) {
            for (let k in grammLL1) {
              if (noEspacios[p][1] === grammLL1[k][0]) {
                buscarPrimeros(grammLL1[k]);
                prodPrimeros.pop();
                return;
              }
            }
          }
        }
      }
    }
    if (noTerminales.includes(noEspacios[p][0]) === true) {
      for (let k in grammLL1) {
        if (noEspacios[p][0] === grammLL1[k][0]) {
          buscarPrimeros(grammLL1[k]);
          prodPrimeros.pop();
          ultimo = primeros[primeros.length - 1];
        }
      }
    }
  }
  if (ultimo[0] != null) {
    for (let i in prim) {
      if (prim[0] !== null && ultimo.includes(prim[i]) === false) {
        primeros[primeros.length - 1].push(prim);
        return;
      }
    }
    return;
  }

  if (prim[0] != null) {
    primeros.push(prim);
  } else {
    prodPrimeros.pop();
  }
}

function first(gramm) {
  for (let line in gramm) {
    buscarPrimeros(gramm[line]);
  }
}
