import React from 'react';

const Ads = ({ companies }) => {
  let random = Math.floor(Math.random() * companies.length);

  return (
    <div className="ads">
      { companies.length > 0 && 
        <a className="ads__container" href={ companies[random].website } target="_blank" rel="noreferrer">
          <img src={ process.env.PUBLIC_URL + companies[random].imageFile } alt="ad_banner" />
        </a>
      }
    </div>
  )
}

export default Ads;
