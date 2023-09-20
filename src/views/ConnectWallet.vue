<template>
  <div>
    <button @click="connect()">connect</button>
    <button @click="gogo()">gogo</button>
    <button @click="mint()">init</button>
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
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';

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
    async gogo(){
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
    async init(){
      const provider = getProvider(); // see "Detecting the Provider"
      const network = "https://rpc.ankr.com/solana_devnet/1ca95fd42dfd53468f2f20b5688d788444ff312d5efa4dbf31b22eec504c6266";

      const connection = new Connection(network);
      const transaction = new Transaction().add(
        Token.createInitMintInstruction(
          TOKEN_PROGRAM_ID,
          new PublicKey('Bs9MCpLf4nQ1H8J2DJUsiUt4G9Bv2bh91WD2oBautLLb'),
          0,
          provider.publicKey,
          provider.publicKey,
        )
      );

      let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = provider.publicKey;

      const tx = await provider.signAndSendTransaction(transaction);
      console.log(tx);

      const confirm = await connection.getSignatureStatus(sended.signature);
      console.log(confirm)

    },
    async mint(){
      const provider = getProvider(); // see "Detecting the Provider"
      const network = "https://rpc.ankr.com/solana_devnet/1ca95fd42dfd53468f2f20b5688d788444ff312d5efa4dbf31b22eec504c6266";

      const connection = new Connection(network);
      const transaction = new Transaction().add(
        Token.createMintToInstruction(
          TOKEN_PROGRAM_ID,
          provider.publicKey,
          new PublicKey('Bs9MCpLf4nQ1H8J2DJUsiUt4G9Bv2bh91WD2oBautLLb'),
          provider.publicKey,
          [],
          1,
        ),
      );

      let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = provider.publicKey;

      const tx = await provider.signAndSendTransaction(transaction);
      console.log(tx);

      const confirm = await connection.getSignatureStatus(sended.signature);
      console.log(confirm)

    }
  },
};
</script>

<style scoped>

</style>
