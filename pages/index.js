import Head from 'next/head'
import Image from 'next/image'
import { Container, TextInput } from '@mantine/core'

export default function Home() {
    return(
        <Container>
            <Head>
                <title>Search Parks</title>
                <meta name="description" content="National park searcher" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <TextInput
            placeholder="Search"
            label="Search..."
            />
        </Container>
            
    )
}