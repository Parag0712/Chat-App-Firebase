import { Avatar, Box, Button, Center, Container, HStack, Heading, Input, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import Message from './components/Message'
import { GoogleAuthProvider, signOut, getAuth, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { app } from './firebase';
import { addDoc, collection, query, orderBy, getFirestore, onSnapshot, serverTimestamp } from 'firebase/firestore';



function App() {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const q = query(collection(db, "Message"), orderBy("createAt", "asc"));
  const [user, setUser] = useState("");
  const [msg, setMsg] = useState("");
  const [messages, setMessage] = useState([]);
  const divforscroll = useRef();



  const scrollRef = useRef();

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }
  };


  useEffect(() => {
    // Scroll to the bottom after messages update
    scrollToBottom();
  }, [messages]); // Assuming messages is the state containing your messages array


  // Login Handler
  const loginHandler = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((data) => {
        setUser(data)
      })
  }

  //Logout Handler
  const logoutHandler = () => {
    signOut(auth).then((data) => {
      setUser("");
    })
  }

  //Send Msg
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const docRef = await addDoc(collection(db, "Message"), {
        text: msg,
        uid: user.uid,
        uri: user.photoURL,
        name: user.displayName,
        createAt: serverTimestamp()
      });
      setMsg("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


  // UseEffect onAuthStateChanged
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (data) => {
      setUser(data)
    });

    // Data Fetch
    onSnapshot(q, (snap) => {
      setMessage(snap.docs.map((item) => {
        const id = item.id;
        return { id, ...item.data() }
      }));
    });
    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <Box bg={"#ccd9ff"}>
      <Container h={"100vh"} p={"0"} bg={"white"} position="relative" >
        <HStack justifyContent="space-between" p={"10px"}
          borderBottomLeftRadius={"10px"}
          borderBottomRightRadius={"10px"}
          w="full" bg={"#6b7db3"} >
          <Heading color={"#e6ecff"} as="h5" size="lg">
            Chat App
          </Heading>
          {user ?
            (<HStack>
              <Avatar
                src={user.photoURL
                }
              ></Avatar>
              <Text color={"white"}>
                {user?.displayName?.split(' ')[0]}
              </Text>
              <Button
                bg={"#9999ff"}
                colorScheme={'purple'}
                color={"#fff"}
                onClick={logoutHandler} >
                logout
              </Button>
            </HStack>)
            : (<Button
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
            maxH={"calc(100vh - 150px)"}
            overflowY={"auto"}
            p={"10px"}
            mt={"-1px"}
          >
            {
              messages && messages.map((value) => {
                return <Message key={value.id} text={value.text} uri={value.uri} user={user.uid == value.uid ? "me" : "other"} />
              })
            }
            <div
              ref={scrollRef}
            ></div>
          </VStack>

        ) : (
          <Container>
            <Heading textAlign={"center"} color={"#6b7db3"}>Login First</Heading>
          </Container>
        )

        }
        {/* Form Control */}
        <form onSubmit={submitHandler}>
          <HStack background={"#e6ecff"} w={"100%"} position={'absolute'} bottom={0} p={"10px"}>
            <Input
              required
              placeholder='Message'
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            ></Input>
            <Button type='submit'
              w={"20%"}
              bg={"#6b7db3"}
              colorScheme='purple'
              isDisabled={!user}
            >send</Button>
          </HStack>
        </form>
      </Container>
    </Box>
  )
}

export default App