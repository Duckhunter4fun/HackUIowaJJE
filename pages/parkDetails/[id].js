import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Tabs, Table, Title, Text, Accordion, Paper, Group, HoverCard, Button, Box, Space, List, ThemeIcon, Center, BackgroundImage } from '@mantine/core';
import { HeaderSimple } from '../../components/HeaderSimple'
import useSWR from 'swr'
import Link from 'next/link';
//import fetcher from './fetcher';

const APIKEY = 'bfqNy26zwGbEKneubHPeMvyWi0HBuvhhJ2Un8pgg';

// use next router to pass in 4 dig park code.
//use affect
//takes in park code

const fetcher = (apiURL) => fetch(apiURL).then((res) => res.json())


// const fetcher = async () => {
//     const responce = await fetcher(apiURL)
//     const data = await responce.json()
//     return data
// }

export default function DynamicPage() {
    const router = useRouter()
    const {
        query: { id },
    } = router
    //gets json data for specific park details
    //const { data, isError } = getParkDetails('acad'/*id*/);

    
    const { data, error } = useSWR(`https://developer.nps.gov/api/v1/parks?parkCode=${id}&api_key=${APIKEY}`, fetcher)


    if (data) {
        return (
            <Container>
                <HeaderSimple links={[{link: "/", label: <Link href="/">Home</Link>},{link: "/about", label: "About"}]}/>
                <br />
                <Box sx={{ maxWidth: 800 }} mx="auto">
                    <BackgroundImage
                        src={data.data[0].images[0].url}
                        radius="sm"
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
                <Tabs variant="outline" orientation="vertical" defaultValue="gallery">
                    <Tabs.List>
                        <Tabs.Tab value="Info" >Info</Tabs.Tab>
                        <Tabs.Tab value="Activities" >Activities</Tabs.Tab>
                        <Tabs.Tab value="Alerts" >Alerts</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="Info" pl="xl">
                        
                        <Text lineClamp={40}>
                            {getInfoPiece(data)}
                        </Text>
                        <Table horizontalSpacing="lg" verticalSpacing="xs">
                            {/* //{getHoursTable(data, "standardHours")} */}
                        </Table>
                    </Tabs.Panel>

                    <Tabs.Panel value="Activities" pl="xl">
                        <Text lineClamp={100}>
                            <Center p="md">
                                {getActivitiesPiece(data)}
                            </Center>
                        </Text>
                    </Tabs.Panel>

                    <Tabs.Panel value="Alerts" pl="xs">
                        Settings tab content
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






//gets json details on specific park
function getParkDetails(parkId) {
  
  const fetcher = (apiURL) => fetch(apiURL).then((res) => res.json())
  const { data, error } = useSWR(`https://developer.nps.gov/api/v1/parks?parkCode=${parkId}&api_key=${APIKEY}`, fetcher)

  return {
    data: data,
    isError: error
  }

}

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

                            <HoverCard width={280} shadow="md">
                                {data.data[0].entranceFees.map((item, i) => (
                                    <HoverCard.Target>
                                        <Button>{data.data[0].entranceFees[i].title}</Button>
                                    </HoverCard.Target>
                                    ))
                                }
                                {data.data[0].entranceFees.map((item, i) => (
                                    <HoverCard.Dropdown>
                                        <Paper shadow="xs" p="md">
                                            <Text>{data.data[0].entranceFees[i].title}</Text>
                                            <Text>Cost: ${data.data[0].entranceFees[i].cost}</Text>
                                            <Text>Description: {data.data[0].entranceFees[i].description}</Text>
                                        </Paper>
                                    </HoverCard.Dropdown>
                                    ))
                                }    
                            </HoverCard>
                            
                            <HoverCard width={280} shadow="md">
                                {data.data[0].entrancePasses?.map((item, i) => (
                                    <HoverCard.Target>
                                        <Button>{data.data[0].entrancePasses[i].title}</Button>
                                    </HoverCard.Target>
                                    ))
                                }
                                {data.data[0].entrancePasses?.map((item, i) => (
                                    <HoverCard.Dropdown>
                                        <Paper shadow="xl" p="md">
                                            <Text>{data.data[0].entrancePasses[i].title}</Text>
                                            <Text>${data.data[0].entrancePasses[i].cost}</Text>
                                            <Text>Description: {data.data[0].entrancePasses[i].description}</Text>
                                        </Paper>
                                    </HoverCard.Dropdown>
                                    ))
                                }
                            </HoverCard>
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
