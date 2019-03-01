import * as React from "react";

const SvgIcon = ({ type, className = '', size = 'md', ...restProps }) => {


return (
    <svg
        className={`am-icon am-icon-${type.default.id} am-icon-${size} ${className}`}
        {...restProps}
    >
        <use xlinkHref={`#${type.default.id}`} />
    </svg>
);

};

export default SvgIcon;