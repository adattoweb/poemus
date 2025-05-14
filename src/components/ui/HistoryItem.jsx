export default function HistoryItem({ isEn, localKey, setRender }){
    const [name, poem, passed, errors, views, time] = localStorage.getItem(localKey).split("@") // ще тут є allTime
    const poemArray = poem.split("\n").slice(0, 3)
    let needName = name
    if(name.length > 30){
        needName = name.slice(0, 30) + "..."
    }
    for(let i = 0; i < poemArray.length; i++){
        let words = poemArray[i].split(" ")
        let len = 0;
        for(let j = 0; j < words.length; j++){
            len += words[j].length + 1
            if(len >= 30) {
                poemArray[i] = poemArray[i].slice(0, len) + "..."
                break
            }
        }
    }
    const percent = Math.round((+errors / +passed) * 100)

    return (
        <div className="hitem poemus rounded-[15px] w-[85vw] sm:w-[70vw] py-[10px] px-[15px] flex flex-col md:flex-row md:justify-between">
            <div className="hitem__left">
                <h3 className="mona font-bold text-[14px] sm:text-[16px] md:text-[18px]">{!needName.length ? isEn ? "Without name" : "Без назви" : needName}</h3>
                <div className="hitem__text text-[12px] sm:text-[14px] md:text-[16px]">
                    <p>{poemArray[0]}</p>
                    <p>{poemArray[1]}</p>
                    <p>{poemArray[2]}</p>
                </div>
                <div className="hitem__stats mona gap-[15px] text-[12px] sm:text-[14px] md:text-[16px] whitespace-nowrap hidden lg:flex">
                    <p>{isEn ? "Lines passed" : "Рядків пройдено"}: {passed}</p>
                    <p>{isEn ? "Mistakes" : "Помилок"}: {errors}</p>
                    <p>{isEn ? "Reveals" : "Підглядувань"}: {views}</p>
                    <p>
                        {isEn ? "Success" : "Успіх"}: {errors === 0 ? 100 : percent >= 100 ? 0 : 100 - percent}%
                    </p>
                </div>
            </div>
            <div className="hitem__right flex md:flex-col items-center md:items-end gap-[10px] mt-[10px] md:mt-0">
                <p className="mona whitespace-nowrap text-[12px] sm:text-[14px] md:text-[16px]">{time}</p>
                <div className="hitem__menu flex md:flex-col gap-[5px]">
                    <a href="/"><img className="w-[22px] sm:w-[25px] cursor-pointer" src="/poemus/copy.png" alt="Copy poem" onClick={() => {
                        localStorage.setItem("poemus-startname", name)
                        localStorage.setItem("poemus-starttext", poem)
                    }}/></a>
                    <img className="w-[22px] sm:w-[25px] cursor-pointer" src="/poemus/deleteImg.png" alt="Delete poem" onClick={() => {
                        localStorage.removeItem(localKey)
                        setRender()
                    }} />
                </div>
            </div>
        </div>
    )
}