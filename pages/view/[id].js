import Axios from 'axios'
import Head from 'next/head'
import {useRouter} from 'next/router'
import { useEffect, useState } from 'react'
import { Loader } from 'semantic-ui-react'
import Item from '../../src/components/Item'

export default function ID({item}) {

    return (<>{item && <>
        <Head>
    <title>{item.name}</title>
    <meta name="description" content={item.description} />
    
        </Head>
        <Item item={item} />
    </>}</>)
}

export async function getServerSideProps(context) {
    const id = context.params.id;
    const apiUrl = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`
    const res = await Axios.get(apiUrl)
    const data = res.data

    return {
        props: {
            item: data
        }
    }
}