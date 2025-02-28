import { useAuthContext } from "../context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addOrUpdateToCart, getCart, removeFromCart, updateCartQuantity } from "../api/firebase";

export default function useCart() {
    const { uid } = useAuthContext();
    const queryClient = useQueryClient();
    const cartQuery = useQuery({
        queryKey: ['carts', uid || ''],
        queryFn: () => getCart(uid),
        enabled: !!uid
    });

    const addOrUpdateItem = useMutation({
        mutationFn: async (product) => addOrUpdateToCart(uid, product),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['carts',uid]});
        }
    });

    const updateCartItem = useMutation({
        mutationFn: async (product) => {
            return updateCartQuantity(uid, product);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['carts', uid] });
        }
    });

    const removeItem = useMutation({
        mutationFn: async (productKey) => removeFromCart(uid, productKey),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['carts',uid]});
        }
    });

    return { cartQuery, addOrUpdateItem, updateCartItem, removeItem };
}