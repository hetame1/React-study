import { useState } from "react"

const IMAGE_1_URL = "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg"
const IMAGE_2_URL = "https://cdn.pixabay.com/photo/2015/12/01/20/28/fall-1072821_1280.jpg"
const IMAGE_3_URL = "https://cdn.pixabay.com/photo/2015/12/01/20/28/green-1072828_1280.jpg"

const Carousel = () => {
  const [activeImage, setActiveImage] = useState(1);
  console.log(activeImage);
  
  return (
    <>
      <div className="carousel">
        <ul className="carousel__slides">

          <input 
            type="radio"
            name="radio-buttons"
            id="img-1"
            checked={activeImage === 1}
            readOnly
          />

          <li className="carousel__slide-container">
            <div className="carousel__slide-img">
              <img
                alt="scenery 1"
                src={IMAGE_1_URL}
              />
            </div>
            <div className="carousel__controls">
              <label
                onClick={() => setActiveImage(3)}
                className="carousel__slide-prev"
              >
                <span>&lsaquo;</span>
              </label>
              <label
                onClick={() => setActiveImage(2)}
                className="carousel__slide-next"
              >
                <span>&rsaquo;</span>
              </label>
            </div>

          </li>
          <input 
            type="radio"
            name="radio-buttons"
            id="img-2"
            checked={activeImage === 2}
            readOnly
          />

          <li className="carousel__slide-container">
            <div className="carousel__slide-img">
              <img
                alt="scenery 1"
                src={IMAGE_2_URL}
              />
            </div>
            <div className="carousel__controls">
              <label
                onClick={() => setActiveImage(1)}
                className="carousel__slide-prev"
              >
                <span>&lsaquo;</span>
              </label>
              <label
                onClick={() => setActiveImage(3)}
                className="carousel__slide-next"
              >
                <span>&rsaquo;</span>
              </label>
            </div>
          </li>

          <input 
            type="radio"
            name="radio-buttons"
            id="img-3"
            checked={activeImage === 3}
            readOnly
          />
          <li className="carousel__slide-container">

            <div className="carousel__slide-img">
              <img
                alt="scenery 1"
                src={IMAGE_3_URL}
              />
            </div>
            <div className="carousel__controls">
              <label
                onClick={() => setActiveImage(2)}
                className="carousel__slide-prev"
              >
                <span>&lsaquo;</span>
              </label>
              <label
                onClick={() => setActiveImage(1)}
                className="carousel__slide-next"
              >
                <span>&rsaquo;</span>
              </label>
            </div>
          </li>

          <div className="carousel__dots">
            <label
              onClick={() => setActiveImage(1)}
              className="carousel__dot"
              id="img-dot-1"
            ></label>
            <label
              onClick={() => setActiveImage(2)}
              className="carousel__dot"
              id="img-dot-2"
            ></label>
            <label
              onClick={() => setActiveImage(3)}
              className="carousel__dot"
              id="img-dot-3"
            ></label>
          </div>

        </ul>
      </div>
    </>
  )
}

export default Carousel