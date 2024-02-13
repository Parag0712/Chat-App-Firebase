import { Box, Button, Container, HStack, Heading, Input, VStack } from '@chakra-ui/react'
import React from 'react'
import Message from './components/Message'

function App() {
  return (
    <Box bg={"#ccd9ff"}>
      <Container h={"100vh"} p={"0"} bg={"#e6ecff"} position="relative" >
        <HStack justifyContent="space-between" p={"10px"}
          borderBottomLeftRadius={"10px"}
          borderBottomRightRadius={"10px"}
          w="full" bg={"#6b7db3"} >
          <Heading color={"#e6ecff"} as="h5" size="lg">
            Chat App
          </Heading>
          <Button bg={"#9999ff"} colorScheme={'purple'} color={"#fff"}>logout</Button>
        </HStack>
        {/* VStack */}
        <VStack
          maxH={"calc(100vh - 80px)"} 
          overflowY={"auto"} 
          p={"10px"}
          mt={"-1px"} 
        >
          <Message text={"Sample Message"} />
          <Message text={"Sample Message"} user='me' />
          <Message text={"Sample Message"} />
          <Message text={"Sample Message"} user='me' />
          <Message text={"Sample Message"} />
          <Message text={"Sample Message"} user='me' />

          <Message text={"Sample Message"} user='me' />
          <Message text={"Sample Message"} />
          <Message text={"Sample Message"} user='me' />
          <Message text={"Sample Message"} />
          <Message text={"Sample Message"} user='me' />

        </VStack>

        {/* Form Control */}
        <form>
          <HStack background={"#e6ecff"} w={"100%"} position={'absolute'} bottom={0} p={"10px"}>
            <Input
              placeholder='Message'
            ></Input>
            <Button type='submit' 
            
            w={"20%"}
            bg={"#6b7db3"} colorScheme='purple'>send</Button>
          </HStack>
        </form>
      </Container>
    </Box>
  )
}

export default App