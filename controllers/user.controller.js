import { response } from "express";

const usersGet = (req, res = response) => {

  const {name= "", edad = 0, lugar = ""} = req.query;

  res.json({
    msg: "get API -controller",
    name, 
    edad, 
    lugar
  });
};

const userPut = (req, res = response) => {
  const id = req.params.id;

  res.json({
    msg: "put API -controller",
    id
  });
};
const userPost = (req, res = response) => {
  const {nombre, edad} = req.body;
  res.json({
    msg: "post API -controller",
    nombre,
    edad
  });
};
const userDelete = (req, res = response) => {
  res.json({
    msg: "delete API -controller",
  });
};

export { usersGet, userPut, userPost, userDelete };
