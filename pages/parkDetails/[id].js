import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Tabs, Table, Title, Text, Accordion, Paper, Group, HoverCard, Button, Box, Space, List, ThemeIcon, Center, BackgroundImage, Grid, Card } from '@mantine/core';
import { HeaderSimple } from '../../components/HeaderSimple'
import { ImageCard } from '../../components/ImageCard'
import useSWR from 'swr'
import Link from 'next/link';
//import fetcher from './fetcher';

//no need to keep key private. for time sake leave key here
const APIKEY = 'bfqNy26zwGbEKneubHPeMvyWi0HBuvhhJ2Un8pgg';

// use next router to pass in 4 dig park code.
//use affect
//takes in park code

const fetcher = (apiURL) => fetch(apiURL).then((res) => res.json())


export default function DynamicPage() {
    const router = useRouter()
    const {
        query: { id },
    } = router
    //gets json data for specific park details

    
    const { data, error } = useSWR(`https://developer.nps.gov/api/v1/parks?parkCode=${id}&api_key=${APIKEY}`, fetcher)


    if (data) {
        return (
            <Container>
                <HeaderSimple links={[{link: "/", label:"Home"},{link: "/about", label: "About"}]}/>
                <br />
                <Box sx={{ maxWidth: 800 }} mx="auto">
                    <BackgroundImage
                        src={data.data[0].images[0].url}
                        radius="lg"
                    >
                        <Center p="md">
                            <Title order={1} color="#fff">{data.data[0].fullName}</Title>
                        </Center>
                    </BackgroundImage>
                </Box>
                <br />
                <Text lineClamp={4}>
                    {data.data[0].description}
                </Text>
                <br />
                    <Grid>
                        {data.data[0].images.map((item, i) => (
                                <Grid.Col key={i} span={1}>
                                    <Box>
                                        <BackgroundImage
                                            src={data.data[0].images[i].url}
                                            radius="lg"
                                        >
                                        </BackgroundImage>
                                    </Box>
                                </Grid.Col> 
                            ))
                        }                     
                    </Grid>
                <br />
                <Tabs variant="outline" orientation="vertical" defaultValue="gallery">
                    <Tabs.List>
                        <Tabs.Tab value="Info" >Info</Tabs.Tab>
                        <Tabs.Tab value="Activities" >Activities</Tabs.Tab>
                        <Tabs.Tab value="Pictures" >Pictures</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="Info" pl="xl">
                        
                        <Text lineClamp={40}>
                            {getInfoPiece(data)}
                        </Text>
                    </Tabs.Panel>

                    <Tabs.Panel value="Activities" pl="xl">
                        <Text lineClamp={100}>
                            <Center p="md">
                                {getActivitiesPiece(data)}
                            </Center>
                        </Text>
                    </Tabs.Panel>

                    <Tabs.Panel value="Pictures" pl="xs">
                        {getPicturesPiece(data)}
                    </Tabs.Panel>
                </Tabs>
            </Container>
        )
    }
        
    if (error) {
        return (
            <Container>
                <h1>We are sorry, there was an error with your request.</h1>
            </Container>
        )
    }
  }



  function getPicturesPiece(data){

    return(
        <Container>
            <Grid>
                {data?.data[0].images.map((item, i) => (
                        <Grid.Col key={i} span={6}><ImageCard key={i} image={data.data[0].images[i].url} 
                                                            title={data.data[0].images[i].title}
                                                            caption={data.data[0].images[i].caption}>
                                                    </ImageCard>
                        </Grid.Col> 
                    ))
                }                     
            </Grid>
        </Container>
    )

  }







//gets json details on specific park
// function GetParkDetails(parkId) {
  
//   const fetcher = (apiURL) => fetch(apiURL).then((res) => res.json())
//   const { data, error } = useSWR(`https://developer.nps.gov/api/v1/parks?parkCode=${parkId}&api_key=${APIKEY}`, fetcher)

//   return {
//     data: data,
//     isError: error
//   }

// }

function getInfoPiece(data) {
    var hrs = 'standardHours'
    return (
        <Container>
            <Accordion defaultValue="customization">
                <Accordion.Item value="OperatingHours">
                    <Accordion.Control>Operating Hours</Accordion.Control>
                    <Accordion.Panel>
                        <h5>{data.data[0].operatingHours[0].description}</h5>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Day</th>
                                    <th>Hours</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Sunday</td>
                                    <td>{data.data[0].operatingHours[0].standardHours.sunday}</td>
                                </tr>
                                <tr>
                                    <td>Monday</td>
                                    <td>{data.data[0].operatingHours[0].standardHours.monday}</td>
                                </tr>
                                <tr>
                                    <td>Tuesday</td>
                                    <td>{data.data[0].operatingHours[0].standardHours.tuesday}</td>
                                </tr>
                                <tr>
                                    <td>Wednesday</td>
                                    <td>{data.data[0].operatingHours[0].standardHours.wednesday}</td>
                                </tr>
                                <tr>
                                    <td>Thursday</td>
                                    <td>{data.data[0].operatingHours[0].standardHours.thursday}</td>
                                </tr>
                                <tr>
                                    <td>Friday</td>
                                    <td>{data.data[0].operatingHours[0].standardHours.friday}</td>
                                </tr>
                                <tr>
                                    <td>Saturday</td>
                                    <td>{data.data[0].operatingHours[0].standardHours.saturday}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="EnteranceInformation">
                    <Accordion.Control>Enterance Information</Accordion.Control>
                    <Accordion.Panel>
                        <Group position="center">
                            <Text>{data.data[0].directionsInfo}</Text>

                                {data.data[0].entranceFees.map((item, a) => (
                                    <HoverCard width={280} shadow="md" key={a}>
                                        <HoverCard.Target key={a}>
                                            <Button color="lightBrown">{data.data[0].entranceFees[a].title}</Button>
                                        </HoverCard.Target>
                                        <HoverCard.Dropdown key={a}>
                                            <Paper shadow="xs" p="md">
                                                <Text>{data.data[0].entranceFees[a].title}</Text>
                                                <Text>Cost: ${data.data[0].entranceFees[a].cost}</Text>
                                                <Text>Description: {data.data[0].entranceFees[a].description}</Text>
                                            </Paper>
                                        </HoverCard.Dropdown>
                                    </HoverCard>
                                    ))
                                }
                                 
                                {data.data[0].entrancePasses?.map((item, b) => (
                                    <HoverCard width={280} shadow="md" key={b}>
                                        <HoverCard.Target key={b}>
                                            <Button color="lightBrown">{data.data[0].entrancePasses[b].title}</Button>
                                        </HoverCard.Target>
                                        <HoverCard.Dropdown key={b}>
                                            <Paper shadow="xl" p="md">
                                                <Text>{data.data[0].entrancePasses[b].title}</Text>
                                                <Text>${data.data[0].entrancePasses[b].cost}</Text>
                                                <Text>Description: {data.data[0].entrancePasses[b].description}</Text>
                                            </Paper>
                                        </HoverCard.Dropdown>
                                    </HoverCard>
                                    ))
                                }
                                
                            
                        </Group>
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="focus-ring">
                    <Accordion.Control>Weather Information</Accordion.Control>
                        <Accordion.Panel>
                            <Paper shadow="xs" radius="md" p="xl" withBorder>
                                <Text>{data.data[0].weatherInfo}</Text>
                                
                            </Paper>
                        </Accordion.Panel>
                </Accordion.Item>
            </Accordion> 
        </Container>
              
    )
  }

function getActivitiesPiece(data) {
    return (
        <Container>
                <Space><hr /></Space>
                <Box
                    sx={(theme) => ({
                        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                        textAlign: 'center',
                        padding: theme.spacing.xl,
                        borderRadius: theme.radius.md,
                        cursor: 'pointer',

                        '&:hover': {
                        backgroundColor:
                            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
                        },
                    })}>
                    Fun Attractions that {data.data[0].fullName} Provides
                </Box>

                <List>
                    {data.data[0].activities.map((item, i) => (
                        <List.Item key={i}>
                            <Text>{data.data[0].activities[i].name}</Text>
                        </List.Item>
                        ))
                    }
                </List>
        </Container>
                
    )
}


function render (items) {
    return (
      <div>
      {items.map(function(d, idx){
         return (<li key={idx}>{d.name}</li>)
       })}
      </div>
    );
  }
