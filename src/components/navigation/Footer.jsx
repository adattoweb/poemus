const date = new Date()

export default function Footer() {
    return (
        <div className="w-[100vw] sm:w-[80vw] poemus rounded-t-[10px] sm:rounded-[15px] h-[90px] flex justify-between mt-[50px] sm:mb-[20px]">
            <div className="mt-[10px] ml-[10px] sm:ml-[20px]">
                <h2 className="font-bold text-[14px] sm:text-[16px] cursor-pointer mona flex items-center gap-[10px]">POEMUS <span className="bg-white text-black w-[20px] h-[15px] sm:w-[40px] sm:h-[25px] flex items-center justify-center rounded-[5px] font-medium mon text-[12px] sm:text-[16px]">1.0</span></h2>
                <div className="flex flex-col mon text-[12px] sm:text-[14px]">
                    <p>Copyright © Poemus {date.getFullYear()}. All rights reserved.
                        <br />Developed by developer adattoweb.</p>
                </div>
            </div>
            <div className="hidden sm:flex">
                <a href="https://github.com/adattoweb" className="fitem"><img src="/github.png" alt="github"/></a>
                <a href="https://t.me/adattoweb" className="fitem"><img src="/telegram.png" alt="telegram"/></a>
            </div>
        </div>
    )
}
