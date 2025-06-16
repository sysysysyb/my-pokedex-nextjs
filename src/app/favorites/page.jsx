"use client";

import { selectPokemonByFavorites } from "@/store/selector";
import { useSelector } from "react-redux";
import Card from "@/components/Card";

const Favorites = () => {
  const favoritesList = useSelector((state) => state.favorites.list);
  const filteredPokemonData = useSelector(selectPokemonByFavorites);
  console.log(favoritesList);
  console.log(filteredPokemonData);

  return (
    <section className="py-5 bg-white">
      <div className="flex flex-wrap justify-center">
        {filteredPokemonData.length > 0 &&
          filteredPokemonData.map((el) => (
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

export default Favorites;
