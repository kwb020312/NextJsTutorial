import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useEffect , useState } from 'react'
import ItemList from '../src/components/ItemList'
import { Divider, Header, Loader } from 'semantic-ui-react'



export default function Home() {
  const [list ,setList] = useState([])
  const [isLoading , setIsLoading]  = useState(true)
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const getData = () => {
    axios.get(API_URL).then(res => { setList(res.data) ; setIsLoading(false)})
  }

  useEffect(() => {
    getData()
  },[])
  return (
    <div>
      <Head>
        <title>Chobby's Nextjs Tutorial</title>
        <meta name="description" content="Chobby's Blog Home!" />
      </Head>
      {isLoading===true ? (
        <div style={{ padding: "300px 0"}}>
          <Loader inline="centered" active>Loading</Loader>
        </div>
      ) :<><Header style={{paddingTop:40}} as="h3">베스트 상품</Header>
      <Divider/>
      <ItemList list={list.slice(0,9)} />
      <Header as="h3" style={{paddingTop:40}}>신상품</Header>
      <Divider/>
<ItemList list={list.slice(9)} /></>}
      
    </div>
    
  )
}
