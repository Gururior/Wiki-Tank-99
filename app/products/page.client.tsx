"use client"
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import productList from "@/app/acciones/product";
import { createClient } from '@/utils/supabase/client';
import { searchProduct } from "@/app/acciones/search";
import { useRouter } from 'next/navigation';
import Slider from "@/components/Slider";

export const metadata = {
    title: "Wiki-Tank",
    description: "Pagina Principal de Wiki", 
};

const Product = () => {
    const supabase = createClient();
    const router = useRouter();
    const [product, setProducts] = useState<any>([]);
    const [searchProductValue, setSearchProductValue] = useState("");
    const [load, setLoad] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [error, setError] = useState(""); 

    const toggleDarkMode = () => {
        setDarkMode(!darkMode); 
    };

    const sendSearchProduct = async () => {
        setLoad(true);
        if (!searchProductValue.trim()) {
            setError("Ingresa un valor de búsqueda");
            setLoad(false);
            return;
        } else {
            try {
                const response = await searchProduct(searchProductValue);
                setProducts(response);
                setLoad(false);
            } catch (error) {
                setError("Error al buscar productos: ");
                setLoad(false);
            }
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const dataResult = await productList();

                if (dataResult && dataResult.wikitank) {
                    setProducts(dataResult.wikitank);
                } else {
                    setProducts([]);
                }
                if (dataResult.error) {
                    setError(dataResult.error.message);
                }
                
                const { data: { session } } = await supabase.auth.getSession();
                if (!session) {
                    setError("Inicia sesión para ver los productos");
                    router.push('/products');
                    return;
                }

                const { data } = await supabase.from('products').select();
                if (data) {
                    setProducts(data);
                }
            } catch (error) {
                setError("Error al obtener productos: ");
            }
        };
    
        getData();
    }, []);

    const NoResultsMessage = () => {
        return (
            <div className={`${darkMode ? 'bg-slate-950 text-white' : 'bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% size-full'} p-4 text-center`}>
                <p>No se encontraron resultados</p>
            </div>
        );
    };

    const ErrorMessage = ({ message }: { message: string }) => {
        return (
            <div className="bg-red-500 text-white p-2 rounded-md">
                {message}
            </div>
        );
    };

    return (
        <main className={` ${darkMode ? 'bg-slate-950 text-white' : 'bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% size-full'}`}>
            <div className="flex flex-col justify-center content-center items-center">
                <div className="flex flex-wrap justify-center pt-4 pb-4">
                    <input 
                        onChange={(e: any) => { setSearchProductValue(e.target.value) }} 
                        type="text" 
                        className={`w-full sm:w-2/4 rounded-lg p-1 text-black ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100'} mb-2 sm:mb-0 sm:mr-2`} 
                    />
                    <button 
                        onClick={sendSearchProduct}   
                        className={`w-full sm:w-auto p-2 sm:ml-2 rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-cyan-400 text-black'} hover:bg-cyan-900 hover:text-white transition`}
                        disabled={load}
                    >
                        {load ? "Buscando..." : "Enviar"}
                    </button>
		<Link legacyBehavior href="/login">
                        <a className={`px-2 py-2 sm:px-4 sm:py-2 ml-2 sm:ml-4 rounded-md text-center ${darkMode ? 'bg-gray-700 text-white' : 'bg-cyan-400 text-black'} hover:bg-cyan-900 hover:text-white transition`}>Login</a>
                    </Link>
                </div>
                <div className="flex justify-center mt-2">
                    <button onClick={toggleDarkMode} className={`px-4 py-2 rounded-md mt-2 sm:mt-0 ${darkMode ? 'bg-yellow-300 text-black font-bold' : 'bg-purple-900 text-white font-bold'} hover:bg-gray-300 hover:text-white transition`}>
                        {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
                    </button>
                    <Link legacyBehavior href="/password">
                        <a className={`px-2 py-2 sm:px-4 sm:py-2 ml-2 sm:ml-4 rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-cyan-400 text-black'} hover:bg-cyan-900 hover:text-white transition`}>Cambiar Contraseña</a>
                    </Link>
                </div>
                <div className="w-full flex justify-center text-base text-center font-bold">
                    <Slider widthCarrousel={300} HeigthCarrousel={300} items={product}/>
                </div>
                
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {error && <ErrorMessage message={error} />}
                    {product.length > 0 ? (
                        product.map((item: any, index: number) => (
                            <li key={index} className="flex justify-center">
                                <div className={`max-w-xs m-4 border rounded-lg shadow-md hover:shadow-lg ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                                    <div className="p-4">
                                        <p className="text-xl text-center font-bold mb-2">{item.name}</p>
                                        <div className="flex justify-center">
                                            <img className="w-full h-72 object-cover" src={item.image} alt={`image of the product${item.name}`} loading="lazy" />
                                        </div>
                                        <p className='bg-emerald-800 text-white p-3 w-full flex justify-center mt-2 rounded-md'>{item.typeTank}</p>
                                        <p className={`text-center mt-12  ${darkMode ? 'text-white' : 'text-black'}`}>{item.description}</p>
                                    </div>
                                    <div className="p-4">
                                        <Link legacyBehavior href={`/products/edit/${item.id}`}>
                                            <a className={`px-4 py-3 mt-6 rounded-md hover:bg-cyan-900 transition flex justify-center ${darkMode ? 'bg-sky-950 text-white' : 'bg-cyan-400 text-white'}`}>Más</a>
                                        </Link>
                                    </div>
                                    
                                </div>
                            </li>
                        ))
                    ) : (
                        <NoResultsMessage />
                    )}
                </ul>
                
                <div className="mt-12 mb-44">
                    <Link  legacyBehavior href="/save-product">
                        <a className={`px-8 py-8 rounded-md hover:bg-green-600 transition ${darkMode ? 'bg-green-500 text-white' : 'bg-green-500 text-white'}`}>Agregar Nuevo Producto</a>
                    </Link>
                </div>

                <div className="mt-12 mb-44">
                    
                </div>

            </div>
            
        </main>
    )
}

export default Product;
