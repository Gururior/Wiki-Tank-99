"use server"
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'



export async function saveNewPass(password, confirmPass) {
    
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    

    const {error} = await supabase
    .auth
    .updateUser({password: password});

    if(error){
        return{
            success: false,
            message: `No se pudo guardar la nueva contraseña.  ${error.message}`,
            errors: null,
        }
    }
    
    return{
        success: true,
        message: `Si se cambio con exito`,
        errors: null,
    }
    
}



