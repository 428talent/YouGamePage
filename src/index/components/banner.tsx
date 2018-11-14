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
                    <img src="/ban1.3eeed532.jpg" />
                </div>
                <div>
                    <img src="/ban2.8304b2c7.jpg" />
                </div>
                <div>
                    <img src="/ban3.c3bd67a6.jpg" />
                </div>
                <div>
                    <img src="/ban4.f3349e2d.jpg" />
                </div>
            </Slider>
        );
    }
}
export default Banner
