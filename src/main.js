import './assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import "solana-wallets-vue/styles.css";
import SolanaWallets from "solana-wallets-vue";
import {
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,
  } from "@solana/wallet-adapter-wallets";
  
  const walletOptions = {
    wallets: [
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network: "devnet" }),
      new TorusWalletAdapter(),
      new SolletWalletAdapter({ network: "devnet" }),
      new SolletExtensionWalletAdapter({ network: "devnet" }),
    ],
    autoConnect: true,
  };
// import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

// import {
//   PhantomWalletAdapter,
//   SlopeWalletAdapter,
//   SolflareWalletAdapter,
// } from "@solana/wallet-adapter-wallets";

// const walletOptions = {
//   wallets: [
//     new PhantomWalletAdapter(),
//     new SlopeWalletAdapter(),
//     new SolflareWalletAdapter({ network: WalletAdapterNetwork.Devnet }),
//   ],
//   autoConnect: true,
// };

const app = createApp(App)
app.use(SolanaWallets, walletOptions)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')
