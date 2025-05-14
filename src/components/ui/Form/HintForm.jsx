import Form from '../Form'
import Button from '../Button'

export default function HintForm({ words, rightAnswer, onClick }) {
    let newStr = rightAnswer
    if(+words > 0) {
        newStr = rightAnswer.split(" ").slice(0, +words).join(" ")
    }
    console.log(newStr)
    return (
        <Form header="POEMUS">
            <div className="p-[20px]">
                <p className="mona">{isEn ? "Correct answer:" : "Правильна відповідь:"}</p>
                <p className="mona">{newStr}</p>
            </div>
            <Form.ButtonProvider>
                <Button onClick={onClick}>{isEn ? "Got it" : "Зрозуміло"}</Button>
            </Form.ButtonProvider>
        </Form>
    )
}