"use server"
import { createClient } from '@/utils/supabase/client'

const supabase = createClient();

const searchProduct = async (search: any) => {
    // Modificamos la consulta para buscar resultados que contengan el valor proporcionado
    const { data, error } = await supabase
        .from('wikitank')
        .select("*")
        .ilike("name", `%${search.toLowerCase()}%`);

    return data;
}

const getElementById = async (id: any) => {
    const supabase = createClient()

    const { data, error } = await supabase.from("wikitank").select("*").eq("id", `${id}`)
    return data
}

const updateElementById = async (id: any, updatedData: any) => {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('wikitank')
        .update({
            name: updatedData.name,
            year: updatedData.year,
            description: updatedData.description,
            typeTank: updatedData.typeTank,
            image: updatedData.image
        })
        .eq('id', id);


    return { status: 200, wikitank: data }
}


export { searchProduct, getElementById, updateElementById };