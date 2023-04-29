import { createContext, useReducer, ReactNode } from "react";

interface IState {
  cart: { cartItems: any[] };
}

interface IAction {
  type: string;
  payload: any;
}

interface IContextProps {
  state: IState;
  dispatch: ({ type, payload }: IAction) => void;
}

export const StoreContext = createContext({} as IContextProps);

const initialState: IState = {
  cart: { cartItems: [] },
};

function reducer(state: IState, action: IAction) {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== action.payload.slug
      );
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    default:
      return state;
  }
}

interface IStoreProviderProps {
  children: ReactNode;
}

export function StoreProvider({ children }: IStoreProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
