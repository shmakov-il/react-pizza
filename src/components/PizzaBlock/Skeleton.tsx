import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton: React.FC = () => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={468}
        viewBox="0 0 280 468"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="138" cy="125" r="125"/>
        <rect x="0" y="267" rx="7" ry="7" width="280" height="25"/>
        <rect x="0" y="312" rx="7" ry="7" width="280" height="90"/>
        <rect x="0" y="425" rx="7" ry="7" width="90" height="27"/>
        <rect x="126" y="416" rx="21" ry="21" width="152" height="46"/>
    </ContentLoader>
)

export default Skeleton