import { Avatar, HStack,Text } from '@chakra-ui/react'
import React from 'react'

function Message({text,uri,user="other"}) {
  return (
    <HStack alignSelf={user ==="me" ?"end":"start"} alignItems={"center"} bg={"#9999ff"} color={"white"} px={"10px"} py="7px" borderRadius={"30px"}>
        <Avatar src={uri} h={"40px"}w="40px"></Avatar>
        <Text>
            {text}
        </Text>
    </HStack>
  )
}

export default Message