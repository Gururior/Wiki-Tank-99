"use client"
import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import sendData from '../acciones/send-product';

const SaveProduct = () => {
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(true);
    const [productData, setProductData] = useState({
        name: "",
        year: "",
        description: "",
        typeTank: "",
        image: "",
    });
    const [darkMode, setDarkMode] = useState(false); 

    const supabase = createClient();

    const toggleDarkMode = () => {
        setDarkMode(!darkMode); 
    };

    const validateData = (form) => {
        form.preventDefault();
        let errorList = {};

        if (!productData.name) {
            errorList.name = "Se necesita un nombre";
        }
        if (!productData.description) {
            errorList.description = " Se necesita una descripción";
        }
        if (!productData.year) {
            errorList.year = "Se necesita el año";
        }
        if (!productData.typeTank) {
            errorList.typeTank = "Se requiere llenar este campo";
        }
        if (!productData.image) {
            errorList.image = "Se necesita una imagen";
        }

        if (Object.keys(errorList).length > 0) {
            setErrors(errorList);
            return;
        }

        sendProductData();
    };

    const checkValue = (value) => {
        return (value.trim() !== '' || /^[a-z0-9]+$/i.test(value));
    };

    const sendProductData = async () => {
        try {
            const formData = new FormData();
            formData.append('name', productData.name);
            formData.append('year', productData.year);
            formData.append('description', productData.description);
            formData.append('typeTank', productData.typeTank); 
            formData.append('image', productData.image);

            const response = await sendData(formData);

            if (response.status) {
                // Enviar los datos de forma exitosa
                alert('El dato del producto fue enviado de forma exitosa:', response.message);
                setProductData({
                    name: "",
                    year: "",
                    description: "",
                    typeTank: "",
                    image: "",
                });
            } else {
                // Manejar error del servidor
                alert.error('Error procesando data:', response.message);
                setErrors(response.errors || {});
            }
        } catch (error) {
            alert.error('Error sending product data:', error.message);
        }
    };

    const setValueToState = (event) => {
        const { name, value } = event.target;

        let valueToCheck = checkValue(value);

        if (valueToCheck) {
            setIsValid(true);
            setProductData(data => ({
                ...data,
                [name]: value,
            }));
        } else {
            setIsValid(false);
        }
    };

    return (
        <>  
            <main className={` ${darkMode ? 'bg-slate-950 text-white size-full' : 'bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% size-full'}`}>
                <h2 className='flex justify-center pt-4 pb-10 text-4xl'>Formulario de Nuevo Tanque</h2>

                <div className='pl-12'>
                <button onClick={toggleDarkMode} className={`px-4 py-2 rounded-md mt-8  ${darkMode ? 'bg-yellow-300 text-black font-bold' : 'bg-purple-900 text-white font-bold'} hover:bg-gray-300 hover:text-white transition`}>
                    {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
                </button>
                </div>

                <div className="flex justify-center">
                    <div className={`max-w-96 m-4 mb-44 border rounded-lg shadow-md hover:shadow-lg ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                        <form onSubmit={validateData}>
                            <div className='flex flex-col justify-center'>
                                <label htmlFor="name" className='flex justify-center text-xl'>Nombre</label>
                                <input type="text" value={productData.name} onChange={setValueToState}  name='name' placeholder='' className={`rounded-md p-2 text-black ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100'}`} maxLength={50}/>
                                <p className='text-red-600 flex justify-center'>{errors.name}</p>

                                <label htmlFor="name" className='flex justify-center text-xl'>Imagen</label>
                                <input type="text" value={productData.image} onChange={setValueToState}  name='image' placeholder='' className={`rounded-md p-2 text-black ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100'}`} />
                                <p className='text-red-600 flex justify-center'>{errors.image}</p>

                                <label htmlFor="" className='flex justify-center text-xl'>Año</label>
                                <input  type="text" value={productData.year} onChange={setValueToState} name='year' placeholder='' className={`rounded-md p-2 text-black ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100'} overflow-y-auto`} maxLength={4}/>
                                <p className='text-red-600 flex justify-center'>{errors.year}</p>

                                <label htmlFor="" className='flex justify-center text-xl'>Descripción</label>
                                <textarea type="text" value={productData.description} onChange={setValueToState}  name='description' placeholder='' className={`rounded-md p-2 text-black ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100'} h-24 overflow-y-auto`} maxLength={77}></textarea>
                                <p className='text-red-600 flex justify-center'>{errors.description}</p>

                                <label htmlFor="" className='flex justify-center text-xl'>Tipo de Tanque</label>
                                <input type="text" value={productData.typeTank} onChange={setValueToState}  name='typeTank' placeholder='' className={`rounded-md p-2 text-black ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}  />
                                <p className='text-red-600 flex justify-center'>{errors.typeTank}</p>
                                
                                <p className='mt-6 mb-4 flex justify-center'>
                                    <button type="submit" className={`p-2 ${darkMode ? 'bg-gray-700 text-white' : 'bg-slate-500 text-white'} rounded-lg hover:bg-slate-800`}>Añadir</button>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
};

export default SaveProduct;
