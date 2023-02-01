import { useState } from 'react';
import {
  Text,
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Avatar,
  IconButton,
  Input,
  InputRightElement,
  InputGroup,
  Button,
} from '@chakra-ui/react';
import { FiEdit2 } from 'react-icons/fi';
import { useForm } from 'react-hook-form';

export default function TransactionItem({ t, setTx }) {
  const [showCommentInput, setCommentInput] = useState(false);
  const [comment, setComment] = useState(t.comment);
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    setComment(data['tx_comment']);
    setCommentInput(false);
  };

  return (
    <Box
      border="1px solid black"
      borderRadius="5px"
      padding="10px"
      marginBottom="26px"
    >
      <Flex>
        <Avatar
          size="md"
          name="Kent Dodds"
          src="https://bit.ly/kent-c-dodds"
          marginRight="13px"
        />
        <div>
          {showCommentInput && (
            <form
              style={{ marginBottom: '10px' }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <InputGroup size="md">
                <Input
                  {...register('tx_comment')}
                  pr="4.5rem"
                  type="text"
                  placeholder="Transaction details"
                />
                <InputRightElement width="204px">
                  <Button
                    type="submit"
                    h="1.75rem"
                    size="sm"
                    marginRight="10px"
                  >
                    Submit
                  </Button>
                  <Button
                    variant="ghost"
                    h="1.75rem"
                    size="sm"
                    onClick={() => setCommentInput(false)}
                  >
                    Cancel
                  </Button>
                </InputRightElement>
              </InputGroup>
            </form>
          )}
          {comment && !showCommentInput && (
            <Text marginBottom="10px">{comment}</Text>
          )}
          <Flex>
            <Text>penguin.sol</Text>
            {!showCommentInput && (
              <div style={{ width: '87%' }}>
                <IconButton
                  float="right"
                  h="23px"
                  minWidth="28px"
                  colorScheme="blue"
                  aria-label="Search database"
                  icon={<FiEdit2 />}
                  onClick={() => setCommentInput(prev => !prev)}
                />
              </div>
            )}
          </Flex>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Hash</Th>
                  <Th>From</Th>
                  <Th>To</Th>
                  <Th isNumeric>Amount</Th>
                  <Th isNumeric>Tx Fee</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    <Text
                      textOverflow="ellipsis"
                      overflow="hidden"
                      whiteSpace="nowrap"
                      w="200px"
                    >
                      {t.txHash}
                    </Text>
                  </Td>
                  <Td>
                    <Text
                      textOverflow="ellipsis"
                      overflow="hidden"
                      whiteSpace="nowrap"
                      w="200px"
                    >
                      {t.src}
                    </Text>
                  </Td>
                  <Td>
                    <Text
                      textOverflow="ellipsis"
                      overflow="hidden"
                      whiteSpace="nowrap"
                      w="200px"
                    >
                      {t.dst}
                    </Text>
                  </Td>
                  <Td>
                    <Text marginLeft="50%"> {t.txNumberSolTransfer}</Text>
                  </Td>
                  <Td>
                    <Text> {t.fee}</Text>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </Flex>
    </Box>
  );
}
