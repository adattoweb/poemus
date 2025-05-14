import { useEffect } from 'react'

import Form from '../Form'
import Button from '../Button'

export default function EndForm({ isEn, name, len, errors, views, poem, onClick }) {
    if(!localStorage.getItem("poemus-id")) localStorage.setItem("poemus-id", "0")
    const localId = +localStorage.getItem("poemus-id")
    function addElement(){
        const date = new Date()
        localStorage.setItem(`poemus-item-${localId}`, `${name.replace(/@/g, " собачка ")}@${poem.replace(/@/g, " собачка ")}@${len}@${errors}@${views}@${(date.getDate() + "").padStart(2, "0")}.${((date.getMonth() + 1) + "").padStart(2, "0")}.${(date.getFullYear() + "").padStart(2, "0")} ${(date.getHours() + "").padStart(2, "0")}:${(date.getMinutes()+"").padStart(2, "0")}:${(date.getSeconds()+"").padStart(2, "0")}@${date.getTime()}`) // прибирати собачку з імен, тощо.
        localStorage.setItem("poemus-id", localId+1)
        localStorage.setItem("poemus-poems", +localStorage.getItem("poemus-poems") + 1)
        localStorage.setItem("poemus-len", +localStorage.getItem("poemus-len") + len)
        localStorage.setItem("poemus-errors", +localStorage.getItem("poemus-errors") + errors)
        localStorage.setItem("poemus-views", +localStorage.getItem("poemus-views") + views)
    }
    useEffect(() => {
        addElement()
    }, [])
    return (
        <Form header="POEMUS">
            <div className="py-[10px] px-[20px] flex flex-col">
            <p className="mona">{isEn ? "The End!" : "Кінець!"}</p>
                <p className="mona">{isEn ? "Poem title and author: " : "Назва вірша і автор: "} {name}</p>
                <p className="mona">{isEn ? "Mistakes made: " : "Помилок допущено: "} {errors}</p>
                <p className="mona">{isEn ? "Lines passed: " : "Рядків пройдено: "} {len}</p>
                <p className="mona">{isEn ? "Times revealed: " : "Підглядано разів: "} {views}</p>

            </div>
            <Form.ButtonProvider>
                <Button onClick={onClick}>{isEn ? "Home" : "На головну"}</Button>
            </Form.ButtonProvider>
        </Form>
    )
}