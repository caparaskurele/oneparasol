import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

import benefitOneImg from "../../public/img/benefit-one.png";
import benefitTwoImg from "../../public/img/benefit-two.png";

const benefitOne = {
  title: "Benefits",
  desc: "Explore simplified insights and expert services across Finance, Law, and Taxation — all in one place.",
  image: benefitOneImg,
  bullets: [
    {
      title: "Trusted Knowledge Hub",
      desc: "Stay informed with expert-written blogs on Finance, Law, and Taxation—simplified for everyday understanding.",
      icon: <FaceSmileIcon />,
    },
    {
      title: "Professionally Curated Insights",
      desc: "Stay informed with content curated by domain specialists, helping you make smarter financial and legal decisions.",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "All-in-One Services",
      desc: "Access professional services under one roof, from legal compliance to financial planning and tax filing.",
      icon: <CursorArrowRaysIcon />,
    },
  ],
};

const benefitTwo = {
  title: "Offer more benefits here",
  desc: "You can use this same layout with a flip image to highlight your rest of the benefits of your product. It can also contain an image or Illustration as above section along with some bullet points.",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Mobile Responsive Template",
      desc: "OneParasol is designed as a mobile first responsive template.",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "Powered by Next.js & TailwindCSS",
      desc: "This platform is powered by latest technologies and tools.",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "Dark & Light Mode",
      desc: "OneParasol comes with a zero-config light & dark mode. ",
      icon: <SunIcon />,
    },
  ],
};


export {benefitOne, benefitTwo};
