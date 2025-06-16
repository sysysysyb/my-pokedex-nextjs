import { lazy, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "../images/search.svg?react";

const Detail = lazy(() => import("../pages/Detail"));

const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleInput = (event) => {
    setInputValue(event.target.value);
  };

  const resetInput = () => {
    setInputValue("");
  };

  useEffect(() => {
    console.log(navigate);
    if (inputValue) {
      const debounceSearch = setTimeout(() => {
        navigate(`/search?pokemon=${inputValue}`);
      }, 300);

      return () => clearTimeout(debounceSearch);
    }

    if (!inputValue && location.pathname.startsWith("/search")) {
      navigate("/");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return (
    <div className="w-full h-screen flex flex-col">
      <header className="w-full fixed z-99 shadow-xl">
        <div className="w-full relative">
          <div className="w-full h-12 bg-red-600"></div>
          <div className="w-full h-6 bg-black"></div>
          <div className="w-full h-12 bg-white"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 bg-black flex justify-center items-center rounded-xl">
            <Link
              to="/"
              className="text-white text-4xl font-bold"
              onClick={resetInput}>
              Pokédex
            </Link>
          </div>
        </div>
      </header>

      <div className="pt-30 pb-20 w-full h-full grid grid-cols-3">
        <div className="scrollbar-custom w-full h-full col-span-2 overflow-y-auto z-9">
          <Outlet />
        </div>
        <div className="w-full h-full col-span-1 relative">
          <Detail />
        </div>
      </div>

      <div className="w-full px-30 py-2 fixed z-99 bottom-0 bg-blue-600 flex justify-between items-center">
        <div className="relative w-3/5">
          <SearchIcon className="absolute top-1/2 left-4 transform -translate-y-1/2 w-5 h-5.5 fill-gray-400" />
          <input
            type="text"
            placeholder="포켓몬 이름을 입력하세요"
            className="bg-white py-3 w-full px-11 text-2xl border-3 border-solid border-gray-300 rounded-lg outline-none"
            value={inputValue}
            onChange={handleInput}
          />
        </div>
        <Link
          to="/favorites"
          className="p-3 bg-white border-3 border-solid border-gray-300 text-2xl font-bold rounded-lg">
          Favorites
        </Link>
      </div>
    </div>
  );
};

export default Header;
