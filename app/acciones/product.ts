import { createClient } from '@/utils/supabase/client';

const productList = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.from("wikitank").select();

    // Verificar si los datos no son nulos antes de devolverlos
    if (data === null) {
        return {
            wikitank: [],
            error: {
                message: "No se encontraron datos en la base de datos."
            }
        };
    }

    return {
        wikitank: data,
        error,
    };
};

export default productList;
