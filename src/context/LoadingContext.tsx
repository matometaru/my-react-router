import { createContext, useContext, useState, ReactNode } from 'react';
import { Spin } from 'antd';

const initialState = {
  loading: false,
  text: 'Loading...',
};
const LoadingContext = createContext(initialState);

type LoadingDispatchContextType = {
  showLoading: (text: string) => void;
  hideLoading: () => void;
};
const LoadingDispatchContext = createContext<LoadingDispatchContextType>({
  showLoading: (text: string) => {},
  hideLoading: () => {},
});

type ContextProps = {
  children: ReactNode;
}
export const LoadingProvider = ({ children }: ContextProps) => {
  const [state, setState] = useState(initialState);

  const showLoading = (text: string = initialState.text) => {
    setState({ loading: true, text });
  };

  const hideLoading = () => {
    setState(initialState);
  };

  return (
    <LoadingContext.Provider value={state}>
      <LoadingDispatchContext.Provider value={{ showLoading, hideLoading }}>
        <Spin tip={state.text} spinning={state.loading}>
          {children}
        </Spin>
      </LoadingDispatchContext.Provider>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  return useContext(LoadingContext);
};

export const useLoadingDispatch = () => {
  return useContext(LoadingDispatchContext);
};
