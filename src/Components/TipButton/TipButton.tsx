import { MdLocalFireDepartment } from 'react-icons/md'
import Button from 'src/Components/Button/Button'
import { useAppSelector, usePressHolder } from 'src/utils/hooks'
import _throttle from 'lodash.throttle'
import { ComponentProps, useEffect, useState } from 'react'
import './tipbutton.style.css'
import { random, randomItem } from 'src/utils/helperFunctions'


interface Particle {
    id: string,
    offsetX: number,
    color: '#ff6a00' | '#ff7717' | '#ff6217' | '#ff8217' | '#ff5717'
    animation: 'fly-spark-1' | 'fly-spark-2',
    animationSpeed: 1 | 2 | 3,
    scale: number
}

type Props = {
    onTip: (tip: number) => void
} & Omit<ComponentProps<typeof Button>, 'children'>

export default function TipButton({ onTip = () => { }, ...props }: Props) {
    const [tipCnt, setTipCnt] = useState(0)
    const [sparks, setSparks] = useState<Particle[]>([]);
    const [wasActive, setWasActive] = useState(false);

    const isMobileScreen = useAppSelector(s => s.theme.isMobileScreen)

    // useEffect(() => {
    //     setInterval(() => {
    //         setTipCnt(s => s + 1)

    //         const newSpark = {
    //             id: Math.random().toString(),
    //             offsetX: random(1, 99),
    //             animation: randomItem('fly-spark-1', 'fly-spark-2'),
    //             animationSpeed: randomItem(1, 1.5, 2),
    //             color: randomItem('#ff6a00', '#ff7717', '#ff6217', '#ff8217', '#ff5717'),
    //             scale: random(1, 2)
    //         };
    //         setTimeout(() => {
    //             setSparks(s => {
    //                 return s.filter(spark => spark.id !== newSpark.id)
    //             })

    //         }, newSpark.animationSpeed * 1000)

    //         setSparks(oldSparks => [...oldSparks, newSpark])

    //     }, 300);
    // }, [])


    const { onPressDown, onPressUp } = usePressHolder(_throttle(() => {
        const incStep = (Math.ceil((tipCnt + 1) / 100) + 1) ** 2;
        setTipCnt(s => s + incStep)

        const newSpark = {
            id: Math.random().toString(),
            offsetX: random(1, 99),
            animation: randomItem('fly-spark-1', 'fly-spark-2'),
            animationSpeed: randomItem(1, 1.5, 2),
            color: randomItem('#ff6a00', '#ff7717', '#ff6217', '#ff8217', '#ff5717'),
            scale: random(1.2, 2.2)
        };

        // if on mobile screen, reduce number of sparks particles to 60%
        if (!isMobileScreen || Math.random() > .4) {
            setSparks(oldSparks => [...oldSparks, newSpark])
            setTimeout(() => {
                setSparks(s => {
                    return s.filter(spark => spark.id !== newSpark.id)
                })

            }, newSpark.animationSpeed * 1000)
        }

    }, 100), 100);

    const handlePressDown = () => {
        setWasActive(true);
        onPressDown();
    }

    const handlePressUp = (event?: any) => {

        if (!wasActive) return;

        setWasActive(false);
        if (event?.preventDefault) event.preventDefault();
        onPressUp();
        if (tipCnt === 0)
            onTip(10);
        else
            setTimeout(() => {
                setSparks([]);
                onTip(tipCnt);
                setTipCnt(0);
            }, 1000)
    }

    return (
        <Button
            onMouseDown={handlePressDown}
            onMouseUp={handlePressUp}
            onMouseLeave={handlePressUp}

            onTouchStart={handlePressDown}
            onTouchEnd={handlePressUp}
            size='md'
            color='none'
            className="tip-button border relative 100 my-16 noselect"
            style={{
                "--scale": tipCnt,
            } as any}
            {...props}
        >
            Hold To Tip !!! <MdLocalFireDepartment className='text-fire' />

            <span
                className='tip-counter'
            >{tipCnt}</span>

            <div
                className='spark'
                style={{
                    "--offsetX": 23,
                    "--animationSpeed": 3,
                    "--scale": 1,
                    "animationIterationCount": 'infinite',
                    "animationName": 'fly-spark-1',
                    "animationDelay": '1.1s',
                    color: '#ff6a00'
                } as any}
            ><MdLocalFireDepartment className='' /></div>
            <div
                className='spark'
                style={{
                    "--offsetX": 50,
                    "--animationSpeed": 2.2,
                    "--scale": 1,
                    "animationIterationCount": 'infinite',
                    "animationName": 'fly-spark-2',
                    "animationDelay": '0.4s',
                    color: '#ff6a00'
                } as any}
            ><MdLocalFireDepartment className='' /></div>
            <div
                className='spark'
                style={{
                    "--offsetX": 70,
                    "--animationSpeed": 2.5,
                    "--scale": 1,
                    "animationIterationCount": 'infinite',
                    "animationName": 'fly-spark-1',
                    color: '#ff6a00'
                } as any}
            ><MdLocalFireDepartment className='' /></div>
            {sparks.map(spark =>
                <div
                    key={spark.id}
                    className='spark'
                    style={{
                        "--offsetX": spark.offsetX,
                        "--animationSpeed": spark.animationSpeed,
                        "--scale": spark.scale,
                        "animationName": spark.animation,
                        "color": spark.color
                    } as any}
                ><MdLocalFireDepartment className='' /></div>)
            }
        </Button>

    )
}
