"use client";

import Card from "@/components/Card";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMultiplePokemonById, fetchPokemonId } from "@/store/thunk";
import { setSelected } from "@/store/slice";
import RotateGif from "@/images/rotate.gif";
import Image from "next/image";

const Home = () => {
  const dispatch = useDispatch();
  const pokemonData = useSelector((state) => state.pokemon.data);
  const pokemonIdList = useSelector((state) => state.pokemonId.data);
  console.log("pokemonData : ", pokemonData);

  useEffect(() => {
    dispatch(fetchPokemonId());
  }, [dispatch]);

  useEffect(() => {
    if (pokemonIdList.length > 0) {
      dispatch(fetchMultiplePokemonById(pokemonIdList));
      dispatch(setSelected(1));
    }
  }, [dispatch, pokemonIdList]);

  if (pokemonData.length === 0)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Image src={RotateGif} alt="loading" className="size-20" />
      </div>
    );

  return (
    <section className="py-5 bg-white">
      <div className="flex flex-wrap justify-center">
        {pokemonData.length > 0 &&
          pokemonData.map((el) => (
            <Card
              key={el.id}
              id={`${el.id}`.padStart(3, "0")}
              color={el.color}
              name={el.name}
              sprite={el.sprites.front_default}
            />
          ))}
      </div>
    </section>
  );
};

export default Home;
