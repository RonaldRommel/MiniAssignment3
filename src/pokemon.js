const express = require("express");
const router = express.Router();
const { v4: uuid } = require("uuid");

// replace this string with your full name
const name = "Ronald Rommel Myloth";

console.log(`My name is ${name}`);

// use this list as your temporary database!
// note that it will reset every time you restart your server
const myPokemon = [
  {
    id: "fc10b559-872c-43cd-bad2-f02e2e0a2d58",
    name: "Pikachu",
    health: 10,
    level: 1,
  },
];

router.get("/", function (req, res) {
  return res.status(200).json(myPokemon);
  // return all pokemon
});

router.post("/", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Pokemon name is required" });
  }
  const exists = myPokemon.some(
    (pokemon) => pokemon.name.toLowerCase() === name.toLowerCase()
  );
  if (exists) {
    return res.status(400).json({ error: "Pokemon already exists" });
  }
  const id = uuid();
  const newPokemon = {
    id,
    name,
    level: Math.floor(Math.random() * 10) + 1,
    health: Math.floor(Math.random() * 91) + 10,
  };
  myPokemon.push(newPokemon);
  res
    .status(200)
    .json({ message: "Pokemon added successfully", pokemon: newPokemon });
});

router.get("/:pokemonId", function (req, res) {
  // return pokemon if one is found matching the pokemonId
  // return a 404 if no pokemon matches that
  const { pokemonId } = req.params;
  const pokemonIndex = myPokemon.findIndex(
    (pokemon) => pokemon.id === pokemonId
  );
  if (pokemonIndex === -1) {
    return res.status(404).json({ error: "Pokemon not found" });
  }
  return res.status(200).json(myPokemon[pokemonIndex]);
});

router.put("/:pokemonId", (req, res) => {
  const { pokemonId } = req.params;
  console.log(pokemonId);
  const { name, level, health } = req.body;
  const pokemonIndex = myPokemon.findIndex(
    (pokemon) => pokemon.id === pokemonId
  );
  if (pokemonIndex === -1) {
    return res.status(404).json({ error: "Pokemon not found" });
  }
  if (name) myPokemon[pokemonIndex].name = name;
  if (level) myPokemon[pokemonIndex].level = level;
  if (health) myPokemon[pokemonIndex].health = health;
  res.status(200).json({
    message: "Pokemon updated successfully",
    pokemon: myPokemon[pokemonIndex],
  });
});

router.delete("/:pokemonId", function (req, res) {
  // delete pokemon if pokemonId matches the id of one
  // return 200 even if no pokemon matches that Id
  const { pokemonId } = req.params;
  const pokemonIndex = myPokemon.findIndex(
    (pokemon) => pokemon.id === pokemonId
  );
  if (pokemonIndex === -1) {
    return res.status(404).json({ error: "Pokemon not found" });
  }
  const deletedPokemon = myPokemon.splice(pokemonIndex, 1);
  return res.status(200).json();
});

module.exports = router;
