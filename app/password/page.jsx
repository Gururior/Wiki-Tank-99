"use client"
import React, { useState } from 'react';
import { saveNewPass } from './change';
import { createClient } from '@/utils/supabase/client';

export default function ChangePassword() {
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [errors, setErrors] = useState({});
    const [darkMode, setDarkMode] = useState(false); 

    const toggleDarkMode = () => {
        setDarkMode(!darkMode); 
    };

    function SavePassword(event) {
        event.preventDefault();

        let errorList = {};

        if (!password) {
            errorList.password = "La contraseña es obligatoria"; 
        } else if (password.length < 6) {
            errorList.password = "La contraseña debe tener al menos 6 caracteres.";
        }

        if (!confirmPass) {
            errorList.confirmPass = "Confirmar la contraseña es obligatoria"; 
        } else if (confirmPass !== password) {
            errorList.confirmPass = "La contraseña y la confirmación deben coincidir";
        }

        if (Object.keys(errorList).length > 0) {
            setErrors(errorList);
            return;
        }

        // Llama a la función para cambiar la contraseña
        saveNewPass(password, confirmPass)
            .then((result) => {
                console.log(result);
                alert(result.message);  
            })
            .catch((error) => {
                console.log(error);
                alert(error.message);
            });
    }

    return (
        <main className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
            <h2 className="flex justify-center pt-4 pb-10 text-4xl">Cambio de contraseña</h2>
            <div className="flex justify-center">
                <div className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
                    <form onSubmit={SavePassword}>
                        <div className="flex flex-col justify-center">
                            <input type="password" placeholder="Nueva contraseña" className="rounded-md px-4 py-2 bg-inherit border mb-6" value={password} onChange={(e) => { setPassword(e.target.value); setErrors({ ...errors, password: '' }) }} />
                            {errors.password && <p className="text-white">{errors.password}</p>}
                        </div>

                        <div className="flex flex-col justify-center">
                            <input type="password" placeholder="Confirmar contraseña" className="rounded-md px-4 py-2 bg-inherit border mb-6" value={confirmPass} onChange={(e) => { setConfirmPass(e.target.value); setErrors({ ...errors, confirmPass: '' }) }} />
                            {errors.confirmPass && <p className="text-white">{errors.confirmPass}</p>}
                            
                            <p className="mt-6 mb-4 flex justify-center">
                                <button type="submit" className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">Cambiar Contraseña</button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
