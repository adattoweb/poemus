import { useState, useRef, useEffect } from 'react'

import HintForm from './HintForm'
import EndForm from './EndForm'

import Form from '../Form'
import Button from '../Button'

export default function TextForm({ isEn, header, name, poem, id, newId, setId, words, timer, returnBack }) {
    const [text, setText] = useState("")
    const [isHint, setIsHint] = useState(false)
    const array = poem.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"'«»<>…\[\]?!]+/g, "").replace(/\s{2,}/g, " ").split("\n")
    const ref = useRef(null)

    useEffect(() => {
        ref.current.focus()
    }, [])

    const views = useRef(0)
    const errors = useRef(0)
    const passed = useRef(0)

    const answer = array[newId] ? array[newId].trim().replaceAll(",", "") : undefined
    console.log(answer)

    function nextAnswer(){
        if(text.trim().toLowerCase() === answer.toLowerCase()){
            setId(id+1)
            setText("")
            ref.current.focus()
            passed.current++
        } else {
            errors.current++;
            if(ref.current) ref.current.style.border="#cc2a1f 2px solid";
            setTimeout(() => {
                if(ref.current) ref.current.style.border="none";
            }, 3000)
        }
    }
    function Percent(){
        let counter = 0
        for(let i = 0; i < text.trim().length; i++){
            if(text.trim()[i] && answer[i] && text.trim()[i].toLowerCase() === answer[i].toLowerCase()) {
                counter++; 
            } else counter--
        }
        let percent = Math.round((counter / answer.length) * 100)
        if(percent < 0) percent = 0
        return <div className="percent">{percent}%</div>
    }

    return (
        <>
            {!isHint && newId < array.length ?
                <Form header={header} isCross={true} isTimer={timer > 0} crossOnClick={returnBack}>
                    <Percent />
                    <Form.InputProvider>
                        <Form.NameInput ref={ref} header={`${isEn ? "Enter line" : "Введіть"} ${newId + 1} ${isEn ? "line" : "рядок"}`} value={text} onChange={setText} />
                    </Form.InputProvider>
                    <Form.ButtonProvider>
                        <Button onClick={nextAnswer}>{isEn ? "Next" : "Далі"}</Button>
                        <div className="help montagu bg-[#ffffff] text-[#000000] w-[25px] h-[25px] flex justify-center items-center rounded-[5px] text-[20px] font-bold relative left-[20px] cursor-pointer" onClick={() => { setIsHint(true); views.current++ }}>{isEn ? "?" : "?"}</div>
                    </Form.ButtonProvider>
                </Form> :
                newId < array.length &&
                <HintForm isEn={isEn} words={words} onClick={() => setIsHint(false)} rightAnswer={answer} />
            }
            {newId >= array.length &&
                <EndForm isEn={isEn} name={name} len={passed.current} errors={errors.current} views={views.current} poem={poem} onClick={returnBack} />
            }
        </>
    )
}