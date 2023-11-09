import 'index.css'
import App from 'App'
import { IAnypayService } from 'services/Anypay'
import {createRoot} from 'react-dom/client';

const AnypaySDK = ({ config, element = 'root' } : IAnypayService & { element: string }) => {
  const container = document.getElementById(element) as HTMLElement;
  const root = createRoot(container); 

  root.render(<App config={config} />);
}

// @ts-ignore
window.AnypaySDK = AnypaySDK
