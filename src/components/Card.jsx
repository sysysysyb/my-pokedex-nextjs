import HeartIcon from "../images/heart.svg?react";
import HeartFillIcon from "../images/heart_fill.svg?react";
import { useDispatch, useSelector } from "react-redux";
import { add, remove, setSelected } from "../RTK/slice";
import { memo } from "react";

const Card = memo(function Card({ id, color, name, sprite }) {
  const favoritesList = useSelector((state) => state.favorites.list);
  const dispatch = useDispatch();

  const handleFavorite = (event, id) => {
    event.preventDefault();
    if (favoritesList.includes(id)) {
      dispatch(remove(id));
    } else {
      dispatch(add(id));
    }
  };

  return (
    <div
      onClick={() => dispatch(setSelected(Number(id)))}
      className="relative w-50 py-4 relative shadow-[0px_0px_3px_3px_inset_#00000010] bg-white flex flex-col items-center shrink-0 cursor-pointer duration-300 ease-out hover:bg-gray-100">
      <img src={sprite} width="150" />
      <div className="w-fit h-fit border border-solid border-gray-300 flex justify-center items-center rounded-xl">
        <span
          className="px-3 py-0.5 font-semibold rounded-xl border-r border-solid border-gray-300"
          style={{
            backgroundColor: `${color}`,
            color: `${
              color === "black" ||
              color === "blue" ||
              color === "purple" ||
              color === "brown"
                ? "#D1D5DC"
                : "black"
            }`,
          }}>
          {id}
        </span>
        <span className="px-3">{name}</span>
      </div>
      <button
        type="button"
        className="z-99 w-fit h-fit p-2 absolute top-1 right-1 cursor-pointer"
        onClick={(e) => handleFavorite(e, id)}>
        {favoritesList.includes(id) ? (
          <HeartFillIcon fill="#fff" className="w-8 h-8 fill-rose-500" />
        ) : (
          <HeartIcon className="w-8 h-8 fill-gray-300" />
        )}
      </button>
    </div>
  );
});

export default Card;
