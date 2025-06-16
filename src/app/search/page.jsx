"use client";

import { getRegExp } from "korean-regexp";
import { useSearchParams } from "next/navigation";
import { selectPokemonByRegExp } from "@/store/selector";
import { useSelector } from "react-redux";
import Card from "@/components/Card";

const Search = () => {
  const searchParams = useSearchParams();
  const param = searchParams.get("pokemon");
  const reg = getRegExp(param);

  const filteredPokemonData = useSelector(selectPokemonByRegExp(reg));
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

export default Search;
