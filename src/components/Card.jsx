// src/components/Card.jsx

import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";


export default function Card({ movie }) {
  const img = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <Link to={`/movie/${movie.id}`} className="block group">
      <img
        src={img}
        alt={movie.title}
        className="w-full rounded-md transition-transform duration-300 group-hover:scale-105 bg-neutral-800"
        loading="lazy"
      />
      <h4 className="font-bold mt-3 mb-1 text-lg truncate" title={movie.title}>
        {movie.title}
      </h4>
      <div className="flex justify-between items-center text-sm text-gray-200">
        <span className="flex items-center gap-2 font-bold">
          <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
          <span className="text-yellow-500">{movie.vote_average}</span>
        </span>
        <span className="text-yellow-500 font-bold">{movie.release_date}</span>
      </div>
    </Link>
  );
}