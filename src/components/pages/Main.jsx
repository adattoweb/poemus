import { useState, useEffect } from 'react'
import IndexForm from '../ui/Form/IndexForm'
import TextForm from '../ui/Form/TextForm'
import PoslidovForm from '../ui/Form/PoslidovForm'
import MozaikaForm from '../ui/Form/MozaikaForm'

export default function Main({isEn}){
    if(!localStorage.getItem("poemus-poems")) localStorage.setItem("poemus-poems", "0")
    if(!localStorage.getItem("poemus-len")) localStorage.setItem("poemus-len", "0")
    if(!localStorage.getItem("poemus-errors")) localStorage.setItem("poemus-errors", "0")
    if(!localStorage.getItem("poemus-views")) localStorage.setItem("poemus-views", "0")
    if(!localStorage.getItem("poemus-startname")) localStorage.setItem("poemus-startname", "")
    if(!localStorage.getItem("poemus-starttext")) localStorage.setItem("poemus-starttext", "")

    const [name, setName] = useState(localStorage.getItem("poemus-startname"))
    const [poem, setPoem] = useState(localStorage.getItem("poemus-starttext"))

    const [start, setStart] = useState(0)
    const [words, setWords] = useState(0)
    const [timer, setTimer] = useState(0)
    const [selected, setSelected] = useState(1)

    const [num, setNum] = useState(2)

    const [id, setId] = useState(0)
    let newId = id
    if(start > 0) newId = id + (+start-1)
    
    const [header, setHeader] = useState("POEMUS")
    const [isClicked, setIsClicked] = useState(false) 
    useEffect(() => {
        if (timer > 0 && isClicked) {
            setHeader(`POEMUS (${timer})`);
            let counter = 0;
            const interval = setInterval(() => {
                counter++;
                const timeLeft = timer - counter;
                setHeader(`POEMUS (${timeLeft})`);
    
                if (timeLeft <= 0) {
                    setId(10000)
                    clearInterval(interval);
                }
            }, 1000);
    
            return () => clearInterval(interval);
        }
    }, [isClicked]);

    useEffect(() => {
        setHeader("POEMUS")
    }, [timer])
    
    return (
        <>
            {!isClicked && <IndexForm isEn={isEn} name={name} setName={setName} poem={poem} setPoem={setPoem} start={start} setStart={setStart} words={words} setWords={setWords} timer={timer} setTimer={setTimer} selected={selected} setSelected={setSelected} num={num} setNum={setNum} onClick={() => setIsClicked(true)}/>}
            {isClicked && selected === 1 ? <TextForm isEn={isEn} header={header} name={name} poem={poem} id={id} newId={newId} setId={setId} words={words} timer={timer} returnBack={() => {setIsClicked(false); setId(0)}}/> : null}
            {isClicked && selected === 2 ? <PoslidovForm isEn={isEn} numberOfVariants={num} header={header} name={name} poem={poem} id={id} newId={newId} setId={setId} words={words} timer={timer} returnBack={() => {setIsClicked(false); setId(0)}}/> : null}
            {isClicked && selected === 3 ? <MozaikaForm isEn={isEn} header={header} name={name} poem={poem} id={id} newId={newId} setId={setId} words={words} timer={timer} returnBack={() => {setIsClicked(false); setId(0)}}/> : null}
        </>
    )
}