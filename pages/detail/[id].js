import Axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Loader } from 'semantic-ui-react'
import Item from '../../src/components/Item'

export default function ID({item}) {
    const router = useRouter()

    if(router.isFallback) {
        return (
            <div style={{padding:'100px 0'}}>
                <Loader active inline="centered">
                    Loading
                </Loader>
            </div>
        )
    }

    return (<>{item && <>
        <Head>
            <title>{item.name}</title>
            <meta name="description" content={item.description} />
        </Head>
        <Item item={item} />
    </>}</>)
}

export async function getStaticPaths() {
    const apiUrl = process.env.apiUrl
    const res = await Axios.get(apiUrl)
    const data = res.data
  
    return {
        paths: data.map(item => ({
            params: {
                id: item.id.toString()
            }
        })),
        fallback: false
    }
}

export async function getStaticProps(context) {
    const id = context.params.id;
    const apiUrl = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`
    const res = await Axios.get(apiUrl)
    const data = res.data

    return {
        props: {
            item: data,
        }
    }
}