import React from 'react'
import Layout from '../../components/Layout'

type Props = {}

export const Create = (props: Props) => {

    let [date, setDate] = React.useState<Date>();

    const d = new Date();
    let day = 1;
    let month = d.getMonth();

    return (
        <Layout>
            <div className='flex flex-row flex flex-col align-center gap-8'>
                <p className='text-lg lg:text-2xl text-center'>Select a date:</p>
                <div className='w-2/5 text-2xl content-center align-center grid grid-cols-5 self-center grid-rows-auto gap-y-4'>
                    {
                        [...Array(30).keys()].map((x, i) => (
                            <span className={i + 1 > day ? 'rounded-xl w-2/5 p-2 text-center bg-stone-300 hover:bg-blue-500 transition-all' : 'bg-stone-800 rounded-xl w-2/5 p-2 text-center'} 
                            key={i + 1}
                            >{i + 1}</span>
                        ))
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Create