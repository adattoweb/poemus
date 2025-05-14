import { Link, useLocation } from "react-router";

export default function Header({ isEn, setIsEn }) {
  const location = useLocation()
  const url = location.pathname
  return (
    <div className="w-[100vw] sm:w-[80vw] poemus px-[10px] sm:px-[15px] sm:rounded-[15px] h-[65px] flex items-center justify-between fixed top-[0px] sm:top-[30px]">
      <h1 className="mona font-bold text-[20px] pl-[10px] hidden sm:block">POEMUS</h1>
      <ul className="flex items-center gap-[15px] md:gap-[20px]">
        <li className={url[url.length - 1] === "/" || url[url.length - 1] === "#" ? "headitem active" : "headitem"}><Link to="/poemus/"><img className="icon" src="/poemus/home.png" /></Link></li>
        <li className={url.includes("history") ? "headitem active" : "headitem"}><Link to="/poemus/history"><img className="icon" src="/poemus/history.png" /></Link></li>
        <li className={url.includes("info") ? "headitem active" : "headitem"}><Link to="/poemus/info"><img className="icon" src="/poemus/info.png" /></Link></li>
        <li className="headitem"><p className="mon text-[20px] font-bold w-[25px] cursor-pointer" onClick={() => setIsEn(!isEn)}>{isEn ? "UA" : "EN"}</p></li>
      </ul>
    </div>)
}