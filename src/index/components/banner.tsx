import * as React from "react";
import Slider from "react-slick";
import '../../assets/img/ban1.jpg'
import '../../assets/img/ban2.jpg'
import '../../assets/img/ban3.jpg'
import '../../assets/img/ban4.jpg'
class Banner extends React.Component {
    render() {
        const settings = {
            infinite: true,
            speed: 500,
            arrows:false,
            dots:true,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <Slider {...settings}>
                <div>
                    <img src="/ban1.773a4add.jpg" />
                </div>
                <div>
                    <img src="/ban2.21e3556a.jpg" />
                </div>
                <div>
                    <img src="/ban3.02990fc1.jpg" />
                </div>
                <div>
                    <img src="/ban4.0624c1b3.jpg" />
                </div>
            </Slider>
        );
    }
}
export default Banner
