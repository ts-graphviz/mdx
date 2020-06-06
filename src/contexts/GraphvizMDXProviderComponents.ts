import { createContext, FC } from 'react';

export type GraphvizMDXProviderComponents = { [key: string]: FC<any> };

export const GraphvizMDXProviderComponentsContext = createContext<GraphvizMDXProviderComponents>({});
