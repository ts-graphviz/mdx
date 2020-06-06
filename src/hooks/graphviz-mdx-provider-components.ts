import { useContext } from 'react';
import {
  GraphvizMDXProviderComponentsContext,
  GraphvizMDXProviderComponents,
} from '../contexts/GraphvizMDXProviderComponents';

export function useGraphvizMDXProviderComponents(): GraphvizMDXProviderComponents {
  return useContext(GraphvizMDXProviderComponentsContext);
}
