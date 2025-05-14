import { useState, useRef } from 'react'

import HintForm from './HintForm'
import EndForm from './EndForm'

import Form from '../Form'
import Button from '../Button'

export default function PoslidovForm({ isEn, numberOfVariants, header, name, poem, id, newId, setId, words, timer, returnBack }) {
    const [isHint, setIsHint] = useState(false)
    const array = poem.split("\n")

    let arrayAnswers = []

    const answer = array[newId]
    const unique = [...new Set(array)]

    function generate(){
        for (let i = 1; i <= numberOfVariants - 1; i++) {
            let isRight = false
            while(!isRight){
                let rand = Math.floor(Math.random() * array.length);
                if (!arrayAnswers.includes(array[rand]) && array[rand] !== answer) {
                    arrayAnswers.push(array[rand])
                    isRight = true
                }
            }
        }
    
        let index = Math.floor(Math.random() * (numberOfVariants))
        arrayAnswers.splice(index, 0, answer)
    }
    generate()

    console.log(arrayAnswers)

    const views = useRef(0)
    const errors = useRef(0)
    const passed = useRef(0)

    const playerAnswer = useRef("")

    const ref = useRef()

    function nextAnswer(){
        if(playerAnswer.current === answer){
            setId(id+1)
            passed.current++
        } else {
            errors.current++;
            if(ref.current) ref.current.style.border="#cc2a1f 2px solid";
            setTimeout(() => {
                if(ref.current) ref.current.style.border="none";
            }, 3000)
        }
        playerAnswer.current = ""
    }

    function AnswerList(){
        const [selected, setSelected] = useState(100)
        function AnswerItem({name, id}){
            let myRef = null
            if(id === selected) myRef = ref
            return (
                <div ref={myRef} className={id === selected ? "positem active" : "positem"} onClick={() => {
                    setSelected(id)
                    playerAnswer.current = name
                }}>{name}</div>
            )
        }
        return (<div className="answer__content w-[80%] flex flex-col gap-[10px] mt-[10px]">
            {arrayAnswers.map((el, id) => {
                    return <AnswerItem key={el+id} id={id} name={el}/>
                   })} 
        </div>)
    }
    // інпат провайдер перероби
    return (
        <>
        {!isHint && newId < array.length ? <Form header={header} isCross={true} isTimer={timer > 0} crossOnClick={returnBack}>
            <div className="flex flex-col gap-[2px] mt-[20px] pb-[10px] w-[100%] justify-center items-center">
                    <h4>{isEn ? "Choose the correct sequence" : "Оберіть правильну послідовність"}</h4>
                    <p>{isEn ? "Current line:" : "Поточний рядок:"} {newId + 1}</p>
                <AnswerList/>
            </div>
            <Form.ButtonProvider>
                <Button onClick={nextAnswer}>Далі</Button>
                <div className="help montagu bg-[#ffffff] text-[#000000] w-[25px] h-[25px] flex justify-center items-center rounded-[5px] text-[20px] font-bold relative left-[20px] cursor-pointer" onClick={() => {setIsHint(true); views.current++}}>?</div>
            </Form.ButtonProvider>
        </Form> : newId < array.length && <HintForm isEn={isEn} words={words} onClick={() => setIsHint(false)} rightAnswer={answer}/>}
        {newId >= array.length && <EndForm isEn={isEn} name={name} len={passed.current} errors={errors.current} views={views.current} poem={poem} onClick={returnBack}/>}
        </>
    )
}