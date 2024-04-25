import React from 'react';

interface SliderProps {
    widthCarrousel: number;
    HeigthCarrousel: number;
    items: any;
}

const Slider = ({ widthCarrousel, HeigthCarrousel, items }: SliderProps) => {
    return (
        <>
            <main className='w-full p-4 relative overflow-y-hidden overflow-x-auto'>
                <div className='overflow-auto p-4 pb-8' style={{ height: `${HeigthCarrousel}px`, width:`${ widthCarrousel}px` }}>
                    {Array.isArray(items) ? (
                        items.map((item: any, index: number) => (
                            <SliderCard key={index} item={item} index={index} widthCard={widthCarrousel} heightCard={HeigthCarrousel} />
                        ))
                    ) : (
                        <p>No hay elementos para mostrar</p>
                    )}
                </div>
            </main>
        </>
    );
};

interface SliderCardProps {
    item: any;
    index: number;
    widthCard: number;
    heightCard: number;
}

const SliderCard = ({ item, index, widthCard, heightCard }: SliderCardProps) => {
    return (
        <div className='bg-slate-200 rounded-md p-2 absolute overflow-y-hidden overflow-x-auto text-center' style={{ left: `${index * (widthCard  + 10)}px`, width: `${widthCard}px`, height: `${heightCard}px` }}>
            <p className='text-black'>{item.name}</p>
            <p className='text-black font-light'>{item.typeTank}</p>
            <img src={item.image} alt={`Image of product`} className='pb-2' style={{ left: `${index * (widthCard  + 10)}px`, width: `${widthCard}px`, height: `${heightCard}px` }} />
        </div>
    );
};

export default Slider;
