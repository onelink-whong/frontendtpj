import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function getMovieDetails() {
      const response = await api.get(`/${id}`);
      setMovie(response.data);
    }
    getMovieDetails();
  }, [id]);

  if (!movie) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;

  // 영화 상세 정보 표시
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* 포스터 이미지 */}
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-1/3 rounded-lg"
          />

          {/* 영화 정보 */}
          <div className="md:w-2/3">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            <p className="text-lg mb-4">{movie.overview}</p>

            {/* 영화 세부 정보 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-yellow-500">Release Date</h3>
                <p>{movie.release_date}</p>
              </div>
              <div>
                <h3 className="text-yellow-500">Rating</h3>
                <p>{movie.vote_average} / 10</p>
              </div>
              <div>
                <h3 className="text-yellow-500">Runtime</h3>
                <p>{movie.runtime} minutes</p>
              </div>
              <div>
                <h3 className="text-yellow-500">Status</h3>
                <p>{movie.status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}