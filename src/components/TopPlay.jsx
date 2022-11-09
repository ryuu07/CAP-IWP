import {useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {Swiper, SwiperSlide} from 'swiper/react';
import { FreeMode } from 'swiper';
import PlayPause from './PlayPause';
import {playPause, setActiveSong} from '../redux/features/playerSlice';4
import {useGetTopChartsQuery} from '../redux/services/shazamCore';
import 'swiper/css';
import 'swiper/css/free-mode';


const TopChartCard = ({song,i,isPlaying,activeSong,handlePauseClick,handlePlayClick}) =>(
  <div className="w-full flex flex-row items-center 
  hover:bg-[#4c426e] py-2 p-4 rounded-lg">
    {/* {song.title} */}
    <h3 className="font-bold text-base text-gray-300 mr-3">{i+1}</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img src={song?.images?.coverart} alt={song?.title} className="w-20 h-20 rounded-lg"/>
      <div className='flex-1 flex flex-col justify-center mx-3'>
        <Link to={`/songs/${song.key}`}>
          <p className="text-m font-bold text-white">{song?.title}</p>
        </Link>
        <Link to={`/songs/${song?.artists[0].adamid}`}>
          <p className="text-xs text-gray-300 mt-1">{song?.subtitle}</p>
        </Link>
      </div>
    </div>
    <PlayPause 
      isPLaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    />
  </div>
)

const TopPlay = () => {
  const dispatch = useDispatch();
  const {activeSong, isPlaying}= useSelector((state)=>state.player);
  const {data} = useGetTopChartsQuery();
  const divRef = useRef(null);

  useEffect(()=>{
    divRef.current.scrollIntoView({behavior:'smooth'});
  });
  
  const topPlays = data?.slice(0,5);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  }

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({song,data,i}));
    dispatch(playPause(true));
  }

  return(
    <div ref={divRef} className="xl:ml-6 ml-0 wxl:mb-0 mb-6 
    first-letter:flex-1 xl:max-w-[450px] max-w-full flex flex-col">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-wl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song,i)=>(
            <TopChartCard 
            key={song?.key}  
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={()=> handlePlayClick(song,i)}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8">
      <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-wl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <Swiper 
          slidesPerView="auto"
          spaceBetween={15}
          FreeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          classsName="mt-4"
        >
          {topPlays?.map((song,i)=>(
            <SwiperSlide
              key={song?.key}
              style={{ width:'20%', height:'auto'}}
              className="rounded-full animate-slideright shadow-lg">

                <Link to={`/artists/${song?.artists[0].adamid}`}>
                  <img src={song?.images.background} alt="name" 
                  className="rounded-full w-full object-cover"
                  />
                </Link>
              </SwiperSlide>
          ))}
        </Swiper>
        </div>
    </div>
  )
}

export default TopPlay;
