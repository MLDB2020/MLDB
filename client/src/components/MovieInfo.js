import {React,useState, useEffect} from 'react'


const API_Key = process.env.REACT_APP_TMDB_API_KEY;
const API_Images = 'https://image.tmdb.org/t/p/original';


function MovieInfo({match}) {
    const API_Video = `https://api.themoviedb.org/3/movie/${match.params.id}/videos?api_key=${API_Key}&language=en-US`;
    const [Item, setItem] = useState({});
    const [videoId, setVideoId] = useState("");

    useEffect(() => {
        fetchItem();
        getVideo();
        console.log(match);
    }, [])
    

    const fetchItem = async() =>{
        const fetchItem = await fetch(`https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${API_Key}&language=en-US`)
        const item = await fetchItem.json();
        setItem(item);
        console.log(item);
    }

    const getVideo = async () => {
		await fetch(API_Video)
		.then(res => res.json())
		.then(data => {
			setVideoId((data.results.length !== 0) ? data.results[0].key : "1");
		});
	};

	return (
		<div className="infoContainer">
            
            
            <div className="movieOverview">
            <div className="posterdiv">
			<img className="infoimg" src={API_Images+Item.poster_path}/>
            </div>
            <div className="text">
            
                <h3>
                 
                    {Item.overview}
                
                </h3>
                <span>Rating : ⭐: { Item.vote_average }</span>
                </div>
            </div>
            <div className="videowrapper">
            <iframe className="video"
						title={Item.title }
						src={`https://www.youtube.com/embed/${videoId}`}
						sandbox="allow-scripts allow-same-origin"
					></iframe>

            </div>


		</div>
	)
}

export default MovieInfo;