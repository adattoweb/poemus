import { useRef } from 'react'

import Form from '../Form'
import Button from '../Button'

export default function IndexForm({isEn, name, setName, poem, setPoem, start, setStart, words, setWords, timer, setTimer, selected, setSelected, num, setNum, onClick}) {
    function showError(ref){
        if(ref.current) ref.current.style.border="#cc2a1f 2px solid";
        setTimeout(() => {
            if(ref.current) ref.current.style.border="none";
        }, 3000)
    }
    const nameRef = useRef()
    const poemRef = useRef()
    const startRef = useRef()
    const wordsRef = useRef()
    const timerRef = useRef()
    const numRef = useRef()
    const unique = [...new Set(poem.split("\n"))]
    function startPoem(){
        if(poem.length <= 0){
            showError(poemRef)
            return
        }
        if(+start < 0 || +start > poem.split("\n").length || (start+"").length === 0){
            showError(startRef)
            return
        }
        if(+words < 0 || (words+"").length === 0){
            showError(wordsRef)
            return
        }
        if(+timer < 0 || (timer+"").length === 0 || timer > 600){
            showError(timerRef)
            return
        }if((+num <= 0 || (num+"").length === 0 || +num > poem.split("\n").length || +num > 10 || unique.length < +num) && selected === 2){
            showError(numRef)
            return
        }
        onClick()

    }
    return (
<Form header={"POEMUS"}>
    <Form.InputProvider>
        <Form.NameInput header={isEn ? "Poem Title and Author" : "Назва вірша і автор"} value={name} onChange={(e) => {
            localStorage.setItem("poemus-startname", e)
            setName(e)
        }} ref={nameRef}/>
        <Form.PoemInput header={isEn ? "Poem" : "Вірш"} value={poem} onChange={(e) => {
            localStorage.setItem("poemus-starttext", e)
            setPoem(e)
        }} ref={poemRef}/>
    </Form.InputProvider>
    <Form.MidInputProvider>
        <Form.NumInput header={isEn ? "Start from line" : "Початок з рядка"} value={start} onChange={setStart} ref={startRef}/>
        <Form.NumInput header={isEn ? "Number of words in hint" : "Кількість слів у підказці"} value={words} onChange={setWords} ref={wordsRef}/>
        <Form.NumInput header={isEn ? "Timer (seconds)" : "Таймер (в секундах)"} value={timer} onChange={setTimer} ref={timerRef}/>
        {selected === 2 && <Form.NumInput header={isEn ? "Number of options" : "Кількість варіантів"} value={num} onChange={setNum} ref={numRef}/>}
    </Form.MidInputProvider>
    <Form.InputProvider>
        <Form.BoxInput header={isEn ? "Text Mode" : "Текстовий режим"} selected={selected} id={1} onChange={() => setSelected(1)}/>
        <Form.BoxInput header={isEn ? "Sequential Mode" : "Послідовний режим"} selected={selected} id={2} onChange={() => setSelected(2)}/>
        <Form.BoxInput header={isEn ? "Mosaic Mode" : "Мозаїчний режим"} selected={selected} id={3} onChange={() => setSelected(3)}/>
    </Form.InputProvider>
    <Form.ButtonProvider isDisplayInfo={true}>
        <Button onClick={startPoem}>{isEn ? "Start" : "Почати"}</Button>
    </Form.ButtonProvider>
</Form>

    )
}