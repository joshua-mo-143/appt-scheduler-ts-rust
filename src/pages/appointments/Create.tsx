import React, { SetStateAction } from 'react'
import Layout from '../../components/Layout'

type Props = {}

export const Create = (props: Props) => {

    const [date, setDate] = React.useState<String>("");
    const [time, setTime] = React.useState<String>("");
    

    const d = new Date();
    let dayTest = 1;
    let day = d.getDate();
    let month = d.getMonth();
    

    const meme = {
        defaultElement: 'bg-stone-100',
        selectedDate: 'bg-fuchsia-300',
        selectedTime: 'bg-fuchsia-200'
    }

    const updateVar = (e: React.SyntheticEvent, setVar: React.Dispatch<SetStateAction<String>>, type: String) => {
        e.preventDefault()
        const element = e.target as HTMLSpanElement;
        if (element.classList.contains("bg-stone-800")) {
            return;
        }

        switch (type) {
            case "day": {
                let { selectedDate, defaultElement } = meme;
                const elementArray = document.querySelectorAll(`.${selectedDate}`);

                for (let i = 0; i < elementArray.length; i++) {
                    elementArray[i].classList.remove(selectedDate);
                    elementArray[i].classList.add(defaultElement);
                }

                element.classList.remove(defaultElement)
                element.classList.add(selectedDate)
                break
            }
            case "time": {
                let { selectedTime, defaultElement } = meme;
                const elementArray = document.querySelectorAll(`.${selectedTime}`);

                for (let i = 0; i < elementArray.length; i++) {
                    elementArray[i].classList.remove(selectedTime);
                    elementArray[i].classList.add(defaultElement);
                }

                element.classList.remove(defaultElement)
                element.classList.add(selectedTime)
                break
            }
            default: { }
        }


        setVar(element.innerText)
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()

        
        console.log("Hello world!")
    }

    return (
        <Layout>
            <div className='grid grid-cols-3 grid-rows-1 self-center lg:w-3/5 gap-8 rounded-xl bg-sky-300 p-5'>
                <div className='flex flex-col align-center justify-self-center gap-8 w-full mx-4 col-span-1'>
                    <p>You're booking a meeting with: Blast</p>
                    <img src="https://randomuser.me/api/portraits/men/13.jpg" alt="Display picture for Blast" width="50%" height="100%" className='rounded-xl object-cover' />
                    <div>
                        <p>Bio:</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore perferendis culpa labore sint quos nihil reprehenderit velit vel ipsum, dolores, nisi aspernatur dicta nam impedit, illo possimus! Labore enim ea libero alias accusamus officiis quam soluta veritatis laborum! Molestias aut error vel neque voluptas nobis fugit quasi quisquam quas quia.</p>
                    </div>
                </div>
                <div className='flex flex-col align-center justify-self-center w-full gap-8 mx-4 col-span-2'>
                    <p>What day would you like to book your appointment?</p>
                    <div id="date-selection" className='w-full text-lg content-center align-center grid grid-cols-7 self-center grid-rows-auto gap-y-6 gap-x-4'>
                        {
                            [...Array(30).keys()].map((x, i) => (
                                <span className={i + 1 > dayTest ? 'rounded-xl shadow-md p-2 text-center bg-stone-100 hover:bg-blue-200 transition-all cursor-pointer date-selection'
                                    : 'bg-stone-800 rounded-xl shadow-md p-2 text-center'}
                                    key={i + 1}
                                    onClick={(e) => updateVar(e, setDate, "day")}
                                >{i + 1}</span>
                            ))
                        }
                    </div>
                    {date ?
                        <div className='w-full grid grid-cols-6 grid-rows-auto gap-2 self-center'>
                            {
                                [...Array(16).keys()].map((x, i) => (
                                    <span className="bg-stone-100 shadow-md rounded-xl px-2 text-center hover:bg-blue-200 transition-all cursor-pointer" key={i} onClick={(e) => updateVar(e, setTime, "time")}>{
                                        i % 2 == 0 ?
                                            `${(i + (9 - (i / 2))).toFixed(0)}:00` :
                                            `${(i + (8 - (i / 2))).toFixed(0)}:30`
                                    }</span>
                                ))
                            }
                        </div>
                        : null}
                    {time ?

                        <form className='flex flex-col lg:flex-row gap-4'>
                            <input className='w-full shadow-md border-2 border-black px-2' type="email" name="email" placeholder="Put your e-mail in here..."></input>
                            <button type="submit" className='py-2 px-4 bg-stone-100 rounded-xl hover:bg-fuchsia-300 shadow-md transition-all'>Book</button>
                        </form>

                        : null}
                </div>
            </div>
        </Layout>
    )
}

export default Create