import { useContext } from 'react';
import { Components } from '../types';
import { GraphvizMDXProviderComponentsContext } from '../contexts/GraphvizMDXProviderComponents';

export function useGraphvizMDXProviderComponents(): Components {
  return useContext(GraphvizMDXProviderComponentsContext);
}
