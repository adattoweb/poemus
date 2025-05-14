import { useState, useRef, useEffect } from 'react'

import HintForm from './HintForm'
import EndForm from './EndForm'

import Form from '../Form'
import Button from '../Button'

export default function TextForm({ isEn, header, name, poem, id, newId, setId, words, timer, returnBack }) {
    const [isHint, setIsHint] = useState(false)
    const array = poem.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"'«»<>…\[\]?!]+/g, "").replace(/\s{2,}/g, " ").split("\n")

    const views = useRef(0)
    const errors = useRef(0)
    const passed = useRef(0)

    const ref = useRef(null)

    const answer = array[newId] ? array[newId].replaceAll(",", "").trim() : undefined

    let wordsArray = answer ? [...new Set(answer.split(" ").map(el => el.toLowerCase()))] : []

    const globalChoosed = useRef([])

    const variants = []

    function generate() {
        for (let i = 0; i < wordsArray.length; i++) {
            if(Math.random() > 0.5) variants.push(wordsArray[i])
            else variants.unshift(wordsArray[i])
        }
    }
    generate()


    function nextAnswer() {
        console.log(globalChoosed.current.join(" "))
        if (globalChoosed.current.join(" ") === answer) { // ***
            setId(id + 1)
            globalChoosed.current = []
            passed.current++
        } else {
            errors.current++
            if (ref.current) ref.current.style.outline = "#cc2a1f 2px solid";
            setTimeout(() => {
                if (ref.current) ref.current.style.outline = "none";
            }, 3000)
        }
    }

    console.log(variants)

    function MozaikaList({choosed, setChoosed}) {
        const [selected, setSelected] = useState(100)
        function MozaikaItem({ name, id }) {
            return (
                <div className={id === selected ? "mozitem active" : "mozitem"} onClick={() => {
                    setSelected(id)
                    setChoosed([...choosed, name])
                    globalChoosed.current = [...choosed, name]
                }} >{name}</div>
            )
        }
        return (
            <>
                <div className="mozaika__words flex gap-[10px] w-[100%] justify-center flex-wrap items-center pt-[10px]">
                    {variants.map((el, id) => {
                        return <MozaikaItem key={el + id} name={el} id={id} />
                    })}
                </div>
            </>
        )
    }
    function MozaikaParent(){
        const [choosed, setChoosed] = useState(globalChoosed.current)
        return (
            <>
                <div className="flex flex-col gap-[2px] mt-[10px] pb-[10px] w-[80%] justify-center">
                    <h4>{isEn ? "Choose the correct sequence" : "Оберіть правильну послідовність"}</h4>
                    <p>{isEn ? "Current line:" : "Поточний рядок:"} {newId + 1}</p>
                    <p className="rounded-[5px]" ref={ref}>{isEn ? "Answer:" : "Відповідь:"} {choosed.join(" ")}</p>
                    <MozaikaList choosed={choosed} setChoosed={setChoosed} />
                </div>
                <Form.ButtonProvider>
                    <div className="help montagu bg-[#ffffff] text-[#000000] w-[20px] h-[20px] flex justify-center items-center rounded-[5px] text-[18px] font-bold relative right-[15px] cursor-pointer sm:w-[25px] sm:h-[25px] sm:text-[20px]" onClick={() => { setIsHint(true); views.current++ }}>?</div>
                    <Button onClick={nextAnswer}>{isEn ? "Next" : "Далі"}</Button>
                    <img src="remove.png" alt={isEn ? "remove last word" : "видалити останнє слово"} className="w-[25px] h-[25px] invert relative left-[15px] cursor-pointer sm:w-[30px] sm:h-[30px]" onClick={() => {
                        setChoosed(choosed.slice(0, -1))
                        globalChoosed.current = choosed.slice(0, -1)
                    }} />
                </Form.ButtonProvider>
            </>

        )
    }
    return (
        <>
            {!isHint && newId < array.length ? <Form header={header} isCross={true} isTimer={timer > 0} crossOnClick={returnBack}>
                <MozaikaParent/>
            </Form> : newId < array.length && <HintForm isEn={isEn} words={words} onClick={() => setIsHint(false)} rightAnswer={answer} />}
            {newId >= array.length && <EndForm isEn={isEn} name={name} len={passed.current} errors={errors.current} views={views.current} poem={poem} onClick={returnBack} />}
        </>
    )
}