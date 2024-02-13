import { Avatar, Box, Button, Center, Container, HStack, Heading, Input, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Message from './components/Message'

import { GoogleAuthProvider, signOut, getAuth, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { app } from './firebase';

function App() {

  const auth = getAuth(app);
  const [user, setUser] = useState("");

  // Login Handler
  const loginHandler = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((data) => {
        console.log(data);
        setUser(data)
      })
  }

  //Logout Handler
  const logoutHandler = () => {
    signOut(auth).then((data) => {
      console.log(data);
      setUser("");
    })
  }

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      setUser(data)
      console.log(data);
    })
  }, []);

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
          {user?
          (<HStack>
            <Avatar 
              src={user.photoURL
                }
            ></Avatar>
            <Text color={"white"}>
              {user.displayName.split(' ')[0]}
            </Text>
            <Button
              bg={"#9999ff"}
              colorScheme={'purple'}
              color={"#fff"}
              onClick={logoutHandler} >
              logout 
            </Button>
          </HStack>)
          :(<Button
            bg={"#9999ff"}
            colorScheme={'purple'}
            color={"#fff"}
            onClick={loginHandler}
          > login
          </Button>)}
        </HStack>
        {/* VStack */}
        {user ? (
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

        ) : (
          <Container>
            <Heading textAlign={"center"} color={"#6b7db3"}>Login First</Heading>
          </Container>
        )

        }
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