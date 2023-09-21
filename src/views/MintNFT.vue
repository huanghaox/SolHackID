<template>
  <div>
    <button @click="connect()">connect</button>
    <button @click="mint()">mint</button>
  </div>
</template>

<script>
import {
  Connection,
  Transaction,
  TransactionInstruction,
  PublicKey
} from "@solana/web3.js";
import { Buffer } from 'buffer';

const getProvider = () => {
  if ('phantom' in window) {
    const provider = window.phantom?.solana;

    if (provider?.isPhantom) {
      return provider;
    }
  }
  window.open('https://phantom.app/', '_blank');
};

export default {
  name: "app",
  data() {
    return {
      avatarList: [],
    };
  },
  mounted(){
    window.Buffer = Buffer;
  },
  methods: {
    async connect(){
      const provider = getProvider();
      console.log(provider.request);
      try {
          const resp = await provider.connect();
          console.log(resp.publicKey.toString());
      } catch (err) {
          // { code: 4001, message: 'User rejected the request.' }
      }
    },
    async mint(){
      const provider = getProvider(); // see "Detecting the Provider"
      const network = "https://rpc.ankr.com/solana_devnet/1ca95fd42dfd53468f2f20b5688d788444ff312d5efa4dbf31b22eec504c6266";

      const keys = [
        { pubkey: provider.publicKey, isSigner: true, isWritable: true },
      ]

      const connection = new Connection(network);
      const transaction = new Transaction().add(
        new TransactionInstruction({
          keys,
          programId: new PublicKey('ESuhKxpLp24BGKaYDN6zxRmCJkT7wkpyMKejbhP6rqaW'),
          data: Buffer.alloc(0),
        })
      );
      let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = provider.publicKey;

      const tx = await provider.signAndSendTransaction(transaction);
      console.log(tx);

      const confirm = await connection.getSignatureStatus(sended.signature);
      console.log(confirm)

    },
  },
};
</script>

<style scoped>

</style>
