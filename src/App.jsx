import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [surah, setSurah] = useState([]);
  const [ayah, setAyah] = useState([]);
  const [openDetail, setOpenDetail] = useState(false);

  const handleCloseDetail = () => {
    setOpenDetail(false);
  };

  useEffect(() => {
    async function getSurah() {
      const req = await fetch("https://api.quran.gading.dev/surah");

      try {
        const res = await req.json();
        setSurah(res.data);
      } catch (err) {
        console.log(err.message);
      }
    }
    getSurah();
  }, []);

  async function getDetailSurah(id) {
    setAyah([]);

    const req = await fetch(`https://api.quran.gading.dev/surah/${id}`);
    const res = await req.json();

    try {
      setAyah(res.data.verses);
    } catch (err) {
      console.log("Error euy", err.message);
    }
  }

  const handleDetailSurah = (id) => {
    getDetailSurah(id);
    setOpenDetail(true);
  };

  return (
    <>
      <div className="w-full flex flex-col justify-end items-start">
        {surah.map((sura, index) => {
          return (
            <div key={index} onClick={() => handleDetailSurah(sura.number)} className="w-full surah-wrapper bg-gray-300 p-5 cursor-pointer">
              <h1>{sura.name.transliteration.en}</h1>
            </div>
          );
        })}
      </div>

      {openDetail && (
        <div className="fixed top-[11%] left-50% right-auto">
          <div className="detail-surah-wrapper overflow-auto flex flex-col  bg-red-300 w-full h-[500px] p-5">
            <div className="detail-surah__header flex justify-between">
              <h2>Detail surah ada disini</h2>
              <span className="cursor-pointer" onClick={handleCloseDetail}>
                X
              </span>
            </div>
            <div className="ayah-wrapper ">
              {ayah.map((ayah, index) => {
                return (
                  <p key={index} className="mb-10">
                    {ayah.text.arab}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
