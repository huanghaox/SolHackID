<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>
      <el-button v-if="!userAddress" type="primary" round @click="connectWallet()">
      Connect Wallet
    </el-button>
    <el-button v-else type="primary" round>
      {{userAddress}}
    </el-button>
    </div>
    <div>
      <el-button  type="primary" round @click="signAndSend()">
      查合约
    </el-button>
    </div>
    <!-- <wallet-multi-button></wallet-multi-button> -->
  </div>
</template>

<script setup>
import { onMounted,ref } from 'vue'
import { Connection,Transaction } from '@solana/web3.js'
// import { WalletMultiButton } from "solana-wallets-vue";

let userAddress = ref(null)
const isPhantomInstalled = window.phantom?.solana?.isPhantom
const getProvider = () => {
  if ('phantom' in window) {
    const provider = window.phantom?.solana
    if (provider?.isPhantom) {
      return provider
    }
  }
  window.open('https://phantom.app/', '_blank')
}
const checkWallet = () => {
  if (!isPhantomInstalled) {
    getProvider()
  }
}
const connectWallet = async () => {
  let provider = getProvider() // see "Detecting the Provider"
  try {
    const resp = await provider.connect()
    const res = resp.publicKey.toString()
    userAddress.value = res
    provider.connect({ onlyIfTrusted: true });
  } catch (err) {
    console.error(` { code: 4001, message: 'User rejected the request.' }`);
  }
}
const signAndSend = async () => {
  const provider =window.phantom?.solana; // see "Detecting the Provider"
  const network = "https://bitter-fragrant-leaf.solana-devnet.discover.quiknode.pro/7ef21d028c4d7e91f9c2817effa1a5805abd07e8/";
  const connection = new Connection(network);
  console.log("connection",connection)
  const transaction = new Transaction();
  console.log("transaction",transaction)
  const signedTransaction = await provider.signTransaction(transaction);
  const signature = await connection.sendRawTransaction(signedTransaction.serialize());
  console.log("signature",signature)
  
}
onMounted(() => {
  console.log(`the component is now mounted.`)
  checkWallet()
})
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
