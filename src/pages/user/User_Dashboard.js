import ImageSliderCarousel from "../../components/user/ImageSlider";

// import { userDataContext } from "./UserLayout ";

function UserDashboard() {
  // const userData = useContext(userDataContext);
  // console.log("data ctx", userData);
  const images = [
    {
      name: "image1",
      url: "/images/1.jpg",
    },
    { url: "/images/2.jpg", name: "image2" },
    {
      name: "image3",
      url: "/images/3.jpg",
    },
    {
      name: "image4",
      url: "/images/4.jpg",
    }
  ];
  return (
    <>
      <div className="user-dashboard-page">
        <h5 className="page-title text-center"> User Dashboard</h5>
        <div className="body-container">
          <div className="image-slider-container">
            <ImageSliderCarousel images={images} />
          </div>
        </div>
      </div>
    </>
  );
}

export { UserDashboard };
