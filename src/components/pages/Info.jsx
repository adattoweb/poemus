import Button from '../ui/Button'

export default function Info({ isEn }) {
    return (
        <div className="poemus flex flex-col py-[20px] px-[15px] sm:px-[30px] sm:rounded-[20px] w-[100vw] sm:w-[80vw] md:w-[70vw]">
            <h2 className="mona font-bold text-[20px] m-auto">POEMUS</h2>
            <div className="info__block">
                <p><span className="font-bold">POEMUS</span> {isEn
                    ? 'is a project by the Ukrainian developer adattoweb. Its main goal is to help users memorize poems. With POEMUS (preferably used as recommended), the efficiency of learning poetry significantly increases.'
                    : '— це проєкт українського розробника adattoweb. Його головна мета — допомогти користувачам вивчати вірші. Завдяки POEMUS (краще використовувати як рекомендовано) ефективність запамʼятовування віршів значно зростає.'
                }</p>
            </div>
            <div className="info__block">
                <h3 className="mona">{isEn ? 'Optional Fields' : 'Необовʼязкові поля'}</h3>
                <p><span className="font-bold">{isEn ? 'Poem title and author' : 'Назва та автор вірша'}</span> – {isEn ? 'helps navigate the history of poems more easily.' : 'допомагає легше орієнтуватися в історії віршів.'}</p>
                <p><span className="font-bold">{isEn ? 'Start from line' : 'Почати з рядка'}</span> – {isEn ? 'enter the number of the line from which you want to start learning the poem.' : 'введи номер рядка, з якого хочеш почати вивчення вірша.'}</p>
                <p><span className="font-bold">{isEn ? 'Number of words in the hint' : 'Кількість слів у підказці'}</span> – {isEn ? 'choose how many FIRST words will be shown in the hint.' : 'обери, скільки ПЕРШИХ слів буде показано в підказці.'}</p>
                <p><span className="font-bold">{isEn ? 'Timer' : 'Таймер'}</span> – {isEn ? "if you'd like to set a timer, choose how many seconds it should last." : 'за бажанням встанови таймер, вказавши кількість секунд.'}</p>
            </div>
            <div className="info__block">
                <h3 className="mona">{isEn ? 'Required Fields' : 'Обовʼязкові поля'} <span className="text-red-500">*</span></h3>
                <p><span className="font-bold">{isEn ? 'Poem' : 'Вірш'} <span className="text-red-500">*</span></span> – {isEn ? 'enter the poem you want to learn. Make sure to press Enter before each new line.' : 'введи вірш, який хочеш вивчити. Натискай Enter перед кожним новим рядком.'}</p>
                <p><span className="font-bold">{isEn ? 'Mode' : 'Режим'} <span className="text-red-500">*</span></span> – {isEn ? "choose the mode you'll be using. More details below." : 'обери режим, який будеш використовувати. Деталі нижче.'}</p>
            </div>
            <div className="info__block">
                <h3 className="mona">{isEn ? 'Modes' : 'Режими'}</h3>
                <p><span className="font-bold">{isEn ? 'Text mode' : 'Текстовий режим'}</span> – {isEn ? "a mode where you must type each line manually. It's slow and less effective." : 'режим, у якому потрібно вручну вводити кожен рядок. Повільний і менш ефективний.'}</p>
                <p><span className="font-bold">{isEn ? 'Sequential' : 'Послідовний'}</span> – {isEn ? 'a mode where you choose the order of lines by their numbers.' : 'режим, у якому ти сам обираєш порядок рядків за номерами.'}</p>
                <p><span className="font-bold">{isEn ? 'Mosaic mode' : 'Мозаїчний режим'}</span> – {isEn ? 'Here you have to collect sentences from the poem word by word. Quite effectively.' : 'Треба складати рядки вірша слово за словом. Досить ефективно.'}</p>
            </div>
            <div className="info__block">
                <h3 className="mona">{isEn ? 'Pages' : 'Сторінки'}</h3>
                <p><span className="font-bold">{isEn ? 'History' : 'Історія'}</span> – {isEn ? "here you can view poems you've already practiced and restart them if you wish." : 'тут можна переглянути вірші, які вже тренувалися, і перезапустити їх.'}</p>
            </div>
            <div className="m-auto pt-[20px]">
                <Button href="/">{isEn ? 'Got it' : 'Зрозуміло'}</Button>
            </div>
        </div>
    )
}
