import * as React from "react";
import Slider from "react-slick";
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
                    <img src="https://s1.sonkwo.com/Fp60_pcliHJfKn7pHnsqWxWXPygO" />
                </div>
                <div>
                    <img src="https://s1.sonkwo.com/Fp60_pcliHJfKn7pHnsqWxWXPygO" />
                </div>
                <div>
                    <img src="https://s1.sonkwo.com/Fp60_pcliHJfKn7pHnsqWxWXPygO" />
                </div>
                <div>
                    <img src="https://s1.sonkwo.com/Fp60_pcliHJfKn7pHnsqWxWXPygO" />
                </div>
            </Slider>
        );
    }
}
export default Banner
