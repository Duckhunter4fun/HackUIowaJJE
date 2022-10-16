import Head from 'next/head'
import Image from 'next/image'
import { BackgroundImage, Container, Text, TextInput, Button, Space, Grid, Group, Blockquote } from '@mantine/core'
import { HeaderSimple } from '../components/HeaderSimple'
import { BadgeCard } from '../components/BadgeCard'
import { useState } from 'react'


export default function Home() {

    const [data, setData] = useState()

    function findParks() {
        const APIKEY = "bfqNy26zwGbEKneubHPeMvyWi0HBuvhhJ2Un8pgg"
        const searchTerm = document.getElementById('search').value
        
        fetch(`https://developer.nps.gov/api/v1/parks?q=${searchTerm}&api_key=${APIKEY}`)
            .then(response => response.json())
            .then(data => setData(data))
    }

    return(
        <Container>
            <Head>
                <title>Search Parks</title>
                <meta name="description" content="National park searcher" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <HeaderSimple links={[{link: "/", label: "Home"},{link: "/about", label: "About"}]}/>

            <Image src="/../public/glacier.jpg" width={1000} height={300}/>
            <Blockquote>Because The World Matters</Blockquote>
            <h1>Search National Parks</h1>

            <Group mb={30} align="center" grow="true">
                <TextInput
                id='search'
                placeholder="Search National Parks"
                />
                <Button onClick={(findParks)}>Search</Button>
            </Group>
            
            <Grid>
                {data?.data.map((item, i) => (
                        <Grid.Col key={i} span={6}><BadgeCard key={i} image={data.data[i].images[0].url} 
                                                            title={data.data[i].fullName}
                                                            description={data.data[i].description}
                                                            country={data.data[i].states}
                                                            link={"/parkDetails/" + data.data[i].parkCode}>
                                                            </BadgeCard>
                        </Grid.Col> 
                    ))
                }                     
            </Grid>
            

            {/* {data && <BadgeCard image={data.data[0].images[0].url} 
                                title={data.data[0].fullName}
                                description={data.data[0].description}
                                country={data.data[0].states}></BadgeCard>} */}

        </Container>
            
    )
}