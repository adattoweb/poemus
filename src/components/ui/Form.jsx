import { Link } from "react-router";

function ButtonProvider({children, isDisplayInfo}){
    return (
        <div className="flex items-center py-[10px] pb-[20px]">
            {children}
            {isDisplayInfo && <Link to="/poemus/info" className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] relative left-[20px]"><img src="info.png" alt="" /></Link>}
        </div>
    )
}

function InputProvider({children}){
    return (
        <div className="flex flex-col gap-[15px] mt-[20px] pb-[10px] w-[100%] justify-center items-center">
            {children}
        </div>
    )
}

function MidInputProvider({children}){
    return (
        <div className="flex flex-col gap-[15px] mt-[20px] border-y-2 border-[#5d5d5d] py-[10px] w-[100%] justify-center items-center">
            {children}
        </div>
    )
}

function NameInput({header, value, onChange, ref}){
    return <div className="flex-col gap-[5px] finput">
        <p className="mona text-[14px] sm:text-[16px]">{header}</p>
        <input ref={ref} className="text-[14px] sm:text-[16px] pl-[5px] bg-white rounded-[8px] w-[100%] h-[35px] sm:h-[40px] text-black focus:outline-[2px] focus:outline-[#0c0c0c]" value={value} onChange={(e) => onChange(e.target.value)} type="text"/>
    </div>
}
function PoemInput({header, value, onChange, ref}){
    return <div className="flex-col gap-[5px] finput">
        <p className="mona text-[14px] sm:text-[16px]">{header} <span className="text-red-500">*</span></p>
        <textarea ref={ref} className="text-[14px] sm:text-[16px] bg-white rounded-[8px] pl-[5px] pt-[3px] w-[100%] h-[80px] min-h-[40px] max-h-[120px] text-black focus:outline-[2px] focus:outline-[#0c0c0c]" value={value} onChange={(e) => onChange(e.target.value)}></textarea>
    </div>
}
function NumInput({header, value, onChange, ref}){
    return <div className="justify-between gap-[5px] finput">
        <p className="mona text-[14px] sm:text-[16px]">{header}</p>
        <input ref={ref} className='bg-white h-[20px] w-[35px] sm:h-[25px] sm:w-[40px] text-[14px] sm:text-[16px] rounded-[5px] pl-[5px] [-moz-appearance:textfield] text-black focus:outline-[2px] focus:outline-[#0c0c0c] mona' value={value} onChange={(e) => onChange(e.target.value)} type="number" />
    </div>
}

function BoxInput({header, selected, onChange, id, ref}){
    return <div className="gap-[10px] sm:gap-[20px] finput items-center">
        <label className="inline-flex items-center cursor-pointer bg-white w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] rounded-[5px] justify-center">
            <input ref={ref} type="checkbox" className="peer hidden" checked={id === selected} onChange={onChange}/>
            <span className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] rounded-full flex items-center justify-center peer-checked:bg-black transition-all duration-200 ease-in-out"></span>
        </label>
        <p className="mona text-[14px] sm:text-[16px]">{header}</p>
    </div>
}
function Cross({onClick}){
    return <div className="cross mona bg-[#ffffff] text-[#000000] w-[25px] h-[25px] flex justify-center items-center rounded-bl-[5px] rounded-tr-[15px] font-bold cursor-pointer" onClick={onClick}>X</div>
}
// function Timer({isTimer}){
//     return <div className={isTimer ? "timer mona poemus font-[16px] w-[40px] h-[20px] flex justify-center items-center rounded-t-[5px] relative bottom-[20px] right-[20px]" : "timer mona poemus font-[16px] w-[40px] h-[20px] flex justify-center items-center rounded-t-[5px] relative bottom-[20px] right-[20px] invisible"}>12</div>
// }
function Form({header, children, isCross, crossOnClick}){
    return (
        <div className="poemus flex flex-col items-center w-[270px] sm:w-[350px] rounded-[15px]">
            <div className="w-[100%] flex justify-end h-[15px]">{isCross && <Cross onClick={crossOnClick}/>}</div>
            <h2 className="mona font-bold text-[18px] sm:text-[20px]">{header}</h2>
            {children}
        </div>
    )
}
// START PACK
Form.NameInput = NameInput
Form.PoemInput = PoemInput
Form.NumInput = NumInput
Form.BoxInput = BoxInput

Form.MidInputProvider = MidInputProvider
Form.InputProvider = InputProvider
Form.ButtonProvider = ButtonProvider

export default Form