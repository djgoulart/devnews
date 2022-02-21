import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe';

import styles from './home.module.scss'

interface HomeProps {
  product: {
    productId: string;
    amount: number;
  }
}

export default function Home<NextPage>({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | dev.News</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about <br />the <span>React</span> world.</h1>
          <p>Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.productId} />
        </section>
        <img src="/images/mulher.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve('price_1KVQfhCkjnFKTG2aDCXBMH5S')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US',
      {
        style: 'currency',
        currency: 'USD'
      })
      .format(price.unit_amount / 100),
  }

  return {
    props: {
      product
    }
  }
}
