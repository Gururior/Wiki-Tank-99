"use server"
import { createClient } from '@/utils/supabase/client'
import { revalidatePath } from 'next/cache'

const supabase = createClient()

const sendData = async (formData: FormData) => {
    const { name, year, description, typeTank, image, gallery} = Object.fromEntries(formData.entries());

    if (name === null || year === null || description === null || typeTank === null || image === null || gallery === null) {
        return {
            status: false,
            message: "Se requieren algunos valores",
            errors: null,
            params: { name, year, description, typeTank, image, gallery}
        };
    }

    try {
        const {  error } = await supabase.from('wikitank').insert([{ name, year, description, typeTank, image, gallery}]).select();

        if (error) {
            return {
                status: false,
                message: `Ocurrio un error de tipo ${error.message}`,
                errors: null,
                params: { name, year, description, typeTank, image, gallery}
            };
        }


        revalidatePath("/save-product");

        return {
            status: true,
            message: "La data se inserto",
            errors: null,
            params: { name, year, description, typeTank, image, gallery}
        };
    } catch (error) {
        return {
            status: false,
            message: `Ocurrio un error de tipo ${error}`,
            errors: null,
            params: { name, year, description, typeTank, image, gallery}
        };
    }
}

export default sendData;
