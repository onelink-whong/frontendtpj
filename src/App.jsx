// App.jsx
import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router";
import api from "./api/axios";
import MovieDetail from "./components/MovieDetail";
import Section from "./components/Section";
import ChatBot from "./components/ChatBot";

export default function App() {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const [np, po, up] = await Promise.all([
          api.get('/now_playing?language=ko-KR'),
          api.get('/popular?language=ko-KR'),
          api.get('/upcoming?language=ko-KR')
        ]);

        setNowPlaying(np.data.results.filter(movie => movie.poster_path));
        setPopular(po.data.results.filter(movie => movie.poster_path));
        setUpcoming(up.data.results.filter(movie => movie.poster_path));
      } catch (error) {
        console.error('영화 데이터를 불러오는 중 오류가 발생했습니다:', error);
        // API 오류가 발생해도 웹사이트는 정상 로드되도록 빈 배열 설정
        setNowPlaying([]);
        setPopular([]);
        setUpcoming([]);
      }
    }
    load();
  }, []);

  return (
    <>
      <Header />
      <VideoHero />
      <main className="bg-black text-white">
        <Routes>
          <Route path="/" element={
            <>
              <Section title="Now Playing" items={nowPlaying} />
              <Section title="Popular" items={popular} />
              <Section title="Upcoming" items={upcoming} />
            </>
          } />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </main>
      <ChatBot />
    </>
  );
}

function Header() {
  return (
    <header className="fixed top-0 left-0 w-full py-4 px-2 bg-black/90 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <h1 className="text-3xl text-yellow-300 font-bold">GOFLIX</h1>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/"
                className="text-white hover:text-yellow-300 transition-colors duration-300"
              >
                홈
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function VideoHero() {
  return (
    <section className="relative h-screen overflow-hidden">
      <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover">
        <source src="/assets/video.mp4" type="video/mp4" />
      </video>

      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* 콘텐츠 */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-yellow-300">
            GOFLIX
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            최신 영화와 인기 작품들을 만나보세요
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-lg text-lg font-bold transition-colors duration-300">
            지금 시작하기
          </button>
        </div>
      </div>
    </section>
  );
}