import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNewProduct, getProducts as fetchProducts } from "../api/firebase";

export default function useProducts() {
    const queryClient = useQueryClient();

    const productsQuery = useQuery({
        queryKey: ['products'], 
        queryFn: fetchProducts,
        staleTime: 1000 * 60
    });

    const addProduct = useMutation({
        mutationFn: async ({ product, url}) => addNewProduct(product, url),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products']});
        }
    });

    return { productsQuery,  addProduct }
}

