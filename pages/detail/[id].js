import Axios from 'axios'
import Head from 'next/head'
import Item from '../../src/components/Item'

export default function ID({item , name}) {

    return (<>{item && <>
        <Head>
            <title>{item.name}</title>
            <meta name="description" content={item.description} />
        </Head>
        {name} 환경 입니다.
        <Item item={item} />
    </>}</>)
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { id: '495' }},
            { params: { id: '488' }},
            { params: { id: '468' }},
        ],
        fallback: true
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
            name:process.env.name
        }
    }
}