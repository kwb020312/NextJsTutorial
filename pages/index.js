import Head from 'next/head'
import ItemList from '../src/components/ItemList'
import { Divider, Header } from 'semantic-ui-react'
import Axios from 'axios'



export default function Home({list}) {

  return (
    <div>
      <Head>
        <title>Chobby's Nextjs Tutorial</title>
        <meta name="description" content="Chobby's Blog Home!" />
      </Head>
      <><Header style={{paddingTop:40}} as="h3">베스트 상품</Header>
      <Divider/>
      <ItemList list={list.slice(0,9)} />
      <Header as="h3" style={{paddingTop:40}}>신상품</Header>
      <Divider/>
<ItemList list={list.slice(9)} /></>
      
    </div>
    
  )
}

export async function getStaticProps() {
  const apiUrl = process.env.apiUrl
  const res = await Axios.get(apiUrl)
  const data = res.data

  return {
      props: {
          list: data,
      }
  }
}
