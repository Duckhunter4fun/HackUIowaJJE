import { Container, TextInput,Title, Paper, Text} from '@mantine/core'
import { HeaderSimple } from '../components/HeaderSimple';
import Image from 'next/image'
function MyAboutPage(){
    return (
    <main>
        <h2>
            Mission
        </h2>
        <Paper shadow="xs" radius="md" p="xl" withBorder>
        <Text>To inspire curiosity in our National Parks</Text>
</Paper>
            
        <h2>
            Important Information
        </h2>
       
        <Paper shadow="xs" radius="md" p="xl" withBorder>
            Our national parks not only serve as anchors of larger ecosystems, but also protection of endangered species and beautiful wildlife. 
National Parks also help us to spark up important conversations and educate the world about these natural habitats.
                 </Paper>
            <h2>
                Technology 
            </h2>
            <Paper shadow="xs" radius="md" p="xl" withNorder>
            Using the National Park Service API, we created a search tool to make retrieving information about national parks more accessible.
            </Paper>
            <h3>
    Sources
            </h3>
                <p>
                    <a href="https://www.nps.gov/subjects/developer/api-documentation.htm">NPS.GOV</a>
                </p>
                

     </main>

    );
}



export default function ItsClipped(){
    return (
    <Container>
            <HeaderSimple links={[{link: "/", label: "Home"},{link: "/about", label: "About"}]}/>
                <main>
                     <Title order={1}>About</Title>
                 </main>
                    <Image src="/park2.jpg" width={850} height={200}/>
            <MyAboutPage/>
    </Container>
        
    );
}