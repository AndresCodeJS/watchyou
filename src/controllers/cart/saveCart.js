import axios from "axios";
import redis from "redis";

const client = redis.createClient({
    host: 'localhost',
    port: 6379
 
  });

  client.on('connect', function() {
    console.log('Conectado exitosamente a Redis');
});

client.on('error', function(error) {
    console.log(error);
});

export const saveCart = async (req, res) => {
  try {
    console.log("paso1")
    await client.connect();
    await client.set("datos", "valor1")
    console.log("paso2")
    const respuesta = await client.get("datos")

    console.log("la respuesta es" ,respuesta)

    const { data } = await axios.get("https://rickandmortyapi.com/api/character");

    res.json(data);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
